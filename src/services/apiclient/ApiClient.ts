import {
  ProfileResponseDto,
  ProfileResponseDtoType,
} from "@DTOs/api/ProfileResponseDto";
import { ApiResult, failed, succeed } from "@models/ApiResult";
import LoginRequest from "@models/DTOs/api/LoginRequest";
import User from "@models/User";
import HttpService from "@services/HttpService";
import { z } from "zod";
import IApiClient from "./IApiClient";

const service = new HttpService("http://10.144.60.50:3020/api/");

const getProfile = async (): Promise<ApiResult<ProfileResponseDto>> => {
  return await service.request<any, any>({
    url: "profile/me",
    method: "get",
    validator: ProfileResponseDtoType,
  });
};

const ApiClient: IApiClient = {
  login: async (request: LoginRequest): Promise<ApiResult<User>> => {
    const loginResult = await service.request<string, string>({
      url: "login",
      method: "post",
      requestBody: request,
      validator: z.string(),
    });

    if (!loginResult.success) return failed(loginResult.error!);

    service.setToken(loginResult.data!);

    const profileResult = await getProfile();

    console.log("profile received", profileResult);
    if (!profileResult.success) return failed(profileResult.error!);

    const profile = profileResult.data!;
    const user: User = {
      ...profile,
      role: profile.roleID,
      token: loginResult.data!,
    };
    return succeed(user);
  },
  getAllUsers: async () => {
    throw new Error("not yet implemented");
  },
};

const setClientToken = (token: string | undefined) => service.setToken(token);

const setOnUnAuthorized = (onUnAuthorizedListener: () => void) =>
  service.setOnUnAuthorizedListener(onUnAuthorizedListener);

export const ApiClientConfig = {
  setClientToken,
  setOnUnAuthorized,
};

export default ApiClient;
