import { BASE_API_URL } from "@config";
import { ApiResult, failed, succeed } from "@models/ApiResult";
import LoginRequest from "@models/DTOs/api/LoginRequest";
import HttpService from "@services/HttpService";
import z from "zod";
import IApiClient from "./IApiClient";
import {
  FetchDashboardDto,
  FetchDashboardDtoType,
} from "@models/DTOs/api/FetchDashboardDto";
import jwtDecode from "jwt-decode";
import IAuthInfo from "@models/AuthInfo";

const service = new HttpService(BASE_API_URL);

const ApiClient: IApiClient = {
  login: async (request: LoginRequest): Promise<ApiResult<IAuthInfo>> => {
    const {
      success,
      data: _token,
      error,
    } = await service.request<string, string>({
      url: "/login",
      method: "post",
      requestBody: request,
      validator: z.string(),
    });

    if (!success) return failed(error!);

    const token = _token!;

    service.setToken(token);
    return succeed({
      token,
      ...getUserFromTokens(token!),
    });
  },
  fetchDashboard: (): Promise<ApiResult<FetchDashboardDto>> => {
    return service.request<FetchDashboardDto, FetchDashboardDto>({
      url: "/dashboard",
      method: "get",
      validator: FetchDashboardDtoType,
    });
  },
  sync: function (): Promise<ApiResult<{ message: string }>> {
    return service.request({
      url: "/users/sync",
      method: "post",
      validator: z.object({ message: z.string() }),
    });
  },
};

const setClientToken = (token: string | undefined) => {
  console.log("debug:" + token);
  service.setToken(token);
};

const setOnUnAuthorized = (onUnAuthorizedListener: (() => void) | undefined) =>
  service.setOnUnAuthorizedListener(onUnAuthorizedListener);

export const ApiClientConfig = {
  setClientToken,
  setOnUnAuthorized,
};

export default ApiClient;

function getUserFromTokens(token: string) {
  try {
    const decodedAccessToken = jwtDecode(token) as any;
    const id = decodedAccessToken["id"];
    const roleId = decodedAccessToken["roleID"];
    return {
      id,
      roleId,
    };
  } catch (ex) {
    throw new Error("token is not valid");
  }
}
