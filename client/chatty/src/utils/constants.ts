import { isDevEnv } from "./helper";

export const ENV: string = isDevEnv() ? "dev" : "prod"