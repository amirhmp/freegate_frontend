import { z } from 'zod';
import Role from "@constants/Role";

export default interface User {
  id: number;
  name: string;
  mobile: string;
  token: string;
  role: Role;
  centerID: number;
  centerName: string | null;
}