import Role from "@constants/Role";
import { z } from "zod";

export const ProfileResponseDtoType = z.object({
  id: z.number(),
  name: z.string(),
  mobile: z.string(),
  centerID: z.number(),
  centerName: z.string().nullable(),
  roleID: z.nativeEnum(Role),
});

export type ProfileResponseDto = z.infer<typeof ProfileResponseDtoType>;
