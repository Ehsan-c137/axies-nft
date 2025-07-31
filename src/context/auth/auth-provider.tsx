import { createContext, useState } from "react";

type AuthContextType = {
  auth: {
    isAuthenticated: boolean;
    user: string | null;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      isAuthenticated: boolean;
      user: string | null;
    }>
  >;
  login: () => void;
  logout: () => void;
  signup: (username: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{
    isAuthenticated: boolean;
    user: string | null;
  }>({
    isAuthenticated: false,
    user: null,
  });

  const login = () => {
    setAuth({
      isAuthenticated: true,
      user: "John Doe",
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  const signup = (username: string) => {
    setAuth({
      isAuthenticated: true,
      user: username,
    });
  };

  const values = {
    auth,
    setAuth,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
