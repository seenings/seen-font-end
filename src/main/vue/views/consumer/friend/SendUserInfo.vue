<template>
  <van-row title="标签页内容">
    <van-col :span="24">
      <van-nav-bar
          left-arrow
          left-text="返回"
          title="发送申请的情况"
          @click-left="onClickLeft"
      />
    </van-col>
  </van-row>
  <van-row title="介绍">
    <van-col :span="2" style="opacity: 0">空白列</van-col>
    <van-col :span="22">
      <seen-blank-row :height="10"></seen-blank-row>
      <van-row title="名字">
        <van-col :span="7" class="seen-font-bolder-weight seen-left">
          {{ userMainInfo.aliasName }}
        </van-col>
        <van-col :span="15">
          <van-icon name="star" style="color: #42b983"/>
          <label>{{ userMainInfo.userAuthEnum }}</label>
        </van-col>
      </van-row>
      <seen-blank-row :height="10"></seen-blank-row>
      <van-row title="地址">
        <van-col :span="7" style="text-align: left; font-weight: bold"
        >{{ "现居" + userMainInfo.currentResidenceCityName }}
        </van-col>
        <van-col :span="1" style="text-align: left; font-weight: bold"
        >·
        </van-col>
        <van-col :span="9" style="text-align: left; font-weight: bold"
        >{{
            userMainInfo.birthPlaceProvinceName +
            userMainInfo.birthPlaceCityName +
            "人"
          }}
        </van-col>
        <van-col :span="7" style="opacity: 0">空白列</van-col>
      </van-row>
      <seen-blank-row :height="10"></seen-blank-row>
      <van-row title="信息">
        <van-col :span="23" style="text-align: left"
        >{{
            userMainInfo.birthYear +
            "年" +
            "·" +
            userMainInfo.statureCm +
            "CM" +
            "·" +
            Education.key(userMainInfo.educationId) +
            "·" +
            userMainInfo.workPositionName
          }}
        </van-col>
      </van-row>
      <seen-blank-row/>
    </van-col>
  </van-row>
  <van-divider/>
  <van-row title="动态" @click="onClickPersonIntroduce">
    <van-col span="5"> 我的动态</van-col>
    <van-col span="16">
      <img
          v-for="(item, key) in secondaryPhotos.slice(
          0,
          Math.min(secondaryPhotos.length, 3)
        )"
          :key="key"
          :src="item"
          alt="写真"
          height="3rem"
          width="3rem"
      />
    </van-col>
    <van-col span="3">
      <van-icon name="arrow"/>
    </van-col>
  </van-row>
  <van-row>
    <van-col :span="1" style="opacity: 0">空白行</van-col>
    <van-col :span="22">
      <van-divider/>
      <van-row title="问答">
        <van-col :span="24" style="border: 1px">
          {{ applyContent.applyMsg }}
        </van-col>
      </van-row>
      <seen-blank-row/>
      <van-divider/>
      <van-row
          v-if="applyContent.applyStatusId === ApplyStatus['已通过好友请求']"
          title="同意"
      >
        <van-col :span="14" class="seen-primary-color"
        >{{ ApplyStatus.key(ApplyStatus["已通过好友请求"]) }}
        </van-col>
        <van-col :span="10" class="seen-font-smaller"
        >{{ DateUtil.dateToChinenseDateTime(applyContent.agreeTime) }}
        </van-col>
      </van-row>
      <van-row
          v-if="applyContent.applyStatusId === ApplyStatus['请求被拒绝']"
          title="拒绝"
      >
        <van-col :span="14" class="seen-primary-color"
        >{{ ApplyStatus.key(ApplyStatus["请求被拒绝"]) }}
        </van-col>
        <van-col :span="10" class="seen-font-smaller"
        >{{ DateUtil.dateToChinenseDateTime(applyContent.refuseTime) }}
        </van-col>
      </van-row>
      <van-row
          v-if="applyContent.applyStatusId === ApplyStatus['过期自动拒绝']"
          title="过期"
      >
        <van-col :span="14" class="seen-primary-color"
        >{{ ApplyStatus.key(ApplyStatus["过期自动拒绝"]) }}
        </van-col>
        <van-col :span="10" class="seen-font-smaller"
        >{{ DateUtil.dateToChinenseDateTime(new Date()) }}
        </van-col>
      </van-row>
      <seen-blank-row/>
      <van-row
          v-if="
          applyContent.applyStatusId !== ApplyStatus['未查看'] &&
          applyContent.applyStatusId !== ApplyStatus['过期自动拒绝']
        "
      >
        <van-col :span="14"
        >{{ ApplyStatus.key(ApplyStatus["被请求方查看了申请"]) }}
        </van-col>
        <van-col :span="10" class="seen-font-smaller"
        >{{ DateUtil.dateToChinenseDateTime(applyContent.lookTime) }}
        </van-col>
      </van-row>
      <seen-blank-row/>
      <van-row>
        <van-col :span="14">发出申请</van-col>
        <van-col :span="10" class="seen-font-smaller"
        >{{ DateUtil.dateToChinenseDateTime(applyContent.sendTime) }}
        </van-col>
      </van-row>
      <seen-blank-row/>
      <van-row>
        <van-col :span="8" style="opacity: 0">空白行</van-col>
        <van-col
            v-if="applyContent.applyStatusId === ApplyStatus['已通过好友请求']"
            :span="8"
        >
          <van-button @click="onClickGoChat">已经成为好友，去聊天</van-button>
        </van-col>
        <van-col
            v-else-if="
            applyContent.applyStatusId === ApplyStatus['请求被拒绝'] ||
            applyContent.applyStatusId === ApplyStatus['过期自动拒绝']
          "
            :span="8"
        >
          <van-button @click="onClickReApply">再次申请</van-button>
        </van-col>
        <van-col v-else :span="8">
          <van-button disabled>等待结果</van-button>
        </van-col>
        <van-col :span="8" style="opacity: 0">空白行</van-col>
      </van-row>
      <seen-blank-row/>
    </van-col>
    <van-col :span="1" style="opacity: 0">空白行</van-col>
  </van-row>
