import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshAccessToken } from "../utils/acesstoken.util";
import { getUserTokensFromLocalStorage } from "../utils/localstorage.util";

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { accessToken } = getUserTokensFromLocalStorage();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

interface RespConf extends AxiosRequestConfig {
  sent?: boolean;
}

const responseErrorInterceptor = async (
  error: AxiosError,
  reqInterceptorId: number
) => {
  const prevReq: RespConf = error.config;
  if (error.response?.status === 401 && !prevReq?.sent) {
    await refreshAccessToken();
    axios.interceptors.request.eject(reqInterceptorId);
    axios.interceptors.request.use(requestInterceptor);
    prevReq.sent = true;
    return axios(prevReq);
  }

  return Promise.reject(error);
};

export const jwtInterceptorProvider = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  const reqInterceptorId = axios.interceptors.request.use(
    requestInterceptor,
    requestErrorInterceptor
  );
  axios.interceptors.response.use(undefined, (error) =>
    responseErrorInterceptor(error, reqInterceptorId)
  );
};
