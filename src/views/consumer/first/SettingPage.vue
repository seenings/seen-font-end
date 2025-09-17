<template>
  <seen-blank-row/>
  <van-row>
    <van-col span="1"></van-col>
    <van-col span="4">
      <van-image
          v-if="userInfo"
          :src="
          PhotoUtil.firstImageUrl(
            photoIdToPhotoContentMap[userInfo.mainPhotoId]
          )
        "
          alt="设置页头像"
          fit="cover"
          height="4rem"
          width="4rem"
          @click="
          imagePreview(
            [
              PhotoUtil.firstImageUrl(
                photoIdToPhotoContentMap[userInfo.mainPhotoId]
              ),
            ],
            0
          )
        "
      />
      <van-image
          v-else
          alt="welcome"
          fit="cover"
          height="4rem"
          src="./img/welcome.jpeg"
          width="4rem"
          @click="imagePreview(['/img/welcome.jpeg'], 0)"
      />
    </van-col>
    <van-col class="seen-left" span="8">
      <van-cell :title="userInfo ? userInfo.aliasName : '没有名'"/>
    </van-col>
    <van-col span="10">
      <van-row>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
        <van-col :span="22">
          <van-button hairline icon="edit" plain @click="onClickEditInfo"
          >修改基本资料
          </van-button>
        </van-col>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
      </van-row>
    </van-col>
    <van-col :span="1" style="opacity: 0">空白列</van-col>
  </van-row>
  <van-row>
    <van-col span="24">
      <van-cell-group>
        <van-cell
            border
            class="seen-left"
            icon="user-o"
            is-link
            title="个人信息"
            value=""
            @click="onClickPersonIntroduce"
        />
        <van-cell
            border
            class="seen-left"
            icon="lock"
            is-link
            title="隐私与安全"
            value=""
            @click="showPrivacySecurity"
        />
        <van-cell
            border
            class="seen-left"
            icon="share"
            is-link
            title="推荐给朋友"
            value=""
            @click="showShare = !showShare"
        />
        <van-cell
            border
            class="seen-left"
            icon="question"
            is-link
            title="关于"
            value=""
            @click="showAbout"
        />
        <van-cell
            border
            class="seen-left"
            icon="close"
            is-link
            style="color: darkred"
            title="注销登录"
            value=""
            @click="logout"
        />
      </van-cell-group>
    </van-col>
  </van-row>
  <van-share-sheet
      v-model:show="showShare"
      :options="options"
      title="立即分享给好友"
      @select="onSelect"
  />
  <van-row :height="40" title="底部栏">
    <main-page-bottom :active-name="bottomActiveName"></main-page-bottom>
  </van-row>
</template>
<script lang="ts" setup>
import type {ShareSheetOption} from "vant";
import {Cell as VanCell, CellGroup as VanCellGroup, showImagePreview, showToast,} from "vant";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import MainPageBottom from "../../../components/MainPageBottom.vue";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import {PathEnum, SeenRouterUtils} from "../../../router";

import type {AxiosResponse} from "axios";
import {envService} from "../../../config/sys/env";
import {API_BASIC_INFO} from "../../../http/basic-info-service-api";
import seenAxios from "../../../http/seen-axios";
import type {PhotoContent} from "../../../model/consumer/photo/file";
import {Sex} from "../../../model/consumer/user-info/Sex";
import type {UserInfo} from "../../../model/consumer/user-info/UserInfo";
import type {R,} from "../../../model/sys/api-result";
import {StatusCode} from "../../../model/sys/api-result";
import photoService from "../../../service/cosumer/photo/photo-service";
import loginService from "../../../service/cosumer/sys/login";
import PhotoUtil from "../../../util/consumer/photo/photo-util";

const bottomActiveName = ref<string>("设置");
const router = useRouter();
/**
 * 清理登录信息
 */
const logout = () => {
  envService.removeClientToken();
  loginService.clearLoginSession().then(() => {
    SeenRouterUtils.toPage(router, PathEnum.Login, {});
  });
};
const userInfo = ref<UserInfo>({
  userId: 0,
  aliasName: "",
  sex: Sex.MALE,
  mainPhotoId: 0,
});
const onClickEditInfo = () => {
  SeenRouterUtils.toPage(router, PathEnum.EditBasicInformation, {});
};
const photoIdToPhotoContentMap = ref<Record<number, PhotoContent>>({});
watch(userInfo, (newVal) => {
  if (newVal.mainPhotoId) {
    let photoId = userInfo.value.mainPhotoId;
    photoService.photoIdToResourcesByCompress(photoId).then((res) => {
      if (
          !photoIdToPhotoContentMap.value[photoId] ||
          photoIdToPhotoContentMap.value[photoId].imageUrl === ""
      ) {
        photoIdToPhotoContentMap.value[photoId] = {...res};
      }
    });
    let photoUrl = photoService.photoIdToPhotoUrl(photoId);
    photoIdToPhotoContentMap.value[photoId] = {
      file: null,
      compressImageUrl: photoUrl,
      imageUrl: photoUrl,
      status: '下载成功'
    }
  }
});
const loadUserInfo = () => {
  seenAxios<R<UserInfo>>({
    ...API_BASIC_INFO.selfUserInfo,
  }).then((res: AxiosResponse<R<UserInfo>>) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      userInfo.value = res.data.data;
    }
  });
};
const onClickPersonIntroduce = () => {
  SeenRouterUtils.toPage(router, PathEnum.PersonIntroduce, {
    pageUserId: userInfo.value?.userId,
  });
};
const showShare = ref(false);
const options = [
  [
    {name: "微信", icon: "wechat"},
    {name: "朋友圈", icon: "wechat-moments"},
    {name: "微博", icon: "weibo"},
    {name: "QQ", icon: "qq"},
  ],
  [
    {name: "复制链接", icon: "link"},
    {name: "分享海报", icon: "poster"},
    {name: "二维码", icon: "qrcode"},
    {name: "小程序码", icon: "weapp-qrcode"},
  ],
];

const onSelect = (option: ShareSheetOption) => {
  let href;
  switch (option.name) {
    case "复制链接":
      href = "/";
      clipboardToWriteText(href);
      showToast({message: `链接是${href}`});
      showShare.value = false;
      break;
    default:
      showToast(option.name + "的接口未对接");
      showShare.value = false;
  }
};
const imagePreview = (images: string[], startPosition: number) => {
  showImagePreview({
    images: images,
    startPosition: startPosition,
    closeable: true,
  });
};
const showAbout = () => {
  SeenRouterUtils.toPage(router, PathEnum.AboutSeen);
};
const showPrivacySecurity = () => {
  SeenRouterUtils.toPage(router, PathEnum.PrivacySecurity);
};

const clipboardToWriteText = (value: string) => {
  navigator.clipboard.writeText(value);
};

onMounted(() => {
  loadUserInfo();
});
</script>

<style scoped></style>
../../../service/cosumer/sys/login../../../service/cosumer/photo/photo-service
