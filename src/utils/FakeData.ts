import { GetAllUsersResponseDto } from "@DTOs/api/GetAllUsersResponseDto";
import Role from "@constants/Role";
import User from "@models/User";
import { number, string } from "zod";
import Center from "@models/Center";
import GetAllUsersResponse from "@models/GetAllUsersResponse";

export const fakeCenters: Center[] = [
  {
    id: 1,
    currentValue: 1023,
    floor: 1050,
    peak: 1400,
    peakTime: "11:23",
    name: "اشکذر",
    remainCapacity: 10,
  },
  {
    id: 2,
    currentValue: 400,
    floor: 1050,
    peak: 800,
    peakTime: "13:13",
    name: "مهریز",
    remainCapacity: -10,
  },
  {
    id: 3,
    currentValue: 500,
    floor: 1050,
    peak: 700,
    peakTime: "13:13",
    name: "تفت",
    remainCapacity: -10,
  },
];

export const fakeUser: User = {
  id: 123,
  name: "امیرحسین مهدی پور",
  role: Role.SuperAdmin,
  token: "123123123123aaaa",
  mobile: "09362163813",
  centerID: 1,
  centerName: "بافق",
};

export const FakeGetUserResponse: GetAllUsersResponse = [
  {
    id: 1,
    name: "امیرحسین مهدی پور",
    mobile: "09362163813",
    role: Role.SuperAdmin,
    centerID: 1,
    centerName: "بافق",
    password: "1221",
    isEnable: false,
  },
  {
    id: 2,
    name: "علی اکبر غلامی",
    mobile: "09362163813",
    role: Role.Admin,
    centerID: 2,
    centerName: "ابرکوه",
    password: "1221",
    isEnable: true,
  },
];
