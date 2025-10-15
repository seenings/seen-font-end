<script lang="ts" setup>
import { ref } from "vue";
import GoBack from "../../../components/GoBack.vue";

const content = ref("");
content.value =
  "" +
  "觅见组织\n" +
  "2022年5月3日\n" +
  "\n" +
  "\n" +
  "转觅隐私保护指引摘要\n" +
  "\n" +
  "转觅高度重视你的个人信息安全，我们将严格遵守法律法规，为你提供更加安全、可靠的服务。以下摘要能帮助你更直观、简洁地概览转觅隐私保护指引的内容。\n" +
  "1.我们收集的信息\n" +
  "2.我们如何保护信息\n" +
  "3.我们服务中涉及的第三方数据处理\n" +
  "4.你如何管理自己的信息";
</script>
<template>
  <go-back />
  <van-row>
    <van-col span="1" style="opacity: 0">空白列</van-col>
    <van-col span="22" style="white-space: pre-wrap; text-align: left"
      >{{ content }}
    </van-col>
    <van-col span="1" style="opacity: 0">空白列</van-col>
  </van-row>
</template>

<style scoped></style>
