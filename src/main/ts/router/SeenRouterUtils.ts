import type {LocationQueryRaw, Router} from "vue-router";
import {PathEnum, type PathEnumValue, routeMap} from "./index.ts";

export class SeenRouterUtils {
    static toPage(
        userRouter: Router,
        pathEnum: PathEnumValue,
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
            name: PathEnum.key(pathEnum).toLowerCase(),
            query: queryParam,
        });
    }
}
