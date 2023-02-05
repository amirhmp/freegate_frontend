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

const service = new HttpService(BASE_API_URL + "api");

const ApiClient: IApiClient = {
  login: async (request: LoginRequest): Promise<ApiResult<string>> => {
    const {
      success,
      data: token,
      error,
    } = await service.request<string, string>({
      url: "/login",
      method: "post",
      requestBody: request,
      validator: z.string(),
    });

    if (!success) return failed(error!);

    service.setToken(token);
    return succeed(token!);
  },
  fetchDashboard: (): Promise<ApiResult<FetchDashboardDto>> => {
    return service.request<FetchDashboardDto, FetchDashboardDto>({
      url: "/dashboard",
      method: "get",
      validator: FetchDashboardDtoType,
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
