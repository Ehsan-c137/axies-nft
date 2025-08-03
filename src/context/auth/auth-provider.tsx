"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ILoginCredentials, IUser } from "@/types/service/auth";

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
      } finally {
        setAuth((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    checkUserSession();
  }, []);

  const login = async (
    credentials: ILoginCredentials,
  ): Promise<IUser | null> => {
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
        return user;
      } else {
        setAuth((prev) => {
          return {
            ...prev,
            isAuthenticated: false,
            isLoading: false,
            user: null,
          };
        });
        return null;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
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

  const signup = async (
    credentials: ILoginCredentials,
  ): Promise<IUser | null> => {
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
      if (response.ok) {
        const { user } = await response.json();
        localStorage.setItem(USER_KEY, user);
        setAuth({
          isAuthenticated: true,
          user: user,
          isLoading: false,
        });
        router.push(callbackUrl);
        return user;
      }
      return null;
    } catch (error) {
      console.error("Error signing up:", error);
      setAuth({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
      return null;
    }
  };

  const values = {
    ...auth,
    setAuth,
    login,
    logout,
    signup,
  } as AuthContextType;

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>; //
};
