"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { AuthContextProps } from "../types/common";
import { LoginUserType } from "../types/common";

// Context作成
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Providerコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState(false);
  const [user, setUser] = useState<LoginUserType | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const storedUser = localStorage.getItem("user");
    if (storedAuth == "true" && storedUser) {
      setAuthState(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", authState.toString());
    localStorage.setItem("user", JSON.stringify(user));
  }, [authState, user]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
