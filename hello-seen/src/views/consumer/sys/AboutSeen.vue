<template>
  <go-back />
  <van-row>
    <van-col span="24" style="opacity: 0">1</van-col>
  </van-row>
  <van-row>
    <van-col span="24" style="opacity: 0">1</van-col>
  </van-row>
  <van-row>
    <van-col span="8" style="opacity: 0">1</van-col>
    <van-col span="8">
      <van-row>
        <van-col span="24" style="text-align: center">
          <van-image
            fit="cover"
            height="5rem"
            alt="welcome"
            src="./img/welcome.jpeg"
            width="5rem"
          />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24" style="text-align: center">转觅</van-col>
      </van-row>
      <van-row>
        <van-col span="24" style="text-align: center"
          >Version {{ version }}</van-col
        >
      </van-row>
    </van-col>
    <van-col span="8" style="opacity: 0">1</van-col>
  </van-row>
  <van-row :style="{ 'margin-top': height / 2 + 'px' }">
    <van-col span="4" style="opacity: 0">1</van-col>
    <van-col span="16" style="text-align: center">
      {{authorName}} 版权所有
    </van-col>
    <van-col span="4" style="opacity: 0">1</van-col>
  </van-row>
  <van-row>
    <van-col span="4" style="opacity: 0">1</van-col>
    <van-col span="16" style="text-align: center">
      {{ copyright }}
    </van-col>
    <van-col span="4" style="opacity: 0">1</van-col>
  </van-row>
</template>

<script lang="ts" setup>
import {useWindowSize} from "@vant/use";
import {ref} from "vue";
import GoBack from "../../../components/GoBack.vue";
import {envService} from "../../../config/sys/env";

import packageConfig from "../../../../package.json"

const version = ref<string>(envService.getVersion());
const startYear = 2021;
const endYear = new Date().getFullYear();
const copyright = ref<string>("Copyright ©️ " + startYear + "-" + endYear);
const { height } = useWindowSize();

        const authorName: string = packageConfig.author.name;
</script>

<style scoped></style>
