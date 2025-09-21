<template>
  <van-row>
    <van-col span="24">
      <van-nav-bar
          left-arrow
          left-text="返回"
          title="说说"
          @click-left="onClickLeft"
      />
    </van-col>
  </van-row>
  <van-row>
    <van-col span="24">
      <van-field
          v-model="message"
          autosize
          maxlength="80"
          placeholder="请输入说说"
          rows="3"
          show-word-limit
          type="textarea"
      />
    </van-col>
  </van-row>
  <van-row>
    <van-col span="24">
      <van-uploader
          v-model="imageFiles"
          :after-read="afterRead"
          :max-count="9"
          multiple
      />
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8"></van-col>
    <van-col span="8">
      <van-button type="primary" @click="publish">发布</van-button>
    </van-col>
    <van-col span="8"></van-col>
  </van-row>
</template>

<script lang="ts" setup>
import type {UploaderFileListItem} from "vant";
import {showNotify} from "vant";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {AJAX} from "../../../../ts/config";
import {API_PHOTO} from "../../../../ts/http/photo-service-api.ts";
import {API_ZONE} from "../../../../ts/http/zone-service-api.ts";
import seenAxios from "../../../../ts/http/seen-axios.ts";
import type {R} from "../../../../ts/model/sys/api-result.ts";

const router = useRouter();
const message = ref<string>("");
const imageFiles = ref([]);
const imageFileIds: number[] = [];
const afterRead = (items: UploaderFileListItem | UploaderFileListItem[]) => {
  let files: UploaderFileListItem[] = Array.isArray(items) ? items : [items];

  let file: UploaderFileListItem | undefined = files[0]
  if (!file) {
    return;
  }
  file.status = "uploading";
  file.message = "上传中...";
  const form = {
    content: file.content,
    name: file.file?.name,
  };

  const config = {
    ...API_PHOTO.uploadPhoto,
    data: form,
  };
  seenAxios<R<number>>(config).then((res) => {
    if (res.data.code) {
      imageFileIds.push(res.data.data);
      file.status = "done";
      file.message = "上传完成";
    } else {
      file.status = "failed";
      file.message = "上传失败";
      showNotify({message: res.data.msg, type: "danger"});
    }
  });
};
const publish = () => {
  const data = [];
  if (message.value) {
    data.push({
      contentType: "TEXT",
      text: message.value,
    });
  }
  if (imageFileIds.length > 0) {
    for (let i = 0; i < imageFileIds.length; i++) {
      data.push({
        contentType: "IMAGE",
        contentId: imageFileIds[i],
      });
    }
  }
  const config = {
    ...API_ZONE.publish,
    data: data,
  };
  AJAX.request<number>(config).then((res) => {
    if (res.code) {
      showNotify({message: res.msg, type: "success"});
    } else {
      showNotify({message: res.msg, type: "danger"});
    }
  });
};

const onClickLeft = () => {
  router.go(-1);
};
</script>

<style scoped></style>
