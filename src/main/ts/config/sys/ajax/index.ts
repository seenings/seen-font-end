import { Ajax } from "../../../util/ajax.ts";
import { envService } from "../env";

export const ajaxService = new Ajax(envService);
