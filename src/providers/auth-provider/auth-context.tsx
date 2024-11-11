import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string) => void;
}

export const AuthContext = createContext({} as AuthContextType);
