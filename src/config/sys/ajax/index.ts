import { Ajax } from "../../../util/ajax";
import { envService } from "../env";

export const ajaxService = new Ajax(envService);
