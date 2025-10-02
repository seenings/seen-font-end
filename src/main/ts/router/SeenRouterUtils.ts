import type {LocationQueryRaw, Router} from "vue-router";
import {type PathEnumValue} from "./path-enum.ts";

export class SeenRouterUtils {
    static toPage(
        router: Router,
        pathEnum: PathEnumValue,
        queryParam?: LocationQueryRaw,
    ) {
        console.debug(`路由到：${pathEnum}`)
        return router.push({
            path: `/${pathEnum}`,
            query: queryParam,
        });
    }
}
