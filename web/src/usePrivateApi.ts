import { useEffect } from "react";
import { privateApi } from "./api";
import { useAuth } from "./contexts/auth";

export const usePrivateApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    console.log('token', getToken())
    const requestIntercept = privateApi.interceptors.request.use(
      config => {
        if (config.headers && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Token ${getToken()}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    return () => {
      privateApi.interceptors.request.eject(requestIntercept);
    }
  }, [getToken])

  return privateApi;
}