import { GetAllUsersResponseDto } from "@DTOs/api/GetAllUsersResponseDto";
import { ErrorType } from "@models/ApiError";
import { ApiResult, failed, succeed } from "@models/ApiResult";
import User from "@models/User";
import { FakeGetUserResponse, fakeUser } from "@utils/FakeData";
import { delay } from "@utils/utils";
import IApiClient from "./IApiClient";

const FakeApiClient: IApiClient = {
  login: async (request): Promise<ApiResult<User>> => {
    await delay(1000);
    return succeed(fakeUser);
    /* return failed({
      code: 401,
      message: "نام کاربری یا گذرواژه اشتباه میباشد",
      type: ErrorType.UnAuthorized,
    }); */
  },

  getAllUsers: async (): Promise<ApiResult<GetAllUsersResponseDto>> => {
    await delay(1000);
    return failed({
      code: 401,
      message: "نام کاربری یا گذرواژه اشتباه میباشد",
      type: ErrorType.UnAuthorized,
    });
    return succeed(FakeGetUserResponse);
  },
};
export default FakeApiClient;
