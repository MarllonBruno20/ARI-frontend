import { useMutation } from "@tanstack/react-query";
import { UserApi } from ".";
import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import api from "../api";
import { useAuth } from "@/providers/auth-provider/hook";
import { useUser } from "@/providers/user-provider/hook";
import { useNavigate } from "react-router-dom";

export interface ICreateNewUser {
  nome: string;
  email: string;
  senha: string;
  data_nascimento: Date;
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (payload: ICreateNewUser) => UserApi.createNewUser(payload),
  });
}

export interface IDataUser {
  nome: string;
  email: string;
}

export const useUserData = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState<IDataUser | null>(null);

  useEffect(() => {
    if (token) {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      api
        .get("/usuario", config)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  return userData;
};

export function useLogout() {
  const { setToken, token } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await api.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(token);

      // Limpa o token do estado global/localStorage
      setToken("");
      setUser(null);
      navigate("/login");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Erro ao realizar logout.");
      console.error("Erro ao fazer logout:", err);
    }
  };

  return { logout, loading, error };
}
