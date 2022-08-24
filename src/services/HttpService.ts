import { ZodType } from "zod";
import * as AxiosLogger from "axios-logger";

import axios, { Axios, AxiosError } from "axios";
import APIError, {
  ErrorType,
  getErrorMessage,
  getErrorTypeByCode,
} from "@models/ApiError";
import { ApiResult, failed } from "@models/ApiResult";

export interface IRequest<S, D> {
  url: string;
  method: "post" | "get" | "delete" | "put";
  requestBody?: any;
  validator?: ZodType;
  transformer?: (response: S) => D;
}

export default class HttpService {
  private _axios: Axios;
  private token: string | null = null;
  private onUnAuthorized: (() => void) | undefined = undefined;

  constructor(private baseURL: string) {
    this._axios = axios.create();
    this._axios.interceptors.request.use(
      AxiosLogger.requestLogger,
      AxiosLogger.errorLogger
    );
    this._axios.interceptors.response.use(
      AxiosLogger.responseLogger,
      AxiosLogger.errorLogger
    );
    this._axios.defaults.timeout = 10000;
  }

  setToken(token: string | undefined) {
    if (token) this.token = `Bearer ${token}`;
    else this.token = null;
  }

  setOnUnAuthorizedListener(onUnAuthorized: (() => void) | undefined) {
    this.onUnAuthorized = onUnAuthorized;
  }

  request = async <S, D>(request: IRequest<S, D>): Promise<ApiResult<D>> => {
    const {
      validator,
      transformer: transform,
      method,
      url,
      requestBody,
    } = request;

    try {
      const response = await this._axios.request<S>({
        baseURL: this.baseURL,
        url,
        method,
        data: requestBody,
        headers: this.token ? { Authorization: this.token } : undefined,
      });

      if (validator) {
        const result = validator.safeParse(response.data);
        if (!result.success) {
          console.log(
            `validator Error: api changed in the server: ${result.error.message}`
          );
          return failed({
            code: 0,
            type: ErrorType.ResponseValidationFailed,
            message: "پارمترهای ارسالی از سرور صحیح نمیباشد",
          });
        }
      }
      return {
        data: transform ? transform(response.data) : response.data,
        success: true,
      } as ApiResult<D>;
    } catch (_error: any) {
      console.log(_error);

      const response = (_error as AxiosError).response;
      //FIXME:TODO: handle timeout and not internet connected
      const errorCode = response?.status || -1;
      const errorType = getErrorTypeByCode(errorCode);

      const mError: APIError = {
        code: errorCode,
        message:
          (response?.data as APIError)?.message || getErrorMessage(errorType),
        type: errorType,
      };

      if (mError.type === ErrorType.UnAuthorized && this.onUnAuthorized)
        this.onUnAuthorized();

      return {
        error: mError,
        success: false,
      } as ApiResult<D>;
    }
  };
}
