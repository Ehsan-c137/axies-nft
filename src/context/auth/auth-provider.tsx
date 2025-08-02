"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ILoginCredentials, IUser } from "@/types/service/auth";

const USER_KEY = "user";

type AuthContextType = {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("use Auth must be whitin an Auth provider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthContextType>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  const router = useRouter();
  const searcParams = useSearchParams();
  const callbackUrl = searcParams.get("callbackUrl") || "/";

  useEffect(() => {
    const checkUserSession = async () => {
      const cachedUser = localStorage.getItem(USER_KEY);
      if (cachedUser) {
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
          user: JSON.parse(cachedUser),
        }));
      }
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const user = await response.json();
          setAuth((prev) => ({
            ...prev,
            isAuthenticated: true,
            user: user,
          }));
          localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
          setAuth((prev) => ({
            ...prev,
            isAuthenticated: false,
            user: null,
          }));
          localStorage.removeItem(USER_KEY);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        setAuth({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
        localStorage.removeItem(USER_KEY);
      }
    };

    checkUserSession();
  }, []);

  const login = async (credentials: ILoginCredentials): Promise<boolean> => {
    setAuth((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user } = await response.json();
        setAuth({
          isAuthenticated: true,
          user: user,
          isLoading: false,
        });
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        router.push(callbackUrl);
        return true;
      } else {
        setAuth((prev) => {
          return {
            ...prev,
            isAuthenticated: false,
            isLoading: false,
            user: null,
          };
        });
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const logout = async () => {
    setAuth((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      const respone = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (respone.ok) {
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: false,
          user: null,
          isLoading: false,
        }));
        localStorage.removeItem(USER_KEY);
        // redirects are gonna handle with middleware
        router.refresh();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setAuth((prev) => {
        return {
          ...prev,
          isLoading: false,
        };
      });
    }
  };

  const signup = async (email: string, password: string) => {
    setAuth((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { user } = await response.json();
        localStorage.setItem(USER_KEY, user);
        setAuth({
          isAuthenticated: true,
          user: user,
          isLoading: false,
        });
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setAuth({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  };

  const values = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    setAuth,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
