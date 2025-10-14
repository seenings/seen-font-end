import {createRouter, createWebHistory} from "vue-router";
import routes from '~pages'

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});
export * from "./SeenRouterUtils.ts";

import {PathEnum} from "./path-enum.ts";

export {PathEnum}