<template >
<div style="overflow: hidden">
            <van-row style="text-align: center;position: relative">
                <van-col span="24" :style="{filter: 'blur(' + Math.max(0, data.remainTime.total / 100 - 10) + 'px)'}">
                      <van-image
                          alt="欢迎页"
                          :height="height-4-46-16"
                          :src="data.welcomeUrl"
                          :width="width-16"
                          fit="cover"
                      />
                </van-col>
              </van-row>
              <van-row style="text-align: center;position: absolute;
               top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;"
                class="seen-logo-name" :style="{filter: `blur(${Math.max(20 - data.remainTime.total / 100, 0)}px)`}">
                <van-col span="24">转觅</van-col>
                <van-col span="24">SEEN</van-col>
                <van-col span="24">
                  <van-count-down :time="data.remainTime.total"
                      millisecond
                      @finish="onFinish"
                      @change="onChange"
                      >
                       <template #default="timeData">
                          <span class="block">{{ timeData.seconds }}</span>
                        </template>
                  </van-count-down>
                </van-col>
            </van-row>
</div>
</template>

<script lang="ts" setup>
import {useWindowSize} from "@vant/use";
import {watch,reactive} from "vue";
import {useRouter} from "vue-router";
import {SeenRouterUtils} from "../../../../ts/router";
import loginService from "../../../../ts/service/cosumer/sys/login";
import {envService} from "../../../../ts/config/sys/env";
import {PathEnum} from "../../../../ts/router";
import type {
  CountDownCurrentTime,
} from 'vant';

const {width, height} = useWindowSize();
const router = useRouter();
const data = reactive<{
    time: number,
    remainTime: CountDownCurrentTime,
    welcomeUrl: string
}>({
    time: 3000,
    remainTime: {
        total: 3000,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 3,
        milliseconds: 3000
    },
    welcomeUrl: envService.imageUrl + "welcome.jpeg"
})


watch([width, height], () => {});

const goTo = () => {
  return loginService.isLogin().then((res: boolean) => {
    if (res) {
      SeenRouterUtils.toPage(router, PathEnum.MainSwipe, {});
    } else {
      SeenRouterUtils.toPage(router, PathEnum.Login, {});
    }
  });
};

const onChange = (value:CountDownCurrentTime) => {
  data.remainTime = value;
}

const onFinish = () => {
  return goTo();
};
</script>

<style scoped>
.seen-logo-name {
  color: var(--seen-primary-color);
  background: var(--seen-white-color);
  opacity: 0.8;
  font-size: var(--seen-font-big);
}
</style>
