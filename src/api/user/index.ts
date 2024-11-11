import api from "../api";
import { type ICreateNewUser } from "./hooks";

export const UserApi = {
  async createNewUser(payload: ICreateNewUser) {
    const { data } = await api.post("/usuarios/criarUsuario", payload);

    return data;
  },
};
