import CreateUserRequest from "@DTOs/api/CreateUserRequest";
import { ApiResult, succeed } from "@models/ApiResult";
import Center from "@models/Center";
import CreateUserResponse from "@models/CreateUserResponse";
import GetAllUsersResponse from "@models/GetAllUsersResponse";
import User from "@models/User";
import { fakeCenters, FakeGetUserResponse, fakeUser } from "@utils/FakeData";
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

  getAllUsers: async (): Promise<ApiResult<GetAllUsersResponse>> => {
    await delay(1000);
    return succeed(FakeGetUserResponse);
  },

  createUser: async (
    req: CreateUserRequest
  ): Promise<ApiResult<CreateUserResponse>> => {
    /*  await delay(2000);
     return failed({
      code: 400,
      message: "پارامترهای ارسالی نادرست است",
      type: ErrorType.UnAuthorized,
    });  */
    return succeed({
      id: 1,
      centerName: "بافق",
      role: fakeUser.role,
      ...req,
    });
  },

  updateUser: async (
    id: number,
    req: CreateUserRequest
  ): Promise<ApiResult<CreateUserResponse>> => {
    /*  await delay(2000);
     return failed({
      code: 400,
      message: "پارامترهای ارسالی نادرست است",
      type: ErrorType.UnAuthorized,
    });  */
    return succeed({
      id,
      centerName: "بافق",
      role: fakeUser.role,
      ...req,
    });
  },

  deleteUser: async (id: number): Promise<ApiResult<User>> => {
    await delay(1000);
    return succeed(fakeUser);
  },

  fetchCenters: async (): Promise<ApiResult<Array<Center>>> => {
    await delay(1000);
    // return failed({
    //   code: 400,
    //   message: "پارامترهای ارسالی نادرست است",
    //   type: ErrorType.UnAuthorized,
    // });
    return succeed(fakeCenters);
  },
};
export default FakeApiClient;
