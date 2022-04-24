import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import store from "../../store";
import { logout } from "../../store/auth";

const API_URL = process.env.REACT_APP_API_URL;

const api = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = false;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer {token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      store.dispatch(logout() as any);
    }
    return Promise.reject(error);
  }
);

export { api };
