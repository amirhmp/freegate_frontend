import Role from "@constants/Role";
import z from "zod";

export const AuthInfoType = z.object({
  id: z.string(),
  roleId: z.nativeEnum(Role),
  token: z.string(),
});
export default interface IAuthInfo extends z.infer<typeof AuthInfoType> {
  id: string;
  roleId: Role;
  token: string;
}
