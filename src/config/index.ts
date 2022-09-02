export const BASE_API_URL = assertNotNullOrUndefined("REACT_APP_BASE_URL");
export const NODE_ENV = assertNotNullOrUndefined("NODE_ENV") as IEnv;

// if (APP_ENV === "development")
  console.log({
    NODE_ENV,
    BASE_API_URL,
  });

function assertNotNullOrUndefined(path: string): string {
  if (process.env[path]) return process.env[path] as string;
  throw new Error(`${path} is not defined in environment variables`);
}

type IEnv = "development" | "production";
