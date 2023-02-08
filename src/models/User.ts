import Role from "@constants/Role";
import z from "zod";

const UserType = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  role: z.string(),
  os: z.literal("android").or(z.literal("ios")),
  price: z.array(z.number()),
  xui_id: z.array(z.string()),
  roleID: z.nativeEnum(Role),
  total: z.number(),
  remain: z.number(),
});

export default interface User extends z.infer<typeof UserType> {
  id: number;
  username: string;
  name: string;
  role: string;
  os: "android" | "ios";
  price: number[];
  xui_id: string[];
  roleID: Role;
  total: number;
  remain: number;
}
