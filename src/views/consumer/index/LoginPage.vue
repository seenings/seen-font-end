<template>
  <van-row>
    <van-col span="24" style="text-align: center">登录页</van-col>
  </van-row>
  <seen-blank-row :height="(height - 150) / 2" />
  <van-row style="min-height: 150px">
    <van-col span="24">
      <van-row>
        <van-field
          v-model="data.phone"
          :disabled="!data.sendCodeBefore"
          label="手机号"
          placeholder="请输入手机号"
          required
        />
        <van-field
          v-if="false"
          v-model="data.smsCode"
          :placeholder="data.smsCodeDesc"
          center
          clearable
          label="短信验证码"
          :disabled="data.sendCodeBefore"
          maxlength="6"
          required
        >
          <template #button>
            <van-row>
              <van-col
                v-show="!data.sendCodeBefore"
                :span="data.sendCodeBefore ? 0 : 8"
              >
                <van-count-down
                  ref="countDown"
                  :auto-start="false"
                  :time="data.time"
                  format="ss秒"
                  style="margin: 20% 1%"
                  @finish="onFinish"
                />
              </van-col>
              <van-col :span="data.sendCodeBefore ? 24 : 16">
                <van-button
                  :disabled="!data.sendCodeBefore"
                  size="small"
                  type="primary"
                  @click="sendCode"
                  >发送验证码
                </van-button>
              </van-col>
            </van-row>
          </template>
        </van-field>
      </van-row>
      <van-row>
        <van-col span="24" style="opacity: 0">1</van-col>
      </van-row>
      <van-row>
        <van-col span="24" style="text-align: center">
          <van-button type="primary" @click="onLoginClick">登录</van-button>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script lang="ts" setup>
import { useWindowSize } from "@vant/use";
import { AxiosResponse } from "axios";
import {
Button as VanButton,
Col as VanCol,
CountDown as VanCountDown,
Field as VanField,
Row as VanRow,
showToast,
} from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import { AJAX, ENV } from "../../../config";
import { API_LOGIN } from "../../../http/login-service-api";
import { API_PUBLIC } from "../../../http/public-service-api";
import seenAxios from "../../../http/seen-axios";
import { BasicInfo } from "../../../model/consumer/user-info/BasicInfo";
import { R, StatusCode } from "../../../model/sys/api-result";
import { PathEnum, SeenRouterUtils } from "../../../router";

const { height } = useWindowSize();

const router = useRouter();
const countDown = ref();
const data = ref({
  time: 60000, //60秒验证
  smsCode: !ENV.isProd() ? "123456" : "",
  phone: ENV.isLocal() ? "15521200861" : "",
  smsId: "",
  sendCodeBefore: true,
  smsCodeDesc: ENV.isLocal() ? "输入123456" : "请输入短信验证码",
});
const onFinish = () => {
  showToast("倒计时结束");
  countDown.value.reset();
  data.value.sendCodeBefore = true;
};
const onLoginClick = () => {
  return login();
};
const login = () => {
  let loginPhone: Promise<number> = seenAxios<R<number>>({
    ...API_PUBLIC.loginPhone,
    data: {
      phone: data.value.phone,
      smsCode: data.value.smsCode,
      smsId: data.value.smsId,
    },
  }).then((res: AxiosResponse<R<number>>) => {
    if ((res.data.code ) === StatusCode.SUCCESS) {
      // 请求成功后就我们的数据从response取出并使返回的promise实例的状态变为成功的
      const token: string = res.headers[ENV.getClientTokenName()];
      if (token) {
        ENV.setClientToken(token);
      }
      return res.data.data;
    }
    throw new Error(res.statusText);
  });
  return loginPhone.then((userId) => {
    seenAxios<R<Record<number, BasicInfo>>>({
      ...API_LOGIN.userIdToBasicInfo,
      data: [userId],
    }).then((res: AxiosResponse<R<Record<number, BasicInfo>>>) => {
      if ((res.data.code ) === StatusCode.SUCCESS) {
        const basicInfo = res.data.data[userId];
        if (
          !basicInfo ||
          !basicInfo.graduated ||
          !basicInfo.sex ||
          !basicInfo.birthYear ||
          !basicInfo.education
        ) {
          SeenRouterUtils.toPage(router, PathEnum.BasicInfo, {
            userId: userId,
          });
        } else {
          SeenRouterUtils.toPage(router, PathEnum.MainSwipe, {});
        }
        return;
      }
      throw new Error(res.statusText);
    });
  });
};

const sendCode = () => {
  const config = {
    ...API_PUBLIC.sendCode,
    params: { phone: data.value.phone },
  };
  AJAX.request<number>(config).then((res) => {
    data.value.sendCodeBefore = false;
    data.value.smsId = res.data + "";
    countDown.value.start();
  });
};
</script>

<style scoped></style>
