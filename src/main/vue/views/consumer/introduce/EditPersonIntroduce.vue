<template>
  <seen-blank-row title="顶部留白"/>
  <van-row title="编辑个人介绍">
    <van-col :span="2" @click="onClickBack()">
      <van-icon name="arrow-left"/>
    </van-col>
    <van-col :span="20">
      {{ title }}
    </van-col>
    <van-col :span="2" style="opacity: 0">空白列</van-col>
  </van-row>
  <van-row title="内容">
    <van-col :span="1" style="opacity: 0">空白列</van-col>
    <van-col :span="22">
      <van-row title="介绍标题">
        <van-col :span="8" style="text-align: left">
          <van-tag plain size="large" text-color="#8A38F5">
            {{ personIntroduce.introduceTitle }}
          </van-tag>
        </van-col>
        <van-col :span="16" style="opacity: 0">空白列</van-col>
      </van-row>
      <van-row title="介绍内容">
        <van-col :span="24">
          <van-field
              v-model="content"
              :placeholder="'请输入' + personIntroduce.introduceTitle"
              autosize
              label=""
              maxlength="800"
              rows="5"
              show-word-limit
              style="white-space: pre-wrap; text-align: left"
              type="textarea"
          />
        </van-col>
      </van-row>
      <van-row title="介绍写真">
        <seen-photo-upload
            v-model:photo-ids="introducePhotoIds"
            :max="maxPhotoCount"
        />
      </van-row>
      <seen-blank-row title="留白"/>
      <van-row title="保存按钮">
        <van-col :span="4" style="opacity: 0">空白列</van-col>
        <van-col :span="16">
          <van-button round type="primary" @click="onClickSave"
          >保存
          </van-button>
        </van-col>
        <van-col :span="4" style="opacity: 0">空白列</van-col>
      </van-row>
    </van-col>
    <van-col :span="1" style="opacity: 0">空白列</van-col>
  </van-row>

  <seen-blank-row title="底部留白"/>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import type {ComputedRef} from "vue";
import {useRoute, useRouter} from "vue-router";

import type {OrderAndPhotoId} from "../../../../ts/model/consumer/introduce/introduce-photo-model.ts";

import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import SeenPhotoUpload from "../../../components/consumer/photo/SeenPhotoUpload.vue";
import {AJAX} from "../../../../ts/config";
import {API_BASIC_INFO} from "../../../../ts/http/basic-info-service-api.ts";
import type {PersonIntroduce} from "../../../../ts/model/consumer/user-info/UserInfo.ts";
import {type R, StatusCode} from "../../../../ts/model/sys/api-result.ts";
import PhotoUtil from "../../../../ts/util/consumer/photo/photo-util.ts";
import seenAxios from "../../../../ts/http/seen-axios.ts";

const title = "编辑个人介绍";
document.title = title;
const route = useRoute();

const introduceTypeIndex = Number(route.query.introduceTypeIndex);
const content = ref<string>("");
const onClickBack = () => {
  goBack();
};
const userRouter = useRouter();
const goBack = () => {
  userRouter.go(-1);
};
const onClickSave = () => {
  save();
};
const save = () => {
  const orderAndPhotoIds: OrderAndPhotoId[] = introducePhotoIds.value
      .filter((value) => value !== 0)
      .map((value, index) => {
        return {
          photoId: value,
          order: index + 1,
        };
      });
  const config = {
    ...API_BASIC_INFO.savePersonIntroduce,
    data: {
      introduceTypeIndex: introduceTypeIndex,
      introduceContent: content.value,
      orderAndPhotoIds: orderAndPhotoIds,
      max: maxPhotoCount.value,
    },
  };
  AJAX.request<boolean>(config).then((res) => {
    if ((res.code) === StatusCode.SUCCESS) {
      goBack();
    }
  });
};
const personIntroduce = ref<PersonIntroduce>({
  introduceTitle: "",
  introduceContent: "",
  introduceTypeId: introduceTypeIndex,
  orderToPhotoIdMap: {},
});
const introduceTypeIndexToPersonIntroduce = () => {
  const config = {
    ...API_BASIC_INFO.introduceTypeIndexToPersonIntroduce,
    data: [introduceTypeIndex],
  };
  seenAxios<R<Record<number, PersonIntroduce>>>(config).then((res) => {
    if ((res.data.code) === StatusCode.SUCCESS && res.data.data[introduceTypeIndex]) {
      personIntroduce.value = res.data.data[introduceTypeIndex];
      content.value = personIntroduce.value.introduceContent;
    }
  });
};
//上传照片
const maxPhotoCount = ref<number>(9);
const introducePhotoIds: ComputedRef<number[]> = computed(() => {
  let data = personIntroduce.value.orderToPhotoIdMap;
  if (data) {
    return PhotoUtil.orderToPhotoIdToImageIds(data);
  } else {
    return [];
  }
});
onMounted(() => {
  introduceTypeIndexToPersonIntroduce();
});
</script>

<style scoped></style>
