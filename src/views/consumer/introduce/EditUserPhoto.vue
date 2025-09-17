<template>
  <seen-blank-row title="顶部空白"/>
  <seen-go-back/>
  <van-row>
    <van-col span="2" style="opacity: 0">空白列</van-col>
    <van-col span="20">头像照片</van-col>
    <van-col span="2" style="opacity: 0">空白列</van-col>
  </van-row>
  <van-row title="头像照片">
    <seen-photo-upload
        v-model:photo-ids="firstImageIds"
        :dis-operate="!haveFirstPhotoId"
    />
  </van-row>
  <van-row>
    <van-col span="2" style="opacity: 0">空白列</van-col>
    <van-col span="20">主页照片</van-col>
    <van-col span="2" style="opacity: 0">空白列</van-col>
  </van-row>
  <van-row title="主页照片">
    <seen-photo-upload
        v-model:photo-ids="secondImageIds"
        :max="9"
        :dis-operate="!haveSecondPhotoId"
    />
  </van-row>
  <van-row title="保存照片">
    <van-col span="24">
      <van-button round type="primary" @click="onClickSavePhotoOk"
      >保存
      </van-button>
    </van-col>
  </van-row>
  <seen-blank-row title="底部空白"/>
</template>

<script lang="ts" setup>
import type {AxiosResponse} from "axios";
import {showToast} from "vant";
import type {ComputedRef, Ref} from "vue";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";

import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import SeenGoBack from "../../../components/SeenGoBack.vue";
import SeenPhotoUpload from "../../../components/consumer/photo/SeenPhotoUpload.vue";
import {API_BASIC_INFO} from "../../../http/basic-info-service-api";
import seenAxios from "../../../http/seen-axios";
import type {OrderAndPhotoId} from "../../../model/consumer/introduce/introduce-photo-model";
import {IntroduceTypeEnum} from "../../../model/consumer/photo/IntroduceTypeAndPhoto";
import type {R} from "../../../model/sys/api-result";
import {StatusCode} from "../../../model/sys/api-result";
import PhotoUtil from "../../../util/consumer/photo/photo-util";
//上传主页照片
const onClickSavePhotoOk = () => {
  save();
};
const save = () => {
  if (!firstImageIds.value[0]) {
    showToast("头像未上传");
    return;
  }
  let firstImageId = firstImageIds.value[0];
  const orderAndPhotoIds: OrderAndPhotoId[] = secondImageIds.value
      .filter((value) => value !== 0)
      .map((value, index) => {
        return {
          photoId: value,
          order: index + 1,
        };
      });
  const config = {
    ...API_BASIC_INFO.savePrimaryPhoto,
    data: orderAndPhotoIds,
    params: {
      mainPhotoId: firstImageId,
      max: 9,
      introduceTypeEnum: IntroduceTypeEnum.MAIN_PAGE,
    },
  };
  seenAxios<boolean>(config).then((res: AxiosResponse<boolean>) => {
    if (res.data) {
      showToast({type: "success", message: "保存图片成功"});
      goBack();
    }
  });
};
const userRouter = useRouter();
const goBack = () => {
  userRouter.go(-1);
};

//上传头像照片
const firstImageIds = ref<number[]>([]);
const secondImageIds: ComputedRef<number[]> = computed(() => {
  if (secondOrderToPhotoId.value) {
    return PhotoUtil.orderToPhotoIdToImageIds(secondOrderToPhotoId.value);
  } else {
    return [];
  }
});
const secondOrderToPhotoId: Ref<Record<number, number> | undefined> =
    ref<Record<number, number>>();
const selfUserIdToMainPhoto = () => {
  const config = {
    ...API_BASIC_INFO.selfUserIdToMainPhoto,
  };
  seenAxios<R<{ longPhotoUrl: string; id: number }>>(config).then((res) => {
    haveFirstPhotoId.value = false;
    if ((res.data.code) === StatusCode.SUCCESS) {
      if (res.data && res.data.data.longPhotoUrl != null) {
        firstImageIds.value = [res.data.data.id];
        haveFirstPhotoId.value = true;
      }
    }
  });
};
const selfUserIdToSecondPhoto = () => {
  haveSecondPhotoId.value = false;
  return seenAxios<R<Record<number, number>>>({
    ...API_BASIC_INFO.selfUserIdToMainPagePhoto,
  }).then((res) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      secondOrderToPhotoId.value = res.data.data;
      haveSecondPhotoId.value = true;
    }
  });
};
const haveFirstPhotoId = ref(false);
const haveSecondPhotoId = ref(false);
onMounted(() => {
  selfUserIdToMainPhoto();
  selfUserIdToSecondPhoto();
});
</script>

<style scoped></style>
