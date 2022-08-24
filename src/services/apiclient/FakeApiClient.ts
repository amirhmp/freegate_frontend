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
      isEnable: true,
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
      isEnable: true,
      ...req,
    });
  },

  deleteUser: async (id: number): Promise<ApiResult<CreateUserResponse>> => {
    await delay(1000);
    return succeed({
      id: fakeUser.id,
      centerID: fakeUser.centerID,
      mobile: fakeUser.mobile,
      centerName: fakeUser.centerName,
      name: fakeUser.name,
      role: fakeUser.role,
      password: "1221",
      isEnable: true,
    });
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
  disableUser: async () => {
    return succeed({
      id: fakeUser.id,
      centerID: fakeUser.centerID,
      mobile: fakeUser.mobile,
      centerName: fakeUser.centerName,
      name: fakeUser.name,
      role: fakeUser.role,
      password: "1221",
      isEnable: true,
    });
  },
};
export default FakeApiClient;
