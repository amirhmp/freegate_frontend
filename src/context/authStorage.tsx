import { fakeUser } from "@utils/FakeData";
import User from "../models/User";

const key = "auth";

const getUserFromStore = (): User | undefined => {
  const userJSON = localStorage.getItem(key);
  if (userJSON) return JSON.parse(userJSON) as User;
  return undefined;
};

const storeUser = (user: User) => {
  localStorage.setItem(key, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(key);
};

export default {
  getUserFromStore,
  storeUser,
  removeUser,
};