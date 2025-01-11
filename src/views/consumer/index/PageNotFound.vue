<template>
  <van-row>
    <van-col span="4" style="opacity: 0">空白列</van-col>
    <van-col span="16">您的觅友已走丢</van-col>
    <van-col span="4" style="opacity: 0">空白列</van-col>
  </van-row>
  <van-row>
    <van-col span="4" style="opacity: 0">空白列</van-col>
    <van-col span="16">
      <van-button @click="toHome">3秒后跳转到主页</van-button>
    </van-col>
    <van-col span="4" style="opacity: 0">空白列</van-col>
  </van-row>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { PathEnum, SeenRouterUtils } from "../../../router";

const router = useRouter();
const route = useRoute();
const pathMatch = route.params.pathMatch;
console.log(pathMatch);
const toHome = () => {
  SeenRouterUtils.toPage(router, PathEnum.Welcome, {});
};
setTimeout(() => {
  toHome();
}, 3000);
</script>

<style scoped></style>
