import api from "../api";
import { ICreateNewMedication } from "./hooks";

export const MedicationApi = {
  async createNewMedication(payload: ICreateNewMedication) {
    const { data } = await api.post("/remedios/criar", payload);

    return data;
  },
};
