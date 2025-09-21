<script lang="ts" setup>
import axios, {type AxiosProgressEvent,type AxiosResponse } from "axios";
import { showImagePreview, showNotify } from "vant";
import { computed, reactive, ref } from "vue";
import { ENV } from "../../../../../ts/config";
import { API_PHOTO } from "../../../../../ts/http/photo-service-api.ts";
import {
  type PhotoContent,
  type PhotoStatus,
} from "../../../../../ts/model/consumer/photo/file.ts";
import {type R, StatusCode } from "../../../../../ts/model/sys/api-result.ts";

const photoContent = reactive<PhotoContent>({
  compressImageUrl: "",
  imageUrl: "",
  file: null,
  status: "没上传",
});
const imageUrl = computed<string>(() => {
  return photoContent.imageUrl !== ""
    ? photoContent.imageUrl
    : photoContent.compressImageUrl;
});
const data = reactive<{ status: PhotoStatus }>({
  status: "没上传",
});
const file = ref<File>();
const uploadPhoto = (e: Event) => {
  const fileInput = e.target as HTMLInputElement;
  if (fileInput.files) {
    const fileList = fileInput.files as FileList;
    if(fileList[0]) {
      file.value = fileList[0];
      const formData = new FormData();
      formData.append("file", file.value);
      const uploadPhoto = API_PHOTO.uploadPhoto;
      //本地文件
      photoContent.imageUrl = URL.createObjectURL(file.value);
      clearProgress();
      const axiosInstance = axios.create({
        baseURL: "/seen",
      });
      const tokenConfig = {"seen-token": ENV.getClientToken()};
      axiosInstance<R<number>>({
        method: uploadPhoto.method,
        url: uploadPhoto.url,
        headers: {
          ...tokenConfig,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        onUploadProgress(progressEvent: AxiosProgressEvent) {
          //实时获取最新下载进度
          if (progressEvent.total)
            rate.value = (progressEvent.loaded / progressEvent.total) * 100;
        },
      })
          .then((res: AxiosResponse<R<number>>) => {
            if ((res.data.code) === StatusCode.SUCCESS) {
              data.status = "上传成功";
            } else {
              data.status = "上传失败";
              showNotify({message: "图片上传失败，" + res.data.msg + "。"});
            }
            //上传成功处理逻辑
          })
          .catch((err: Error) => {
            //异常处理逻辑
            data.status = "上传失败";
            console.error(err);
          });
    }
  } else {
    data.status = "没上传";
    console.error("不是文件");
    return;
  }
};
const clearProgress = () => {
  currentRate.value = 0;
  rate.value = 0;
};
const reUploadPhoto = () => {
  const formData = new FormData();
  formData.append("file", file.value as File);
  const uploadPhoto = API_PHOTO.uploadPhoto;
  clearProgress();
  const tokenConfig = { "seen-token": ENV.getClientToken() };
  const axiosInstance = axios.create({
    baseURL: "/seen",
  });
  axiosInstance<R<number>>({
    method: uploadPhoto.method,
    url: uploadPhoto.url,
    headers: {
      ...tokenConfig,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    onUploadProgress(progressEvent: AxiosProgressEvent) {
      //实时获取最新下载进度
      if (progressEvent.total)
        rate.value = (progressEvent.loaded / progressEvent.total) * 100;
    },
  })
    .then((res: AxiosResponse<R<number>>) => {
      if ((res.data.code ) === StatusCode.SUCCESS) {
        data.status = "上传成功";
      } else {
        data.status = "上传失败";
        showNotify({ message: "图片上传失败，" + res.data.msg + "。" });
      }
      //上传成功处理逻辑
    })
    .catch((err: Error) => {
      //异常处理逻辑
      data.status = "上传成功";
      console.error(err);
    });
};
const clearPhoto = () => {
  data.status = "没上传";
  clearProgress();
  file.value = undefined;
  photoContent.compressImageUrl = "";
  photoContent.imageUrl = "";
};
const imagePreview = (images: string[], startPosition: number) => {
  showImagePreview({
    images: images,
    startPosition: startPosition,
    closeable: true,
  });
};
const progressView = ref(true);
const onloadImg = () => {
  progressView.value = false;
};
const currentRate = ref(0);
const text = computed(() => currentRate.value.toFixed(0) + "%");
const rate = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);
const onClickPhotograph = () => {
  let fileInputEle = fileInput.value as HTMLInputElement;
  fileInputEle.click();
};
</script>

<template>
  <van-row style="height: 100px; width: 100px; position: absolute">
    <input v-show="false" ref="fileInput" type="file" @change="uploadPhoto" />
  </van-row>
  <van-row
    v-if="data.status === '没上传'"
    align="center"
    justify="center"
    style="
      height: 100px;
      width: 100px;
      background-color: #eff2f5;
      cursor: pointer;
      position: absolute;
    "
    @click="onClickPhotograph"
  >
    <van-col :span="24">
      <i
        class="van-badge__wrapper van-icon van-icon-photograph van-uploader__upload-icon"
      ></i>
    </van-col>
  </van-row>
  <van-row
    v-if="data.status !== '没上传'"
    align="center"
    justify="center"
    style="width: 100px; height: 100px; position: absolute"
  >
    <img
      :alt="'照片' + photoContent.file?.name"
      :src="imageUrl"
      height="100px"
      style="object-fit: contain"
      width="100px"
      @click="imagePreview([photoContent.imageUrl], 0)"
      @load="onloadImg()"
    />
  </van-row>
  <van-row
    v-if="data.status === '上传失败'"
    align="center"
    justify="center"
    style="width: 100px; height: 100px; cursor: pointer; position: absolute"
  >
    <van-icon name="replay" @click="reUploadPhoto" />
  </van-row>
  <van-row
    v-if="data.status !== '没上传'"
    align="top"
    justify="end"
    style="width: 100px; position: absolute"
  >
    <van-icon name="cross" style="cursor: pointer" @click="clearPhoto" />
  </van-row>
  <van-row
    v-if="rate !== 0 && progressView"
    align="center"
    justify="center"
    style="width: 100px; height: 100px; position: absolute"
  >
    <van-circle
      v-model:current-rate="currentRate"
      :rate="rate"
      :speed="1000"
      :text="text"
      @click="progressView = false"
    />
  </van-row>
</template>
<style scoped></style>