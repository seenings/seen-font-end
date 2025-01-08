<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { showNotify } from "vant";
import { ref } from "vue";
import { API_PHOTO } from "../../../../http/photo-service-api";
import { PhotoContent } from "../../../../model/consumer/photo/file";
import { R, StatusCode } from "../../../../model/sys/api-result";

document.title = "测试页-多张图片上传";
const fileIndexToFileId = ref<{ [index: number]: PhotoContent }>({});
const uploadFile = (e: Event) => {
  const fileInput = e.target as HTMLInputElement;

  if (fileInput && fileInput.files) {
    const fileList = fileInput.files as FileList;
    for (let i = 0; i < fileList.length; i++) {
      let file: File = fileList[i];
      const formData = new FormData();
      formData.append("file", file);
      const uploadPhoto = API_PHOTO.uploadPhoto;
      const url = URL.createObjectURL(file);
      //本地文件
      let photoContent: PhotoContent = {
        imageUrl: url,
        compressImageUrl: url,
        file: file,
        status: "没上传",
      };
      fileIndexToFileId.value[i] = photoContent;
      const axiosInstance = axios.create({
        baseURL: "/seen",
      });
      axiosInstance<R<number>>({
        method: uploadPhoto.method,
        url: uploadPhoto.url,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        onUploadProgress(progressEvent) {
          //上传进度的处理逻辑
        },
      })
        .then((res: AxiosResponse<R<number>>) => {
          if ((res.data.code as StatusCode) === StatusCode.SUCCESS) {
            photoContent.status = "上传成功";
            fileIndexToFileId.value[i] = photoContent;
          } else {
            showNotify({ message: "第" + (i + 1) + "张图片上传失败" });
          }
          //上传成功的处理逻辑
        })
        .catch((err: Error) => {
          //异常处理逻辑
          console.error(err);
        });
    }
  } else {
    console.error("不是文件");
    return;
  }
};
</script>

<template>
  <van-row>
    <van-col :span="24">
      <input type="file" @change="uploadFile" multiple />
    </van-col>
  </van-row>
  <van-row>
    <van-col :span="8" v-for="(item, index) in fileIndexToFileId" :key="index">
      <van-row>
        <van-col :span="24">
          <van-icon v-if="item.status === '上传成功'" name="success" />
          <van-icon v-else name="cross" />
        </van-col>
      </van-row>
      <van-row>
        <van-col :span="24">
          <img
            height="100"
            width="100"
            :src="item.imageUrl"
            :alt="'图片' + index"
          />
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<style scoped></style>
../../../http/photo-service-api../../../model/consumer/photo/file../../../model/sys/api-result../../../http/photo-service-api../../../model/consumer/photo/file../../../model/sys/api-result