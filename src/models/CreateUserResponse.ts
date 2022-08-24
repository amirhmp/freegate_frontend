import Role from "@constants/Role";

export default interface CreateUserResponse {
  id: number;
  name: string;
  mobile: string;
  centerID: number;
  centerName: string;
  role: Role;
}
