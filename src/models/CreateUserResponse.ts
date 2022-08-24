import Role from "@constants/Role";

export default interface CreateUserResponse {
  id: number;
  name: string;
  mobile: string;
  centerID: number;
  centerName: string | null;
  role: Role;
  password: string;
  isEnable: boolean;
}
