<template>
  <h1>首页</h1>
</template>

<script lang="ts" setup>
import {PathEnum, SeenRouterUtils} from "../../ts/router";
import {useRouter} from "vue-router";

const router = useRouter();
SeenRouterUtils.toPage(router, PathEnum.Welcome);
</script>

<style scoped></style>
