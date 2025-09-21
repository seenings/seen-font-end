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
  max?: number;
  photoIds: number[];
  width?: number;
  height?: number;
  disOperate?: boolean;
}

const prop = withDefaults(defineProps<Props>(), {
  max: 1,
  width: 80,
  height: 80,
  disOperate: false,
});
const emit = defineEmits<{
  (event: "update:photoIds", name: number[]): void;
  (event: "update:disOperate", name: boolean): void;
}>();

const photoIdsRef = computed<number[]>({
  // getter
  get() {
    return prop.photoIds;
  },
  // setter
  set(newValue: number[]) {
    emit("update:photoIds", newValue);
  },
});

const disOperate = computed<boolean>({
  get() {
    return prop.disOperate;
  },
  set(newValue: boolean) {
    emit("update:disOperate", newValue);
  },
});
const widthAndHeight = computed<{ height: string; width: string }>(() => {
  return {height: prop.height + "px", width: prop.width + "px"};
});

let photoContents = ref<PhotoContent[]>([]);
const imageUrls = computed<string[]>(() => {
  return photoContents.value.map(photoContent => {
    return photoContent.imageUrl !== "" ? photoContent.imageUrl : photoContent.compressImageUrl;
  });
});
watch(
    () => photoIdsRef.value,
    (newVal: number[], oldVal) => {
      if (!newVal || newVal.length == 0) {
        return;
      }
      if (newVal === oldVal) {
        return;
      }
      //不在旧的里面的ID
      for (let index of newVal) {
        if (!photoContents.value[index]) {
          photoContents.value.push({
            file: null,
            compressImageUrl: "",
            imageUrl: "",
            status: "没上传",
          });
        }
        if (!progress[index]) {
          let item = {
            currentRate: 0,
            rate: 0,
            view: true,
          };
          progress.push(item);
        }
      }
      newVal.forEach((value, index) => {
        let valueElement: PhotoContent | undefined = photoContents.value[index];
        if (valueElement && valueElement.compressImageUrl !== "") {
          return;
        }
        photoService
            .photoIdToResourcesByCompress(value)
            .then((res: PhotoContent) => {
              let findIndex = photoIdsRef.value.findIndex((photoId) => {
                return photoId === value;
              });
              clearProgress(findIndex);
              let valueElement1: PhotoContent | undefined = photoContents.value[findIndex];
              if (valueElement1 && valueElement1.imageUrl === "") {
                photoContents.value.splice(findIndex, 1, {...res});
              }
              photoService.photoIdToResources(value).then((res: PhotoContent) => {
                let findIndex = photoIdsRef.value.findIndex((photoId) => {
                  return photoId === value;
                });
                clearProgress(findIndex);
                photoContents.value.splice(findIndex, 1, {...res});
              });
            });
      });
    }
);
const uploadPhoto = (index: number, file: File): Promise<PhotoContent> => {
  const formData = new FormData();
  formData.append("file", file);
  const uploadPhotoApi = API_PHOTO.uploadPhoto;
  let url = URL.createObjectURL(file);
  let photoContent: PhotoContent = {
    file: file,
    imageUrl: url,
    compressImageUrl: url,
    status: "没上传",
  };
  clearProgress(index);
  return seenAxios<R<number>>({
    method: uploadPhotoApi.method,
    url: uploadPhotoApi.url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    onUploadProgress(progressEvent: AxiosProgressEvent) {
      //实时获取最新下载进度
      if (progressEvent.total) {
        let progress1: {
          currentRate: number
          rate: number
          view: boolean
        } | undefined = progress[index];
        if (!progress1) {
          return
        }
        let item = {
          currentRate: progress1.currentRate,
          rate: (progressEvent.loaded / progressEvent.total) * 100,
          view: true,
        };
        progress.splice(index, 1, item);
      }
    },
  }).then((res: AxiosResponse<R<number>>) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      photoIdsRef.value[index] = res.data.data;
      photoContent.status = "上传成功";
    } else {
      photoContent.status = "上传失败";
      showNotify({message: "图片上传失败，" + res.data.msg + "。"});
    }
    return photoContent;
  });
};
const onUploadPhoto = (e: Event) => {
  const fileList: FileList | null = (e.target as HTMLInputElement).files;
  let length = photoContents.value.length;
  let currentIndex = length == 0 ? 0 : length;
  if (fileList != null) {
    let max = prop.max;
    let extra = length + fileList.length - max;
    let files: File[] = [];
    if (extra <= 0) {
      extra = 0;
    } else {
      showNotify({
        message: "图片最大上传" + max + "张，多出" + extra + "张的不会上传。",
      });
    }
    for (let i = 0; i < fileList.length - extra; i++) {
      let fileListElement: File | undefined = fileList[i];
      if (fileListElement) {
        files[i] = fileListElement;
      }
    }
    for (let i = 0; i < files.length; i++) {
      photoContents.value.push({
        file: null,
        compressImageUrl: "",
        imageUrl: "",
        status: "没上传",
      });
      let item = {
        currentRate: 0,
        rate: 0,
        view: true,
      };
      progress.push(item);
    }
    for (let i = 0; i < files.length; i++) {
      let index = currentIndex + i;
      let file: File | undefined = files[i];
      if (!file) {
        continue;
      }
      uploadPhoto(index, file)
          .then((res: PhotoContent) => {
            photoContents.value.splice(index, 1, res);
          })
          .catch((err: Error) => {
            //异常处理逻辑
            let photoContent: PhotoContent | undefined = photoContents.value[index];
            if (photoContent)
              photoContent.status = "上传失败";
            console.error(err);
          });
    }
  } else {
    let photoContent = photoContents.value[currentIndex];
    if (photoContent)
      photoContent.status = "没上传";
    console.error("不是文件");
    return;
  }
};
let progress = reactive<{ currentRate: number; rate: number; view: boolean }[]>(
    []
);
const clearProgress = (index: number) => {
  let item = {
    currentRate: 0,
    rate: 0,
    view: true,
  };
  progress.splice(index, 1, item);
};
const reUploadPhoto = (index: number) => {
  let photoContent = photoContents.value[index];
  if (!photoContent) {
    return;
  }
  let file: File | null = photoContent.file;
  if (file === null) {
    return;
  }
  uploadPhoto(index, file)
      .then((photoContent: PhotoContent) => {
        photoContents.value.splice(index, 1, photoContent);
      })
      .catch((err: Error) => {
        //异常处理逻辑
        photoContent.status = "上传成功";
        console.error(err);
      });
};
const clearPhoto = (currentIndex: number) => {
  photoContents.value.splice(currentIndex, 1);
  progress.splice(currentIndex, 1);
  photoIdsRef.value.splice(currentIndex, 1);
};
const imagesRef = computed<string[]>(() => {
  return photoContents.value.map((value) => {
    return value.imageUrl;
  });
});
const imagePreview = (startPosition: number) => {
  let photoContent = photoContents.value[startPosition];
  if (photoContent && photoContent.imageUrl !== "") {
    showImagePreview({
      images: imagesRef.value,
      startPosition: startPosition,
      closeable: true,
      onChange: (index: number) => {
        imagePreview(index);
      },
    });
    return;
  } else {
    let photoId = photoIdsRef.value[startPosition];
    if (photoId)
      return photoService
          .photoIdToResources(photoId)
          .then((data: PhotoContent) => {
            photoContents.value.splice(startPosition, 1, data);
            showImagePreview({
              images: imagesRef.value,
              startPosition: startPosition,
              closeable: true,
              onChange: (index: number) => {
                imagePreview(index);
              },
            });
          })
          .catch((err: Error) => {
            console.error(err);
            showNotify({message: "完整图片加载失败，网络连接失败。"});
          });
  }
};
const onloadImg = (index: number) => {
  let progre = progress[index];
  if (progre) {
    let item = {
      ...progre,
    };
    item.view = false;
    progress.splice(index, 1, item);
  }
};
const texts = computed<string[]>(() => {
  return progress.map((value) => {
    return value.currentRate.toFixed(0) + "%";
  });
});
const fileInput = ref<HTMLInputElement>();
const onClickPhotograph = () => {
  let element = fileInput.value as HTMLInputElement;
  element.click();
};
</script>
<template>
  <van-row>
    <van-col
        v-for="(photoContent, index) in photoContents"
        :key="index"
        :disabled="disOperate"
        :style="widthAndHeight"
        style="margin: 0 8px 8px 0"
        v-bind:style="{ 'pointer-events': disOperate ? 'none' : 'all' }"
    >
      <template v-if="photoContent.status === '没上传'">
        <van-row
            :style="widthAndHeight"
            align="center"
            justify="center"
            style="background-color: #eff2f5; cursor: pointer; position: absolute"
            @click="onClickPhotograph"
        >
        </van-row>
        <van-row
            v-if="progress[index]&&progress[index].rate !== 0 && progress[index].view"
            :style="widthAndHeight"
            align="center"
            justify="center"
            style="position: absolute"
        >
          <van-circle
              v-model:current-rate="progress[index].currentRate"
              :rate="progress[index].rate"
              :speed="1000"
              :text="texts[index]"
              @click="clearProgress(index)"
          />
        </van-row>
      </template>
      <template v-else-if="photoContent.status === '上传失败'">
        <van-row
            :style="widthAndHeight"
            align="center"
            justify="center"
            style="position: absolute"
        >
          <img
              :alt="photoContent.file?.name"
              :height="prop.height"
              :src="imageUrls[index]"
              :width="prop.width"
              style="object-fit: cover"
              @click="imagePreview(index)"
              @load="onloadImg(index)"
          />
        </van-row>
        <van-row
            :style="widthAndHeight"
            align="center"
            justify="center"
            style="cursor: pointer; position: absolute"
        >
          <van-icon
              name="replay"
              style="color: #eff2f5; background-color: #1c1c1e"
              @click="reUploadPhoto(index)"
          />
        </van-row>
        <van-row align="top" justify="end">
          <van-icon
              name="cross"
              style="cursor: pointer; color: #eff2f5; background-color: #1c1c1e"
              @click="clearPhoto(index)"
          />
        </van-row>
      </template>

      <template v-else-if="photoContent.status === '上传成功'">
        <van-row
            :style="widthAndHeight"
            align="center"
            justify="center"
            style="position: absolute"
        >
          <img
              :alt="photoContent.file?.name"
              :height="prop.height"
              :src="imageUrls[index]"
              :width="prop.width"
              style="object-fit: cover"
              @click="imagePreview(index)"
              @load="onloadImg(index)"
          />
        </van-row>
        <van-row align="top" justify="end">
          <van-icon
              name="cross"
              style="cursor: pointer; color: #eff2f5; background-color: #1c1c1e"
              @click="clearPhoto(index)"
          />
        </van-row>
      </template>
      <template v-else-if="photoContent.status === '下载失败'">
        <van-row
            :style="widthAndHeight"
            align="center"
            justify="center"
            style="position: absolute"
        >
          <img
              :height="prop.height"
              :src="imageUrls[index]"
              :width="prop.width"
              alt="照片丢失"
              style="object-fit: cover"
              @click="imagePreview(index)"
              @load="onloadImg(index)"
          />
        </van-row>
        <van-row align="top" justify="end">
          <van-icon
              name="cross"
              style="cursor: pointer; color: #eff2f5; background-color: #1c1c1e"
              @click="clearPhoto(index)"
          />
        </van-row>
      </template>
      <template v-else-if="photoContent.status === '下载成功'">
        <van-row
            :style="widthAndHeight"
            align="center"
            justify="center"
            style="position: absolute"
        >
          <img
              :alt="photoContent.file?.name"
              :height="prop.height"
              :src="imageUrls[index]"
              :width="prop.width"
              style="object-fit: cover"
              @click="imagePreview(index)"
              @load="onloadImg(index)"
          />
        </van-row>
        <van-row align="top" justify="end">
          <van-icon
              name="cross"
              style="cursor: pointer; color: #eff2f5; background-color: #1c1c1e"
              @click="clearPhoto(index)"
          />
        </van-row>
      </template>
    </van-col>
    <van-col :style="widthAndHeight" style="margin: 0 8px 8px 0">
      <van-row :style="widthAndHeight" style="position: absolute">
        <input
            v-show="false"
            ref="fileInput"
            :multiple="prop.max > 1"
            placeholder="请上传图片"
            type="file"
            @change="onUploadPhoto"
        />
      </van-row>
      <van-row
          v-if="photoContents.length < prop.max"
          :style="widthAndHeight"
          align="center"
          justify="center"
          style="background-color: #eff2f5; cursor: pointer; position: absolute"
          title="多一个上传框"
          @click="onClickPhotograph"
      >
        <van-col :span="24">
          <i
              class="van-badge__wrapper van-icon van-icon-photograph van-uploader__upload-icon"
          ></i>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<style scoped></style>