</template>

<script lang="ts" setup>
import {showNotify} from "vant";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import {AJAX} from "../../../../ts/config";
import {API_BASIC_INFO} from "../../../../ts/http/basic-info-service-api.ts";
import {API_FRIEND} from "../../../../ts/http/friend-service-api.ts";
import seenAxios from "../../../../ts/http/seen-axios.ts";
import {ApplyStatus} from "../../../../ts/model/consumer/friend/ApplyStatus.ts";
import type {UserMainInfo} from "../../../../ts/model/consumer/user-info/UserMainInfo.ts";
import type {R} from "../../../../ts/model/sys/api-result.ts";
import {StatusCode} from "../../../../ts/model/sys/api-result.ts";
import {PathEnum, router, SeenRouterUtils} from "../../../../ts/router";
import {DateUtil} from "../../../../ts/util/date-util.ts";
import {Education} from "../../../../ts/model/consumer/school/Education.ts";

const route = useRoute();
//对方的id
const pageUserId = Number(route.query.pageUserId);
const applyId = Number(route.query.applyId);
if (pageUserId == null || applyId == null) {
  showNotify({type: "danger", message: "页面访问异常"});
}

const onClickPersonIntroduce = () => {
  SeenRouterUtils.toPage(router, PathEnum.PersonIntroduce, {
    pageUserId: pageUserId,
  });
};

interface SendApplyContent {
  applyStatusId: number;
  applyMsg: string;
  agreeTime: Date;
  lookTime: Date;
  refuseTime: Date;
  sendTime: Date;
}

const onClickGoChat = () => {
  goChat();
};
const goChat = () => {
  //去聊天
  SeenRouterUtils.toPage(router, PathEnum.ChatWindow, {
    pageUserId: pageUserId,
  });
};
const onClickReApply = () => {
  reApply();
};
const reApply = () => {
  const config = {
    ...API_FRIEND.reApply,
    params: {
      pageUserId: pageUserId,
    },
  };
  AJAX.request<boolean>(config).then((res) => {
    if (res.code === StatusCode.SUCCESS.valueOf()) {
      if (res.data) {
        showNotify({type: "success", message: "发送消息成功"});
      } else {
        showNotify({type: "danger", message: res.msg});
      }
      router.go(0);
    }
  });
};
const applyContent = ref<SendApplyContent>({
  applyStatusId: ApplyStatus["被请求方查看了申请"].valueOf(),
  applyMsg: "你好，很开心认识你",
  agreeTime: new Date(),
  lookTime: new Date(),
  sendTime: new Date(),
  refuseTime: new Date(),
});
const onClickLeft = () => {
  router.back();
};
const secondaryPhotos = ref<string[]>([]);
const applyIdToSendApplyContent = () => {
  const config = {
    ...API_FRIEND.applyIdToSendApplyContent,
    data: [applyId],
  };
  AJAX.request<Record<number, SendApplyContent>>(config).then((res) => {
    if ((res.code) === StatusCode.SUCCESS) {
      if (res.data[applyId])
        applyContent.value = res.data[applyId];
    }
  });
};
const userMainInfo = ref<UserMainInfo>({
  userId: 0,
  mainPhotoId: 0,
  userAuthEnum: "HaveAuth",
  /**
   * 昵称
   */
  aliasName: "",
  currentResidenceProvinceName: "",
  /**
   * 现居城市名
   */
  currentResidenceCityName: "",
  /**
   * 出生省份名
   */
  birthPlaceProvinceName: "",
  /**
   * 出生城市名
   */
  birthPlaceCityName: "",
  /**
   * 出生年份
   */
  birthYear: 0,
  /**
   * 体重（千克）
   */
  weightKg: 0,
  /**
   * 身高（厘米）
   */
  statureCm: 0,
  /**
   * 学历
   */
  educationId: 2,
  workPositionName: "",
});
const userIdToUserMainInfo = () => {
  seenAxios<R<Record<number, UserMainInfo>>>({
    ...API_BASIC_INFO.userIdToUserMainInfo,
    data: [pageUserId],
  }).then((res) => {
    if(res.data.data[pageUserId])
    userMainInfo.value = res.data.data[pageUserId];
  });
};

onMounted(() => {
  applyIdToSendApplyContent();
  userIdToUserMainInfo();
});
</script>

<style scoped></style>
