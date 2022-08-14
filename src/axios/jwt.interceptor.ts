import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getUserTokensFromLocalStorage } from "../utils/localstorage.util";

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { accessToken } = getUserTokensFromLocalStorage();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const requestErrorInterceptor = (error: AxiosError) => {
  console.log("error detected!!", error.message);
  return Promise.reject(error);
};

export const jwtInterceptorProvider = () => {
  axios.defaults.baseURL = "http://localhost:3002/";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
  axios.interceptors.response.use(undefined, requestErrorInterceptor);
};
