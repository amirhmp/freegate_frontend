import Center from "@models/Center";
import {
  CreateUserResponseDtoType,
  transformCreateUserResponseDto,
} from "@DTOs/api/CreateUserResponseDto";
import {
  GetAllUsersResponseDtoType,
  transformGetAllUsersResponseDto,
} from "@DTOs/api/GetAllUsersResponseDto";
import {
  ProfileResponseDto,
  ProfileResponseDtoType,
} from "@DTOs/api/ProfileResponseDto";
import { ApiResult, failed, succeed } from "@models/ApiResult";
import CreateUserResponse from "@models/CreateUserResponse";
import LoginRequest from "@models/DTOs/api/LoginRequest";
import {
  CenterDto,
  CenterDtoType,
  transformCenterDto,
} from "@models/DTOs/CenterDto";
import User from "@models/User";
import HttpService from "@services/HttpService";
import { z } from "zod";
import IApiClient from "./IApiClient";

// const service = new HttpService("http://10.144.60.50:3020/api/");
const service = new HttpService("http://localhost:3020/api/");
// const service = new HttpService("http://192.168.100.193:3020/api/");

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
    return await service.request({
      url: "users",
      method: "get",
      validator: GetAllUsersResponseDtoType,
      transformer: transformGetAllUsersResponseDto,
    });
  },

  createUser: async (request): Promise<ApiResult<CreateUserResponse>> => {
    return await service.request({
      url: "users",
      method: "post",
      requestBody: request,
      validator: CreateUserResponseDtoType,
      transformer: transformCreateUserResponseDto,
    });
  },

  updateUser: async (id, request): Promise<ApiResult<CreateUserResponse>> => {
    return await service.request({
      url: `users/${id}`,
      method: "put",
      requestBody: request,
      validator: CreateUserResponseDtoType,
      transformer: transformCreateUserResponseDto,
    });
  },
  deleteUser: async (id: number): Promise<ApiResult<CreateUserResponse>> => {
    return await service.request({
      url: `users/${id}`,
      method: "delete",
      validator: CreateUserResponseDtoType,
      transformer: transformCreateUserResponseDto,
    });
  },

  disableUser: async (id: number, isDisable: boolean) => {
    return await service.request({
      url: `users/${id}`,
      method: "put",
      requestBody: { isEnable: !isDisable },
      validator: CreateUserResponseDtoType,
      transformer: transformCreateUserResponseDto,
    });
  },

  fetchCenters: async (): Promise<ApiResult<Center[]>> => {
    return await service.request<CenterDto[], Center[]>({
      url: `centers`,
      method: "get",
      validator: z.array(CenterDtoType),
      transformer: (dtos) => dtos.map((dto) => transformCenterDto(dto)),
    });
  },

  fetchOnlineUsers: async (): Promise<ApiResult<number[]>> => {
    return await service.request({
      url: "users/online",
      method: "get",
      validator: z.array(z.number()),
    });
  },
};

const setClientToken = (token: string | undefined) => service.setToken(token);

const setOnUnAuthorized = (onUnAuthorizedListener: (() => void) | undefined) =>
  service.setOnUnAuthorizedListener(onUnAuthorizedListener);

export const ApiClientConfig = {
  setClientToken,
  setOnUnAuthorized,
};

export default ApiClient;
