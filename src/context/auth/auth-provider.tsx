"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ILoginCredentials, IUser } from "@/types/service/auth";
import { logger } from "@/lib/utils/logger";

const USER_KEY = "user";

type AuthContextType = {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
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

  const router = useRouter();

  const setLoggedOutState = (loading = false) => {
    localStorage.removeItem(USER_KEY);
    setAuth({
      isAuthenticated: false,
      user: null,
      isLoading: loading,
    });
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const cachedUser = localStorage.getItem(USER_KEY);
      if (cachedUser) {
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
          isLoading: true, // Will be verified by the API call
          user: JSON.parse(cachedUser),
        }));
      }
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const { user } = await response.json();
          setAuth({ isAuthenticated: true, user: user, isLoading: false });
          localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
          setLoggedOutState(false);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        setLoggedOutState(false);
      } finally {
        setAuth((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    checkUserSession();
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

      const { user } = await response.json();
      setAuth({
        isAuthenticated: true,
        user: user,
        isLoading: false,
      });
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      const searchParams = new URLSearchParams(window.location.search);
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

      const { user } = await response.json();
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setAuth({
        isAuthenticated: true,
        user: user,
        isLoading: false,
      });
      const searchParams = new URLSearchParams(window.location.search);
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
    login,
    logout,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
