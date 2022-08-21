import APIError from "./ApiError";

export interface ApiResult<T> {
  data?: T;
  error?: APIError;
  success: boolean;
}

export const succeed = <T>(data: T): ApiResult<T> => {
  return {
    data,
    success: true,
  };
};

export const failed = (error: APIError): ApiResult<any> => {
  return {
    success: false,
    error,
  };
};
