import Role from "@constants/Role";

export default interface IAuthInfo {
  id: string;
  roleId: Role;
  token: string;
}
