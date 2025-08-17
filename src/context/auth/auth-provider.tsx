"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ILoginCredentials, IUser } from "@/types/service/auth";
import { logger } from "@/utils/logger";

type AuthContextType = {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  accessToken: string | null;
  logout: () => Promise<void>;
  login: (credentials: ILoginCredentials) => Promise<IUser | null>;
  signup: (credentials: ILoginCredentials) => Promise<IUser | null>;
};

type AuthProviderValue = Pick<
  AuthContextType,
  "isAuthenticated" | "isLoading" | "user"
>;

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use Auth must be whitin an Auth provider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthProviderValue>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const setLoggedOutState = (loading: boolean = false) => {
    setAccessToken(null);
    setAuth({
      isAuthenticated: false,
      user: null,
      isLoading: loading,
    });
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch("/api/auth/refresh", { method: "POST" });

        if (response.ok) {
          const { accessToken, user } = await response.json();
          setAccessToken(accessToken);
          setAuth({ isAuthenticated: true, user: user, isLoading: false });
        } else {
          setLoggedOutState();
        }
      } catch (error) {
        logger.error("Failed to initialize auth:", error);
        setLoggedOutState();
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: ILoginCredentials): Promise<IUser> => {
    setAuth((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Invalid credentials");
      }

      const { accessToken, user } = await response.json();
      setAccessToken(accessToken);
      setAuth({
        isAuthenticated: true,
        user: user,
        isLoading: false,
      });

      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
      return user;
    } catch (error) {
      logger.error("Error logging in:", error);
      setLoggedOutState(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("something went wrong");
    }
  };

  const logout = async () => {
    setAuth((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setLoggedOutState(false);
      // redirects are gonna handle with middleware
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
      setLoggedOutState(false);
      throw new Error("something went wrong");
    }
  };

  const signup = async (credentials: ILoginCredentials): Promise<IUser> => {
    setAuth((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Could not create account");
      }

      const { accessToken, user } = await response.json();
      setAccessToken(accessToken);
      setAuth({
        isAuthenticated: true,
        user: user,
        isLoading: false,
      });
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
      return user;
    } catch (error) {
      logger.error("Error signing up:", error);
      setLoggedOutState(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("something went wrong");
    }
  };

  const value: AuthContextType = {
    ...auth,
    accessToken,
    login,
    logout,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
