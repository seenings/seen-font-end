import {EnvProfile, type EnvProfileKey, type EnvProfileValue, EnvService} from "../../../service/sys/env";
import packageConfig from "../../../../../../package.json"

let env: ImportMetaEnv = import.meta.env;
let VITE_ENV_PROFILE: string = env.VITE_ENV_PROFILE;
const envProfile: EnvProfileValue =
    EnvProfile[VITE_ENV_PROFILE as EnvProfileKey];
const version: string = packageConfig.version
export const envService: EnvService = new EnvService(
    "seen-token",
    "",
    "/img/",
    envProfile,
    version
);
