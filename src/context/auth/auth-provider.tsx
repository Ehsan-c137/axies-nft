"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ILoginCredentials, IUser } from "@/types/service/auth";
import { logger } from "@/utils/logger";
import { apiClient } from "@/services/client/api-client";

type AuthContextType = {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  accessToken: string | null;
  logout: () => Promise<void>;
  login: (credentials: ILoginCredentials) => Promise<IUser>;
  signup: (credentials: ILoginCredentials) => Promise<IUser>;
  updateUser: (data: Partial<IUser>) => void;
};

type AuthState = {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  accessToken: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    accessToken: null,
  });

  const setLoggedOutState = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      accessToken: null,
    });
    apiClient.setAuthToken(null);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch("/api/auth/refresh", { method: "POST" });

        if (response.ok) {
          const { accessToken, user } = await response.json();
          apiClient.setAuthToken(accessToken);
          setAuthState({
            isAuthenticated: true,
            user: user,
            isLoading: false,
            accessToken,
          });
        } else {
          setLoggedOutState();
        }
      } catch (error) {
        logger.error("Failed to initialize auth:", error);
        setLoggedOutState();
      }
    };

    initializeAuth();
  }, [setLoggedOutState]);

  const handleAuthRequest = useCallback(
    async (
      endpoint: string,
      credentials: ILoginCredentials,
      errorContext: string,
    ): Promise<IUser> => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Authentication failed");
        }

        const { accessToken, user } = await response.json();
        apiClient.setAuthToken(accessToken);
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false,
          accessToken,
        });

        return user;
      } catch (error) {
        logger.error(errorContext, error);
        setLoggedOutState();
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("An unexpected error occurred.");
      }
    },
    [setLoggedOutState],
  );

  const login = useCallback(
    (credentials: ILoginCredentials) =>
      handleAuthRequest("/api/auth/login", credentials, "Error logging in:"),
    [handleAuthRequest],
  );

  const signup = useCallback(
    (credentials: ILoginCredentials) =>
      handleAuthRequest("/api/auth/signup", credentials, "Error signing up:"),
    [handleAuthRequest],
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      logger.error("Error logging out:", error);
    } finally {
      setLoggedOutState();
    }
  }, [setLoggedOutState]);

  const updateUser = useCallback((data: Partial<IUser>) => {
    setAuthState((prev) => {
      if (!prev.user) {
        return prev;
      }
      return { ...prev, user: { ...prev.user, ...data } };
    });
  }, []);

  const value = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      signup,
      updateUser,
    }),
    [authState, login, logout, signup, updateUser],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
