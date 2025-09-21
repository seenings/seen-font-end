<template>
  <van-row>
    <van-col span="24">
      <van-tabbar v-model="activeName" @change="change">
        <van-tabbar-item icon="home-o" name="主页">主页</van-tabbar-item>
        <!--        <van-tabbar-item icon="user-o" name="个人页">个人页</van-tabbar-item>-->
        <van-tabbar-item title="聊天" name="聊天">
          <span>聊天</span>
          <template #icon>
            <img src="/img/icons/icon-head.png" alt="聊天" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" name="设置">设置</van-tabbar-item>
      </van-tabbar>
    </van-col>
  </van-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { PathEnum } from "../../ts/router";
import { SeenRouterUtils } from "../../ts/router/SeenRouterUtils.ts";

interface Props {
  activeName: string;
}
const props = withDefaults(defineProps<Props>(), {
  activeName: "主页",
});
const activeName = ref<string>(props.activeName);
const router = useRouter();
const change = (value: string) => {
  let dest;
  switch (value) {
    case "主页":
    default:
      dest = PathEnum.MainSwipe;
      break;
    case "聊天":
      dest = PathEnum.ChatList;
      break;
    case "设置":
      dest = PathEnum.SettingPage;
      break;
  }
  SeenRouterUtils.toPage(router, dest, {});
};
</script>

<style scoped></style>
