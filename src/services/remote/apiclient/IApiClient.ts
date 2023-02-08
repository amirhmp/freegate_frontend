import LoginRequest from "@DTOs/api/LoginRequest";
import { ApiResult } from "@models/ApiResult";
import IAuthInfo from "@models/AuthInfo";
import { FetchDashboardDto } from "@models/DTOs/api/FetchDashboardDto";
import User from "@models/User";

export default interface IApiClient {
  login: (request: LoginRequest) => Promise<ApiResult<IAuthInfo>>;
  fetchDashboard: () => Promise<ApiResult<FetchDashboardDto>>;
  sync: () => Promise<ApiResult<{ message: string }>>;
  getAllUsers: () => Promise<ApiResult<User>>
}


