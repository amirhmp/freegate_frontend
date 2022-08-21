import { GetAllUsersResponseDto } from "@DTOs/api/GetAllUsersResponseDto";
import Role from "@constants/Role";
import User from "@models/User";

export const fakeUser: User = {
  id: 123,
  name: "امیرحسین مهدی پور",
  role: Role.SuperAdmin,
  token: "123123123123aaaa",
  mobile: "09362163813",
  centerID: 1,
};

export const FakeGetUserResponse: GetAllUsersResponseDto = [
  {
    id: 1,
    name: "امیرحسین مهدی پور",
    mobile: "09362163813",
    role: Role.SuperAdmin,
    center: {
      id: 1,
      name: "بافق",
    },
  },
  {
    id: 2,
    name: "علی اکبر غلامی",
    mobile: "09362163813",
    role: Role.Admin,
    center: {
      id: 2,
      name: "ابرکوه",
    },
  },
];
