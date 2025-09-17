<template>
  <van-tabs v-model:active="chatActiveName">
    <van-tab name="聊天列表">
      <template #title>
        <van-icon name="more-o"/>
        聊天列表
      </template>
      <seen-blank-row title="聊天列表顶部"/>
      <van-row>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
        <van-col :span="22">
          <van-list>
            <van-row
                v-for="(userChatInfo, index) in userChatInfos"
                :key="index"
                :style="{ height: height / 12 }"
            >
              <van-col v-if="userChatInfo!=null" span="5">
                <van-image
                    :alt="'照片' + userChatInfo.mainPhotoId"
                    :height="(width / 24) * 4"
                    :src="
                    PhotoUtil.firstImageUrl(
                      photoIdToPhotoContentMap[userChatInfo.mainPhotoId]
                    )
                  "
                    :width="(width / 24) * 4"
                    fit="cover"
                    @click="
                    imagePreview(
                      [
                        PhotoUtil.firstImageUrl(
                          photoIdToPhotoContentMap[userChatInfo.mainPhotoId]
                        ),
                      ],
                      0
                    )
                  "
                />
              </van-col>
              <van-col v-if="userChatInfo!=null" span="14" @click="openChatWindow(userChatInfo.userId)">
                <van-row>
                  <van-col class="seen-left" span="24"
                  >{{ userChatInfo.aliasName }}
                  </van-col>
                </van-row>
                <van-row>
                  <van-col class="seen-info-color seen-left" span="24"
                  >{{ userChatInfo.newestChatText }}
                  </van-col>
                </van-row>
              </van-col>
              <van-col v-if="userChatInfo!=null" span="5">
                <van-row>
                  <van-col class="seen-info-color seen-font-smaller" span="24">
                    {{ DateUtil.fromNowByMinute(userChatInfo.newestChatTime) }}
                  </van-col>
                </van-row>
                <van-row>
                  <van-col span="24">{{ " " }}</van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-list>
        </van-col>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
      </van-row>
    </van-tab>
    <van-tab name="申请记录">
      <template #title>
        <van-icon name="more-o"/>
        申请记录
      </template>
      <van-tabs v-model:active="applyActiveName">
        <van-tab name="收到的" title="收到的">
          <seen-blank-row/>
          <van-list v-if="!recInfos || recInfos.length === 0">
            <van-row>
              <van-col span="24">没有收到的请求</van-col>
            </van-row>
          </van-list>
          <van-list>
            <van-row v-for="(recInfo, index) in recInfos" :key="index">
              <van-col span="4">
                <van-image
                    :height="(width / 24) * 4"
                    :src="recInfo.mainPhotoUrl"
                    :width="(width / 24) * 4"
                    alt="照片"
                    fit="cover"
                    @click="imagePreview([recInfo.mainPhotoUrl], 0)"
                />
              </van-col>
              <van-col span="20">
                <van-row
                    @click="onClickOpenRecWindow(recInfo.userId, recInfo.applyId)"
                >
                  <van-col span="18">
                    <van-row>
                      <van-col class="seen-font-bolder-weight" span="6">
                        {{ recInfo.name }}
                      </van-col>
                      <van-col span="18" style="opacity: 0">空白列</van-col>
                    </van-row>
                    <van-row>
                      <van-col span="2" style="opacity: 0">空白列</van-col>
                      <van-col span="20">
                        {{ ApplyStatus[recInfo.applyStatus] }}
                      </van-col>
                      <van-col span="2" style="opacity: 0">空白列</van-col>
                    </van-row>
                  </van-col>
                  <van-col span="6">
                    <van-row>
                      <van-col span="24">
                        <van-button>查看</van-button>
                      </van-col>
                    </van-row>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-list>
          <seen-blank-row/>
        </van-tab>
        <van-tab name="发出的" title="发出的">
          <seen-blank-row/>
          <van-list v-if="!sendInfos || sendInfos.length === 0">
            <van-row>
              <van-col span="24">没有发出的请求</van-col>
            </van-row>
          </van-list>
          <van-list v-else>
            <van-row v-for="(sendInfo, index) in sendInfos" :key="index">
              <van-col span="4">
                <van-image
                    :height="(width / 24) * 4"
                    :src="sendInfo.mainPhotoUrl"
                    :width="(width / 24) * 4"
                    fit="cover"
                    @click="imagePreview([sendInfo.mainPhotoUrl], 0)"
                />
              </van-col>
              <van-col span="20">
                <van-row
                    @click="
                    onClickOpenSendWindow(sendInfo.userId, sendInfo.applyId)
                  "
                >
                  <van-col span="18">
                    <van-row>
                      <van-col class="seen-font-bolder-weight" span="6">
                        {{ sendInfo.name }}
                      </van-col>
                      <van-col span="18" style="opacity: 0">空白列</van-col>
                    </van-row>
                    <van-row>
                      <van-col span="2" style="opacity: 0">空白列</van-col>
                      <van-col span="20">
                        {{ ApplyStatus[sendInfo.applyStatus] }}
                      </van-col>
                      <van-col span="2" style="opacity: 0">空白列</van-col>
                    </van-row>
                  </van-col>
                  <van-col span="6">
                    <van-row>
                      <van-col
                          v-if="
                          sendInfo.applyStatus === ApplyStatus['已通过好友请求']
                        "
                          span="24"
                      >
                        <van-button>查看</van-button>
                      </van-col>
                      <van-col v-else span="24"
                      >{{ DateUtil.fromNowByMinute(sendInfo.applyTime) }}
                      </van-col>
                    </van-row>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-list>
          <seen-blank-row/>
        </van-tab>
      </van-tabs>
    </van-tab>
  </van-tabs>
  <van-row :height="40" title="底部栏">
    <main-page-bottom :active-name="bottomActiveName"></main-page-bottom>
  </van-row>
