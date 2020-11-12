import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpResponse<T> = {
  data: T;
  status: number;
};

const sendHttpRequest = axios.create();

const httpRequest = async (request: AxiosRequestConfig) => {
  return new Promise((resolve: (response: AxiosResponse) => void, reject) => {
    sendHttpRequest(request)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          resolve(error.response);
        } else {
          reject(error);
        }
      });
  });
};

export default httpRequest;
