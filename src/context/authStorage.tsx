const key = "auth";

const getTokenFromStore = (): string | undefined => {
  const token = localStorage.getItem(key);
  if (token) return token;
  return undefined;
};

const storeToken = (token: string) => {
  localStorage.setItem(key, token);
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
