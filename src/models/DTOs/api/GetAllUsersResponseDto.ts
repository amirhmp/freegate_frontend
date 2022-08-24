import Role from "@constants/Role";
import GetAllUsersResponse from "@models/GetAllUsersResponse";
import { z } from "zod";

export const GetAllUsersResponseDtoType = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    mobile: z.string(),
    roleID: z.nativeEnum(Role),
    centerID: z.number(),
    centerName: z.string(),
  })
);

export type GetAllUsersResponseDto = z.infer<typeof GetAllUsersResponseDtoType>;

export const transformGetAllUsersResponseDto = (dtos: GetAllUsersResponseDto): GetAllUsersResponse => {
  return dtos.map(dto => {
    return  {
      ...dto,
      role: dto.roleID
    }
  })
}
