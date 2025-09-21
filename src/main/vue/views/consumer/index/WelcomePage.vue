<template>
  <van-row>
    <van-col span="24">
      <van-row>
        <van-col span="24">
          <van-image
          alt="欢迎页"
            :height="height"
            :src="welcomeUrl"
            :style="{
              filter: 'blur(' + Math.max(0, time / 100 - 10) + 'px)',
            }"
            :width="width"
            fit="cover"
            position="center"
          />
        </van-col>
      </van-row>
      <van-row
        :style="{
          bottom: height / 4 + 'px',
          left: (width - 40 * 2) / 2 + 'px',
          filter: 'blur(' + Math.max(20 - time / 100, 0) + 'px)',
        }"
        class="seen-logo-name"
      >
        <van-col span="24" style="text-align: center">
          <van-row>
            <van-col span="24">转觅</van-col>
          </van-row>
          <van-row>
            <van-col span="24">SEEN</van-col>
          </van-row>
          <van-row>
            <van-col span="24">
              <van-count-down
                v-show="false"
                ref="countDown"
                :auto-start="true"
                :time="time"
                format="s"
                millisecond
                @finish="onFinish"
              />
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script lang="ts" setup>
import { useWindowSize } from "@vant/use";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {   SeenRouterUtils } from "../../../../ts/router";
import loginService from "../../../../ts/service/cosumer/sys/login";
import {envService} from "../../../../ts/config/sys/env";
import {PathEnum} from "../../../../ts/router/path-enum.ts";

const { width, height } = useWindowSize();
const router = useRouter();

const welcomeUrl = envService.imageUrl + "welcome.jpeg";
watch([width, height], () => {});
const goTo = () => {
  loginService.isLogin().then((res: boolean) => {
    if (res) {
      SeenRouterUtils.toPage(router, PathEnum.MainSwipe, {});
    } else {
      SeenRouterUtils.toPage(router, PathEnum.Login, {});
    }
  });
};

const time = ref<number>(3000);

const countDown = ref(null);

const onFinish = () => {
  goTo();
};
</script>

<style scoped>
.seen-logo-name {
  position: absolute;
  color: #1989fa;
  background: rgba(213, 210, 210, 0.49);
  opacity: 0.8;
  font-size: 40px;
}
</style>
