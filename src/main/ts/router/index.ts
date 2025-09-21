import type {RouteRecordRaw} from "vue-router";
import {createRouter, createWebHistory} from "vue-router";

const ChatWindow = import("../../vue/views/consumer/chat/ChatWindow.vue");
const WriteZone = import("../../vue/views/consumer/enter/WriteZone.vue");
const MainSwipe = import("../../vue/views/consumer/first/MainSwipe.vue");
const SettingPage = import("../../vue/views/consumer/first/SettingPage.vue");
const ChatList = import("../../vue/views/consumer/first/ChatList.vue");
const RecUserInfo = import("../../vue/views/consumer/friend/RecUserInfo.vue");
const SendUserInfo = import("../../vue/views/consumer/friend/SendUserInfo.vue");
const BasicInfo = import("../../vue/views/consumer/index/BasicInfo.vue");
const LoginPage = import("../../vue/views/consumer/index/LoginPage.vue");
const PageNotFound = import("../../vue/views/consumer/index/PageNotFound.vue");
const WelcomePage = import("../../vue/views/consumer/index/WelcomePage.vue");
const EditBasicInformation = import(
    "../../vue/views/consumer/info/EditBasicInformation.vue"
    );
const EditPersonIntroduce = import(
    "../../vue/views/consumer/introduce/EditPersonIntroduce.vue"
    );
const EditTag = import("../../vue/views/consumer/introduce/EditTag.vue");
const EditUserPhoto = import("../../vue/views/consumer/introduce/EditUserPhoto.vue");
const PersonIntroduce = import(
    "../../vue/views/consumer/introduce/PersonIntroduce.vue"
    );
const AboutSeen = import("../../vue/views/consumer/sys/AboutSeen.vue");
const PrivacySecurity = import("../../vue/views/consumer/sys/PrivacySecurity.vue");
// const TestPage = import("../tests/page/TestPage.vue");
import TestPage from "../../vue/test/page/TestPage.vue";
import {Enum} from "enum-plus";

export const PathEnum = Enum({
    Login: 0,
    BasicInfo: 1,
    MainSwipe: 2,
    TestPage: 3,
    SendUserInfo: 4,
    RecUserInfo: 5,
    ChatList: 6,
    SettingPage: 7,
    Welcome: 8,
    ChatWindow: 9,
    WriteZone: 10,
    AboutSeen: 11,
    PrivacySecurity: 12,
    PersonIntroduce: 13,
    EditPersonIntroduce: 14,
    EditBasicInformation: 15,
    EditUserPhoto: 16,
    EditTag: 17
});
export type PathEnumKey = typeof PathEnum.keyType;
export type PathEnumValue = typeof PathEnum.valueType;

export const routeMap = new Map<PathEnumValue, RouteRecordRaw>();
//root
//first
routeMap.set(PathEnum.MainSwipe, {
    path: "/",
    component: () => MainSwipe,
});
routeMap.set(PathEnum.ChatList, {
    path: "/",
    component: () => ChatList,
});
routeMap.set(PathEnum.SettingPage, {
    path: "/",
    component: () => SettingPage,
});
//enter
routeMap.set(PathEnum.PersonIntroduce, {
    path: "/",
    component: () => PersonIntroduce,
});
//page
routeMap.set(PathEnum.Login, {
    path: "/",
    component: () => LoginPage,
    meta: {requiresAuth: false},
});
//page
routeMap.set(PathEnum.BasicInfo, {
    path: "/",
    component: () => BasicInfo,
});
//page
routeMap.set(PathEnum.SendUserInfo, {
    path: "/",
    component: () => SendUserInfo,
});
//page
routeMap.set(PathEnum.RecUserInfo, {
    path: "/",
    component: () => RecUserInfo,
});
//page
routeMap.set(PathEnum.Welcome, {
    path: "/",
    component: () => WelcomePage,
});
//page
routeMap.set(PathEnum.EditPersonIntroduce, {
    path: "/",
    component: () => EditPersonIntroduce,
});
//page
routeMap.set(PathEnum.EditBasicInformation, {
    path: "/",
    component: () => EditBasicInformation,
});
//page
routeMap.set(PathEnum.EditUserPhoto, {
    path: "/",
    component: () => EditUserPhoto,
});
//page
routeMap.set(PathEnum.EditTag, {
    path: "/",
    component: () => EditTag,
});
//page
routeMap.set(PathEnum.TestPage, {
    path: "/",
    component: TestPage,
});
routeMap.set(PathEnum.ChatWindow, {
    path: "/",
    component: () => ChatWindow,
});
routeMap.set(PathEnum.WriteZone, {
    path: "/",
    component: () => WriteZone,
});
routeMap.set(PathEnum.AboutSeen, {
    path: "/",
    component: () => AboutSeen,
});
routeMap.set(PathEnum.PrivacySecurity, {
    path: "/",
    component: () => PrivacySecurity,
});

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => WelcomePage,
        alias: "/index.html"
    },
    {
        path: "/:pathMatch(.*)*",
        components: {
            default: () => PageNotFound,
        },
    },
];
for (const routeMapKey of routeMap.keys()) {
    const routeRecordRaw = routeMap.get(routeMapKey);
    if (routeRecordRaw) {

        routeRecordRaw.name = PathEnum.key(routeMapKey).toLowerCase() + "";
        routeRecordRaw.path = "/" + PathEnum.key(routeMapKey).toLowerCase() + "";
        routes.push(routeRecordRaw);
    }
}
export const router = createRouter({
    history: createWebHistory("/seen-font-end"),
    routes: routes,
});

export * from "./SeenRouterUtils.ts";
