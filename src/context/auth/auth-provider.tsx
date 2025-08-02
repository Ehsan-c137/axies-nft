"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ILoginCredentials } from "@/types/service/auth";

const JWT_KEY = "jwt";
const USER_KEY = "user";

type AuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
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

  const loadAuthState = useCallback(() => {
    try {
      setAuth((prevState) => {
        return {
          ...prevState,
          isLoading: true,
        };
      });

      const storedJwt = localStorage.getItem(JWT_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedJwt && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setAuth((prev) => {
            return {
              ...prev,
              isAuthenticated: true,
              user: parsedUser,
              isLoading: false,
            };
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem(JWT_KEY);
          localStorage.removeItem(USER_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
      setAuth((prev) => {
        return {
          ...prev,
          isAuthenticated: false,
          user: null,
          isLoading: false,
        };
      });
    } finally {
      setAuth((prevState) => {
        return {
          ...prevState,
          isLoading: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    loadAuthState();
  }, [loadAuthState]);

  const login = async (credentials: ILoginCredentials) => {
    setAuth((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        setAuth({
          isAuthenticated: true,
          user: user,
          isLoading: false,
        });
        localStorage.setItem(JWT_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        router.push(callbackUrl);
        return true;
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    setAuth((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    try {
      localStorage.removeItem(JWT_KEY);
      localStorage.removeItem(USER_KEY);
      setAuth((prev) => {
        return {
          ...prev,
          isAuthenticated: false,
          user: null,
          isLoading: false,
        };
      });
      router.refresh();
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
        isAuthenticated: false,
      };
    });

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem(JWT_KEY, token);
        localStorage.setItem(USER_KEY, user);
      }
    } catch (error) {
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
