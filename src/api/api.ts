import Axios, { HttpStatusCode } from "axios";

const serverUrl = "http://localhost:3000/api";

export const baseURL = `${serverUrl}`;

const api = Axios.create({
  baseURL: baseURL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === HttpStatusCode.Forbidden) {
      console.log("Handle with forbidden error");
    }

    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      console.log("Handle with unauthorized error");
    }

    throw error;
  }
);

export default api;
