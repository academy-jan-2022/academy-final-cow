import { AxiosError } from "axios";

const createAxiosError = (code: string, message: string): AxiosError => {
  return {
    name: "error",
    message,
    config: {},
    code,
    toJSON: jest.fn(),
    isAxiosError: true,
  };
};

export default createAxiosError;
