import type { LocationQueryRaw, Router } from "vue-router";
import { PathEnum, routeMap } from "./index";

export class SeenRouterUtils {
  static toPage(
    userRouter: Router,
    pathEnum: PathEnum,
    queryParam?: LocationQueryRaw,
  ) {
    const page = routeMap.get(pathEnum);
    const userRouterValue = userRouter;
    if (page) {
      /* empty */
    } else {
      pathEnum = PathEnum.Welcome;
    }
    return userRouterValue.push({
      name: PathEnum[pathEnum].toLowerCase(),
      query: queryParam,
    });
  }
}