</template>

<script lang="ts" setup>
import {useWindowSize} from "@vant/use";
import {showImagePreview} from "vant";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import MainPageBottom from "../../../components/MainPageBottom.vue";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import {AJAX, ENV} from "../../../config";
import {API_CHAT} from "../../../http/chat-service-api";
import seenAxios from "../../../http/seen-axios";
import {ApplyStatus} from "../../../model/consumer/friend/ApplyStatus";
import type {PhotoContent} from "../../../model/consumer/photo/file";
import type {UserChatInfo} from "../../../model/consumer/user-info/UserInfo";
import type {R} from "../../../model/sys/api-result";
import {StatusCode} from "../../../model/sys/api-result";
import {PathEnum, SeenRouterUtils} from "../../../router";
import photoService from "../../../service/cosumer/photo/photo-service";
import PhotoUtil from "../../../util/consumer/photo/photo-util";
import {DateUtil} from "../../../util/date-util";
import {UrlUtils} from "../../../util/url-util";
import {envService} from "../../../config/sys/env";

const bottomActiveName = ref<string>("聊天");
const applyActiveName = ref<string>("收到的");
const chatActiveName = ref<string>("聊天列表");
const recInfos = ref<RecInfo[]>([
  {
    applyId: 0,
    mainPhotoUrl: "",
    name: "",
    applyStatus: 0,
    userId: 0,
  },
]);
const sendInfos = ref<SendInfo[]>([
  {
    mainPhotoUrl: "",
    name: "名字",
    applyId: 0,
    applyStatus: 0,
    userId: 0,
    applyTime: new Date(),
  },
]);

interface RecInfo {
  applyId: number;
  mainPhotoUrl: string;
  name: string;
  applyStatus: number;
  userId: number;
}

interface SendInfo {
  applyId: number;
  mainPhotoUrl: string;
  name: string;
  applyStatus: number;
  userId: number;
  applyTime: Date;
}

const router = useRouter();
const userChatInfos = ref<UserChatInfo[]>();
const photoIdToPhotoContentMap = ref<Record<number, PhotoContent>>({});
watch(userChatInfos, (newVal) => {
  let photoIds = [
    ...new Set(
        newVal?.filter(v => v != null).map((v) => {
          return v.mainPhotoId;
        })
    ),
  ];
  photoIds?.forEach((photoId) => {
    photoService.photoIdToResourcesByCompress(photoId).then((res) => {
      if (
          !photoIdToPhotoContentMap.value[photoId] ||
          photoIdToPhotoContentMap.value[photoId].imageUrl === ""
      ) {
        photoIdToPhotoContentMap.value[photoId] = {...res};
      }
    });
  });
  photoIds?.forEach((photoId) => {
    let photoUrl = photoService.photoIdToPhotoUrl(photoId);
    photoIdToPhotoContentMap.value[photoId] = {
      file: null,
      compressImageUrl: photoUrl,
      imageUrl: photoUrl,
      status: '下载成功'
    }
  });
});

const loadChatList = () => {
  seenAxios<R<UserChatInfo[]>>({
    ...API_CHAT.pageToUserChatInfo,
    params: {
      current: 1,
      size: 10,
    },
  }).then((res) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      userChatInfos.value = res.data.data;
    }
  });
};
const onClickOpenRecWindow = (pageUserId: number, applyId: number) => {
  SeenRouterUtils.toPage(router, PathEnum.RecUserInfo, {
    pageUserId: pageUserId,
    applyId: applyId,
  });
};
const onClickOpenSendWindow = (pageUserId: number, applyId: number) => {
  // 打开接收窗口
  SeenRouterUtils.toPage(router, PathEnum.SendUserInfo, {
    pageUserId: pageUserId,
    applyId: applyId,
  });
};
const openChatWindow = (pageUserId: number) => {
  SeenRouterUtils.toPage(router, PathEnum.ChatWindow, {
    pageUserId: pageUserId,
  });
};
const imagePreview = (images: string[], startPosition: number) => {
  showImagePreview({
    images: images,
    startPosition: startPosition,
    closeable: true,
  });
};

const selfUserIdToRecInfo = () => {
  const config = {
    ...API_CHAT.selfUserIdToRecInfo,
    params: {
      current: 1,
      size: 10,
    },
  };
  AJAX.request<RecInfo[]>(config).then((res) => {
    if ((res.code) === StatusCode.SUCCESS) {
      recInfos.value = res.data.map((n) => {
        n.mainPhotoUrl = UrlUtils.relationUrlToFullPathUrl(envService, n.mainPhotoUrl);
        return n;
      });
    }
  });
};
const selfUserIdToSendInfo = () => {
  const config = {
    ...API_CHAT.selfUserIdToSendInfo,
    params: {
      current: 1,
      size: 10,
    },
  };
  AJAX.request<SendInfo[]>(config).then((res) => {
    if ((res.code) === StatusCode.SUCCESS) {
      sendInfos.value = res.data.map((n) => {
        n.mainPhotoUrl = UrlUtils.relationUrlToFullPathUrl(ENV, n.mainPhotoUrl);
        return n;
      });
    }
  });
};

const {width, height} = useWindowSize();

onMounted(() => {
  loadChatList();
  selfUserIdToRecInfo();
  selfUserIdToSendInfo();
});
</script>

<style scoped></style>
../../../service/cosumer/photo/photo-service
