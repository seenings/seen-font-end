<script setup lang="ts">
import axios, { type AxiosResponse } from "axios";
import { ref } from "vue";
import { envService } from "../../../ts/config/sys/env";
import { API_PHOTO } from "../../../ts/http/photo-service-api.ts";
import seenAxios from "../../../ts/http/seen-axios.ts";

document.title = "测试页";
const uploadFile = (e: Event) => {
  const fileInput = e.target as HTMLInputElement;
  let file: File|undefined;
  if (fileInput && fileInput.files) {
    const fileList = fileInput.files as FileList;
    file = fileList[0];
  } else {
    console.error("不是文件");
    return;
  }
  if(!file){
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  const uploadPhoto = API_PHOTO.uploadPhoto;
  const axiosInstance = axios.create({
    baseURL: "/seen",
  });
  axiosInstance<number>({
    method: uploadPhoto.method,
    url: uploadPhoto.url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    onUploadProgress(progressEvent) {
      //上传进度的处理逻辑
      console.log(progressEvent.total);
    },
  })
    .then((res: AxiosResponse<number>) => {
      console.log(JSON.stringify(res));
      //上传成功的处理逻辑
    })
    .catch((err: Error) => {
      //异常处理逻辑
      console.error(err);
    });
};

// const eventSource = new EventSource(
//   "/seen/sse-v1/chat/create-chat/events" +
//     "?" +
//     ENV.getClientTokenName() +
//     "=" +
//     ENV.getClientToken()
// );
// eventSource.onmessage = function (event) {
//   //   console.log("数据：" + event.data);
//   //   messages.value.push(event.data);
// };
const messages = ref<string[]>([]);

const oneToOneMessages = ref<string[]>([]);
const eventSourceByOneToOne = new EventSource(
  "/seen/sse-v1/chat/create-chat/one-to-one" +
    "?" +
    envService.getClientTokenName() +
    "=" +
    envService.getClientToken()
);
eventSourceByOneToOne.onmessage = function (event) {
  console.log("数据：" + event.data);
  oneToOneMessages.value.push(event.data);
};
const sendMessage = () => {
  seenAxios<boolean>({
    method: "POST",
    url: "/seen/sse-v1/chat/create-chat/send-message",
  }).then((res) => {
    console.log("发送" + res.data);
  });
};
</script>

<template>
  <input type="file" @change="uploadFile" />
  <label>{{ messages }}</label>

  <button @click="sendMessage">模拟发送消息</button>
  <label>{{ oneToOneMessages }}</label>
</template>

<style scoped></style>
../../config../../http/photo-service-api../../http/seen-axios
