<template>
  <van-nav-bar left-arrow @click-left="onClickLeft"> </van-nav-bar>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const onClickLeft = () => {
  router.go(-1);
};
</script>

<style scoped></style>
