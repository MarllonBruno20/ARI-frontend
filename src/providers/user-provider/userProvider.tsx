import { IDataUser, useUserData } from "@/api/user/hooks";
import { useEffect, useState } from "react";
import { UserContext } from "./user-context";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IDataUser | null>(null);
  const userData = useUserData(); // Dados do hook useUserData

  useEffect(() => {
    if (userData) {
      setUser({
        nome: userData.nome,
        email: userData.email,
      });
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
