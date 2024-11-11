import { useAuth } from "@/providers/auth-provider/hook";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import api from "../api";

export interface IDataMedication {
  id: number;
  nome: string;
  funcao: string;
  dosagem: string;
}

export function useGetMedication() {
  const { token } = useAuth();
  const [medications, setMedications] = useState<IDataMedication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedications = () => {
    if (token) {
      setLoading(true);
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      api
        .get("/remedios/ativos", config)
        .then((response) => {
          setMedications(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error(error);
          setError("Erro ao carregar medicamentos");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchMedications();
  }, [token]);

  return { medications, loading, error, refetch: fetchMedications };
}

export interface ICreateNewMedication {
  nome: string;
  funcao: string;
  dosagem: string;
}

export function useCreateMedication() {
  const { token } = useAuth();
  const [medication, setMedication] = useState<ICreateNewMedication | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMedication = async (newMedication: ICreateNewMedication) => {
    if (!token) return;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/remedios/criar", newMedication, config);
      setMedication(response.data);
    } catch (err) {
      console.error(err);
      setError("Erro ao criar medicamento");
    } finally {
      setLoading(false);
    }
  };

  return { createMedication, medication, loading, error };
}

export interface IUpdateMedication {
  id: number;
  nome?: string;
  funcao?: string;
  dosagem?: string;
}

export function useUpdateMedication() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMedication = async (
    id: number,
    updateData: IUpdateMedication
  ) => {
    setLoading(true);
    setError(null);

    try {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.put(`/remedios/${id}`, updateData, config);
      setLoading(false);
      return response.data; // Retorna os dados atualizados
    } catch (err) {
      setLoading(false);
      setError("Erro ao atualizar o remédio.");
      console.error(err);
    }
  };

  return { updateMedication, loading, error };
}

export function useDeleteMedication() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMedication = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.delete(`/remedios/${id}`, config);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Erro ao excluir o remédio.");
      console.error(err);
    }
  };

  return { deleteMedication, loading, error };
}
