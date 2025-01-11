<template>
  <seen-blank-row :height="60"></seen-blank-row>
  <van-skeleton :loading="loadingByUserMainInfo">
    <template #template>
      <van-skeleton-image :image-size="bigHeadHeight * widthToHeightRate"/>
    </template>
    <template #default>
      <van-row :style="{ height: height - 140 + 'px' }" title="左右滑动">
        <van-col v-if="userMainInfos.length === 0" span="24">
          无推荐的用户，请完善个人基本资料和补充个人经历有助于获取推荐用户。
        </van-col>
        <van-swipe :loop="false">
          <van-swipe-item
              v-for="(userMainInfo, key) in userMainInfos"
              :key="key"
          >
            <van-row>
              <van-col :span="1" style="opacity: 0">空白列</van-col>
              <van-col :span="22" @click="onClickEnter(userMainInfo.userId)">
                <van-row :style="{ height: bigHeadHeight + 'px' }" title="图片">
                  <van-col :span="24">
                    <van-image
                        :height="bigHeadHeight"
                        :src="
                        PhotoUtil.firstImageUrl(
                          photoIdToPhotoContentMap[userMainInfo.mainPhotoId]
                        )
                      "
                        :width="bigHeadHeight * widthToHeightRate"
                        alt="头像"
                        fit="cover"
                        position="center"
                    />
                  </van-col>
                </van-row>
                <van-row title="底下介绍">
                  <van-col :span="2" style="opacity: 0">空白列</van-col>
                  <van-col :span="22">
                    <seen-blank-row :height="10"></seen-blank-row>
                    <van-row title="名字">
                      <van-col
                          :span="7"
                          class="seen-left seen-font-bolder-weight"
                      >
                        {{ userMainInfo.aliasName }}
                      </van-col>
                      <van-col :span="15">
                        <van-icon name="star" style="color: #42b983"/>
                        <label>{{ userMainInfo.userAuthEnum }}</label>
                      </van-col>
                    </van-row>
                    <seen-blank-row :height="10"></seen-blank-row>
                    <van-row title="地址">
                      <van-col
                          :span="7"
                          style="text-align: left; font-weight: bold"
                      >{{ "现居" + userMainInfo.currentResidenceCityName }}
                      </van-col>
                      <van-col
                          :span="1"
                          style="text-align: left; font-weight: bold"
                      >·
                      </van-col>
                      <van-col
                          :span="9"
                          style="text-align: left; font-weight: bold"
                      >
                        <van-text-ellipsis
                            :content="`${
                            userMainInfo.birthPlaceProvinceName +
                            userMainInfo.birthPlaceCityName
                          }人`"
                        />
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
                          SchoolUtils.idToName(userMainInfo.educationId) +
                          "·" +
                          userMainInfo.workPositionName
                        }}
                      </van-col>
                    </van-row>
                    <seen-blank-row/>
                  </van-col>
                </van-row>
              </van-col>
              <van-col :span="1" style="opacity: 0">空白列</van-col>
            </van-row>
          </van-swipe-item>
          <template #indicator="{}">
            <div>{{ " " }}</div>
          </template>
        </van-swipe>
      </van-row>
    </template>
  </van-skeleton>
  <van-row :height="40" title="底部栏">
    <main-page-bottom :active-name="bottomActiveName"></main-page-bottom>
  </van-row>
</template>

<script lang="ts" setup>
import {useWindowSize} from "@vant/use";
import {computed, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import MainPageBottom from "../../../components/MainPageBottom.vue";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import {AJAX} from "../../../config";
import {API_BASIC_INFO} from "../../../http/basic-info-service-api";
import seenAxios from "../../../http/seen-axios";
import {PhotoContent} from "../../../model/consumer/photo/file";
import type {UserMainInfo} from "../../../model/consumer/user-info/UserMainInfo";
import {R} from "../../../model/sys/api-result";
import {PathEnum, SeenRouterUtils} from "../../../router";
import photoService from "../../../service/cosumer/photo/photo-service";
import PhotoUtil from "../../../util/consumer/photo/photo-util";
import {SchoolUtils} from "../../../util/consumer/school/school-util";

const bottomActiveName = ref<string>("主页");
const {width, height} = useWindowSize();
const bigHeadHeight = computed(() => height.value - 240);
const widthToHeightRate = ref<number>(
    Math.max(width.value / height.value, 9 / 16)
);
watch([width, height], () => {
  widthToHeightRate.value = Math.max(width.value / height.value, 9 / 16);
});
let mainUserIds = [1, 2, 3, 4];
const userMainInfos = ref<UserMainInfo[]>([]);
const router = useRouter();
const onClickEnter = (userId: number | undefined) => {
  SeenRouterUtils.toPage(router, PathEnum.PersonIntroduce, {
    pageUserId: userId,
  });
};
const userIdToRecommendUserId = () => {
  const config = {
    ...API_BASIC_INFO.userIdToRecommendUserId,
  };
  AJAX.request<number[]>(config).then((res) => {
    mainUserIds = res.data;
    userIdToUserMainInfo();
  });
};
const loadingByUserMainInfo = ref<boolean>(true);

const photoIdToPhotoContentMap = ref<Record<number, PhotoContent>>({});

watch(
    () => userMainInfos.value,
    (newVal, oldVal) => {
      let allPhotoIds: number[] = newVal.map((value) => {
        return value.mainPhotoId;
      });
      allPhotoIds.forEach((photoId) => {
        let url = photoService.photoIdToPhotoUrl(photoId);
        photoIdToPhotoContentMap.value[photoId] = {
          file: null,
          compressImageUrl: url,
          imageUrl: url,
          status: '下载成功'
        }
      });
    }
);
const userIdToUserMainInfo = () => {
  loadingByUserMainInfo.value = true;
  seenAxios<R<Record<number, UserMainInfo>>>({
    ...API_BASIC_INFO.userIdToUserMainInfo,
    data: mainUserIds,
  }).then((res) => {
    userMainInfos.value = Object.entries(res.data.data).map((n) => {
      return n[1];
    });
    loadingByUserMainInfo.value = false;
  });
};
onMounted(() => {
  userIdToRecommendUserId();
});
</script>

<style scoped></style>