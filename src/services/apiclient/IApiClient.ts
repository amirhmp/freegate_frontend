import { ApiResult } from "@models/ApiResult";
import User from "@models/User";
import LoginRequest from "@DTOs/api/LoginRequest";
import { GetAllUsersResponseDto } from "@DTOs/api/GetAllUsersResponseDto";

export default interface IApiClient {
  login: (request: LoginRequest) => Promise<ApiResult<User>>;
  getAllUsers: (
    request: LoginRequest
  ) => Promise<ApiResult<GetAllUsersResponseDto>>;
}
