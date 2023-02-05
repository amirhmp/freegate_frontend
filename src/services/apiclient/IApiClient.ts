import LoginRequest from "@DTOs/api/LoginRequest";
import { ApiResult } from "@models/ApiResult";
import { FetchDashboardDto } from "@models/DTOs/api/FetchDashboardDto";

export default interface IApiClient {
  login: (request: LoginRequest) => Promise<ApiResult<string>>;
  fetchDashboard: () => Promise<ApiResult<FetchDashboardDto>>;
}
