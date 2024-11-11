import { IDataUser } from "@/api/user/hooks";
import { createContext } from "react";

interface UserContextType {
  user: IDataUser | null;
  setUser: (user: IDataUser | null) => void;
}

export const UserContext = createContext({} as UserContextType);
