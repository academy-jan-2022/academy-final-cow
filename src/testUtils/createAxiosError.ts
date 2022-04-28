import { AxiosError, AxiosRequestConfig, AxiosResponseHeaders } from "axios";

const createAxiosError = (code: string, message: string): AxiosError => {
  return {
    name: "error",
    message: "Request failed with status code" + code,
    response: {
      data: {
        message,
      },
      config: {},
      status: 400,
      statusText: "",
      headers: {} as AxiosResponseHeaders,
    },
    config: {} as AxiosRequestConfig,
    code,
    toJSON: jest.fn(),
    isAxiosError: true,
  };
};

export default createAxiosError;
