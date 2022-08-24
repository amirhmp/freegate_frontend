import Role from "@constants/Role";

type GetAllUsersResponse = Array<{
  id: number;
  name: string;
  mobile: string;
  role: Role;
  centerID: number;
  centerName: string;
}>;

export default GetAllUsersResponse;
