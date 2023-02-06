import IAuthInfo from "@models/AuthInfo";

const key = "auth";

const getTokenFromStore = (): IAuthInfo | undefined => {
  const authInfo = localStorage.getItem(key);
  try {
    if (authInfo) return JSON.parse(authInfo);
    return undefined;
  } catch (ex) {
    removeUser();
    return undefined;
  }
};

const storeToken = (authInfo: IAuthInfo) => {
  localStorage.setItem(key, JSON.stringify(authInfo));
};

const removeUser = () => {
  localStorage.removeItem(key);
};

const authStorage = {
  getTokenFromStore,
  storeToken,
  removeUser,
};

export default authStorage;
