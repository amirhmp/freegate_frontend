import Role from "@constants/Role";
import { z } from "zod";

export const GetAllUsersResponseDtoType = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    mobile: z.string(),
    role: z.nativeEnum(Role),
    center: z.object({
      id: z.number(),
      name: z.string(),
    }),
  })
);

export type GetAllUsersResponseDto = z.infer<typeof GetAllUsersResponseDtoType>;
