import IAuthInfo, { AuthInfoType } from "@models/AuthInfo";
import LocalStorageService from "./LocalStorageService";

const USER_KEY_STORAGE = "auth";

const auth = new LocalStorageService<IAuthInfo>(USER_KEY_STORAGE, AuthInfoType);

const LocalRepo = {
  auth,
};

export default LocalRepo;
