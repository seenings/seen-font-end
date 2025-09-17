import {EnvProfile, EnvService} from "../../../service/sys/env";
import packageConfig from "../../../../package.json"

let env: ImportMetaEnv = import.meta.env;
let VITE_ENV_PROFILE: string = env.VITE_ENV_PROFILE;
const envProfile: EnvProfile =
  EnvProfile[VITE_ENV_PROFILE as keyof typeof EnvProfile];

const version: string = packageConfig.version
export const envService: EnvService = new EnvService(
  "seen-token",
  "",
  "/img/",
  envProfile,
  version
);
