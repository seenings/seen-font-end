<script lang="ts" setup>
import {showImagePreview, showNotify} from "vant";
import {computed, reactive, ref, watch} from "vue";

import type {AxiosProgressEvent, AxiosResponse} from "axios";
import {API_PHOTO} from "../../../../ts/http/photo-service-api.ts";
import seenAxios from "../../../../ts/http/seen-axios.ts";
import type {PhotoContent} from "../../../../ts/model/consumer/photo/file.ts";
import type {R} from "../../../../ts/model/sys/api-result.ts";
import {StatusCode} from "../../../../ts/model/sys/api-result.ts";
import photoService from "../../../../ts/service/cosumer/photo/photo-service";

interface Props {
  photoId: number;
  width?: number;
  height?: number;
}

const prop = withDefaults(defineProps<Props>(), {
  width: 100,
  height: 100,
});
const emit = defineEmits<{
  (event: "update:photoId", name: number | null): void;
}>();

const photoIdRef = computed({
  // getter
  get() {
    return prop.photoId;
  },
  // setter
  set(newValue: number | null) {
    emit("update:photoId", newValue);
  },
});
const widthAndHeight = computed<{ height: string; width: string }>(() => {
  return {height: prop.height + "px", width: prop.width + "px"};
});

const photoContent = reactive<PhotoContent>({
  file: null,
  compressImageUrl: "",
  imageUrl: "",
  status: "没上传",
});
const imageUrl = computed<string>(() => {
  return photoContent.imageUrl !== ""
      ? photoContent.imageUrl
      : photoContent.compressImageUrl;
});
watch(
    () => prop.photoId,
    (newVal, oldVal) => {
      if (newVal === null) {
        return;
      }
      if (newVal === oldVal) {
        return;
      }
      if (photoContent.imageUrl !== "" || photoContent.compressImageUrl !== "") {
        return;
      }
      photoIdToResourcesByCompress();
    }
);
const photoIdToResources = () => {
  photoContent.imageUrl = photoService.photoIdToPhotoUrl(photoIdRef.value);
  photoContent.status = "上传成功";
};
const photoIdToResourcesByCompress = () => {
  photoContent.compressImageUrl = photoService.photoIdToPhotoUrlByCompress(photoIdRef.value);
  photoContent.status = "上传成功";
};
const uploadPhoto = (e: Event) => {
  const fileInput = e.target as HTMLInputElement;
  if (fileInput && fileInput.files) {
    const fileList = fileInput.files as FileList;
    let file: File | undefined = fileList[0];
    if (!file) {
      return;
    }
    const formData:FormData = new FormData();
    formData.append("file", file);
    const uploadPhoto = API_PHOTO.uploadPhoto;
    //本地文件
    photoContent.file = file;
    photoContent.imageUrl = URL.createObjectURL(file);
    photoIdRef.value = null;
    clearProgress();
    seenAxios<R<number>>({
      method: uploadPhoto.method,
      url: uploadPhoto.url,
      headers: {
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
            photoIdRef.value = res.data.data;
            photoContent.status = "上传成功";
          } else {
            photoContent.status = "上传失败";
            showNotify({message: "图片上传失败，" + res.data.msg + "。"});
          }
          //上传成功处理逻辑
        })
        .catch((err: Error) => {
          //异常处理逻辑
          photoContent.status = "上传失败";
          console.error(err);
        });
  } else {
    photoContent.status = "没上传";
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
  let localFile: File = photoContent.file as File;
  formData.append("file", localFile);
  const uploadPhoto = API_PHOTO.uploadPhoto;
  photoIdRef.value = null;
  clearProgress();
  seenAxios<R<number>>({
    method: uploadPhoto.method,
    url: uploadPhoto.url,
    headers: {
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
          photoIdRef.value = res.data.data;
          photoContent.status = "上传成功";
        } else {
          photoContent.status = "上传失败";
          showNotify({message: "图片上传失败，" + res.data.msg + "。"});
        }
        //上传成功处理逻辑
      })
      .catch((err: Error) => {
        //异常处理逻辑
        photoContent.status = "上传成功";
        console.error(err);
      });
};
const clearPhoto = () => {
  photoContent.status = "没上传";
  clearProgress();
  photoContent.file = null;
  photoContent.compressImageUrl = "";
  photoContent.imageUrl = "";
  photoIdRef.value = null;
};
const imagePreview = (startPosition: number) => {
  if (photoContent.imageUrl === "") {
    photoIdToResources();
    let images: string[] = [photoContent.imageUrl];
    showImagePreview({
      images: images,
      startPosition: startPosition,
      closeable: true,
    });
  } else {
    let images: string[] = [photoContent.imageUrl];
    showImagePreview({
      images: images,
      startPosition: startPosition,
      closeable: true,
    });
  }
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
  <div :style="widthAndHeight">
    <van-row :style="widthAndHeight" style="position: absolute">
      <input v-show="false" ref="fileInput" type="file" @change="uploadPhoto"/>
    </van-row>
    <van-row
        v-if="photoContent.status === '没上传'"
        :style="widthAndHeight"
        align="center"
        justify="center"
        style="background-color: #eff2f5; cursor: pointer; position: absolute"
        @click="onClickPhotograph"
    >
      <van-col :span="24">
        <i
            class="van-badge__wrapper van-icon van-icon-photograph van-uploader__upload-icon"
        ></i>
      </van-col>
    </van-row>
    <van-row
        v-if="photoContent.status !== '没上传'"
        :style="widthAndHeight"
        align="center"
        justify="center"
        style="position: absolute"
    >
      <img
          :alt="photoContent.file?.name"
          :height="prop.height"
          :src="imageUrl"
          :width="prop.width"
          style="object-fit: cover"
          @click="imagePreview(0)"
          @load="onloadImg()"
      />
    </van-row>
    <van-row
        v-if="photoContent.status === '上传失败'"
        :style="widthAndHeight"
        align="center"
        justify="center"
        style="cursor: pointer; position: absolute"
    >
      <van-icon
          name="replay"
          style="color: #eff2f5; background-color: #1c1c1e"
          @click="reUploadPhoto"
      />
    </van-row>
    <van-row
        v-if="photoContent.status !== '没上传'"
        :style="{ width: prop.width + 'px' }"
        align="top"
        justify="end"
        style="position: absolute"
    >
      <van-icon
          name="cross"
          style="cursor: pointer; color: #eff2f5; background-color: #1c1c1e"
          @click="clearPhoto"
      />
    </van-row>
    <van-row
        v-if="rate !== 0 && progressView"
        :style="widthAndHeight"
        align="center"
        justify="center"
        style="position: absolute"
    >
      <van-circle
          v-model:current-rate="currentRate"
          :rate="rate"
          :speed="1000"
          :text="text"
          @click="progressView = false"
      />
    </van-row>
  </div>
</template>
<style scoped></style>
