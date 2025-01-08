<template>
  <seen-blank-row title="顶部空白" />
  <van-row :title="title">
    <van-col :span="2" @click="onClickBack()">
      <van-icon name="arrow-left" />
    </van-col>
    <van-col :span="20"> {{ title }}</van-col>
    <van-col :span="2" style="opacity: 0">空白列</van-col>
  </van-row>
  <seen-blank-row />
  <van-row title="正文">
    <van-col span="1" style="opacity: 0">空白列</van-col>
    <van-col span="22">
      <van-row title="已选标签栏">
        <van-col
          v-for="(tagId, key) in tagIds"
          :key="key"
          :span="tagIdToColSize(tagId)"
          class="seen-left"
        >
          <van-row>
            <van-col span="24">
              <van-tag closeable type="primary" @close="close(key)" size="large"
                >{{ tagIdToTagName[tagId] }}
              </van-tag>
            </van-col>
          </van-row>
          <seen-blank-row />
        </van-col>
      </van-row>
      <van-row title="已选和最多选个数">
        <van-col span="12" style="opacity: 0">空白列</van-col>
        <van-col span="6" style="opacity: 0">空白列</van-col>
        <van-col class="seen-info-color" span="6">
          {{ tagIds.length + "/20" }}
        </van-col>
      </van-row>
      <van-row title="待选标签栏">
        <van-col :span="24">
          <van-tabs v-model:active="tagActive">
            <van-tab
              v-for="(value, key) in parentIdToParentName"
              :key="key"
              :title="value"
            >
              <seen-blank-row />
              <van-row>
                <van-col
                  v-for="(tagId, tagIndex) in parentIdToTagId[key]"
                  :key="tagIndex"
                  :span="tagIdToColSize(tagId)"
                  class="seen-left"
                >
                  <van-row>
                    <van-col span="24">
                      <van-tag
                        v-if="tagIds.findIndex((n) => tagId === n) >= 0"
                        type="primary"
                        @click="onClickTagOk(tagId)"
                        size="large"
                      >
                        {{ tagIdToTagName[tagId] }}
                      </van-tag>
                      <van-tag v-else @click="onClickTagOk(tagId)">
                        {{ tagIdToTagName[tagId] }}
                      </van-tag>
                    </van-col>
                  </van-row>
                  <seen-blank-row />
                </van-col>
              </van-row>
            </van-tab>
          </van-tabs>
        </van-col>
      </van-row>
      <seen-blank-row :height="30" />
      <van-row title="保存按钮">
        <van-col span="24">
          <van-button round type="primary" @click="onClickSaveTagOk"
            >保存
          </van-button>
        </van-col>
      </van-row>
    </van-col>
    <van-col span="1" style="opacity: 0">空白列</van-col>
  </van-row>
</template>

<script lang="ts" setup>
import { showToast } from "vant";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import { AJAX } from "../../../config";
import { API_BASIC_INFO } from "../../../http/basic-info-service-api";
import { API_PUBLIC } from "../../../http/public-service-api";
import { StatusCode } from "../../../model/sys/api-result";

const router = useRouter();

const title = "编辑我的标签";
document.title = title;
const goBack = () => {
  router.go(-1);
};

const onClickBack = () => {
  goBack();
};
const tagActive = ref<number>(0);
const parentIdToParentName = ref<Record<number, string>>({});
const parentIdToTagId = ref<Record<number, number[]>>({});
const tagIdToTagName = ref<Record<number, string>>({});
const tagIds = ref<number[]>([]);
const close = (index: number) => {
  tagIds.value.splice(index, 1);
};
const onClickTagOk = (tagId: number) => {
  if (tagIds.value.findIndex((n) => n === tagId) < 0) {
    if (tagIds.value.length >= 20) {
      showToast({ type: "fail", message: "超过最大可设置的标签数目" });
    } else {
      tagIds.value.push(tagId);
    }
  }
};
const onClickSaveTagOk = () => {
  saveTag();
};
const saveTag = () => {
  const config = {
    ...API_BASIC_INFO.saveTag,
    data: tagIds.value,
  };
  AJAX.request<boolean>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      showToast({ type: "success", message: "保存标签成功" });
      goBack();
    }
  });
};

const toParentIdToParentName = () => {
  const config = {
    ...API_PUBLIC.toParentIdToParentName,
  };
  AJAX.request<Record<number, string>>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      parentIdToParentName.value = res.data;
    }
  });
};
const tagIdToColSize = (tagId: number): number => {
  const tagName = tagIdToTagName.value[tagId];
  return Math.max(5, (tagName ? tagName.length : 0) * 2);
};
const toParentIdToTagId = () => {
  const config = {
    ...API_PUBLIC.toParentIdToTagId,
  };
  AJAX.request<Record<number, number[]>>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      parentIdToTagId.value = res.data;
    }
  });
};
const toTagIdToTagName = () => {
  const config = {
    ...API_PUBLIC.toTagIdToTagName,
  };
  AJAX.request<Record<number, string>>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      tagIdToTagName.value = res.data;
    }
  });
};

const selfUserIdToTagId = () => {
  const config = {
    ...API_BASIC_INFO.selfUserIdToTagId,
  };
  AJAX.request<number[]>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      if (res.data != null) {
        tagIds.value = res.data;
      }
    }
  });
};

onMounted(() => {
  toParentIdToTagId();
  toParentIdToParentName();
  toTagIdToTagName();
  selfUserIdToTagId();
});
</script>

<style scoped></style>
../../../config../../../http/basic-info-service-api../../../http/public-service-api../../../model/sys/api-result
