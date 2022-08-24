import CreateUserRequest from "@DTOs/api/CreateUserRequest";
import LoginRequest from "@DTOs/api/LoginRequest";
import { ApiResult } from "@models/ApiResult";
import Center from "@models/Center";
import CreateUserResponse from "@models/CreateUserResponse";
import GetAllUsersResponse from "@models/GetAllUsersResponse";
import User from "@models/User";

export default interface IApiClient {
  login: (request: LoginRequest) => Promise<ApiResult<User>>;
  getAllUsers: () => Promise<ApiResult<GetAllUsersResponse>>;
  createUser: (
    request: CreateUserRequest
  ) => Promise<ApiResult<CreateUserResponse>>;
  updateUser: (
    id: number,
    request: CreateUserRequest
  ) => Promise<ApiResult<CreateUserResponse>>;

  deleteUser: (id: number) => Promise<ApiResult<CreateUserResponse>>;
  disableUser: (id: number, isDisable: boolean) => Promise<ApiResult<CreateUserResponse>>;
  fetchCenters: () => Promise<ApiResult<Center[]>>;
}
