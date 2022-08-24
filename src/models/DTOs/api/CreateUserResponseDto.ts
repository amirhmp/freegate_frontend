import Role from "@constants/Role";
import CreateUserResponse from "@models/CreateUserResponse";
import { domainToASCII } from "url";
import { z } from "zod";

export const CreateUserResponseDtoType = z.object({
  id: z.number(),
  name: z.string(),
  mobile: z.string(),
  centerID: z.number(),
  centerName: z.string(),
  roleID: z.nativeEnum(Role),
});

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseDtoType>;

export const transformCreateUserResponseDto = (
  dto: CreateUserResponseDto
): CreateUserResponse => {
  return {
    ...dto,
    role: dto.roleID,
  };
};
