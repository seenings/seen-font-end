import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
const ChatWindow = import("../views/consumer/chat/ChatWindow.vue");
const WriteZone = import("../views/consumer/enter/WriteZone.vue");
const MainSwipe = import("../views/consumer/first/MainSwipe.vue");
const SettingPage = import("../views/consumer/first/SettingPage.vue");
const ChatList = import("../views/consumer/first/ChatList.vue");
const RecUserInfo = import("../views/consumer/friend/RecUserInfo.vue");
const SendUserInfo = import("../views/consumer/friend/SendUserInfo.vue");
const BasicInfo = import("../views/consumer/index/BasicInfo.vue");
const LoginPage = import("../views/consumer/index/LoginPage.vue");
const PageNotFound = import("../views/consumer/index/PageNotFound.vue");
const WelcomePage = import("../views/consumer/index/WelcomePage.vue");
const EditBasicInformation = import(
  "../views/consumer/info/EditBasicInformation.vue"
);
const EditPersonIntroduce = import(
  "../views/consumer/introduce/EditPersonIntroduce.vue"
);
const EditTag = import("../views/consumer/introduce/EditTag.vue");
const EditUserPhoto = import("../views/consumer/introduce/EditUserPhoto.vue");
const PersonIntroduce = import(
  "../views/consumer/introduce/PersonIntroduce.vue"
);
const AboutSeen = import("../views/consumer/sys/AboutSeen.vue");
const PrivacySecurity = import("../views/consumer/sys/PrivacySecurity.vue");
// const TestPage = import("../tests/page/TestPage.vue");
import TestPage from "../tests/page/TestPage.vue";

export enum PathEnum {
  Login,
  BasicInfo,
  MainSwipe,
  TestPage,
  SendUserInfo,
  RecUserInfo,
  ChatList,
  SettingPage,
  Welcome,
  ChatWindow,
  WriteZone,
  AboutSeen,
  PrivacySecurity,
  PersonIntroduce,
  EditPersonIntroduce,
  EditBasicInformation,
  EditUserPhoto,
  EditTag,
}

export const routeMap = new Map<PathEnum, RouteRecordRaw>();
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
  meta: { requiresAuth: false },
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
    routeRecordRaw.name = PathEnum[routeMapKey].toLowerCase() + "";
    routeRecordRaw.path = "/" + PathEnum[routeMapKey].toLowerCase() + "";
    routes.push(routeRecordRaw);
  }
}
export const router = createRouter({
  history: createWebHistory("/seen-font-end"),
  routes: routes,
});

export * from "./SeenRouterUtils";
