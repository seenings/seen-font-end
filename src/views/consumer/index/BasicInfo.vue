<template>
  <h3>录入基本信息</h3>
  <seen-blank-row :height="30"></seen-blank-row>
  <van-row title="性别">
    <van-col :span="8" style="opacity: 0">空白列</van-col>
    <van-col :span="4">
      <van-button v-if="isMale" round type="primary" @click="changeMale"
        >男生</van-button
      >
      <van-button v-else plain round type="primary" @click="changeMale"
        >男生</van-button
      >
    </van-col>
    <van-col :span="4">
      <van-button v-if="isMale" plain round type="primary" @click="changeMale"
        >女生</van-button
      >
      <van-button v-else round type="primary" @click="changeMale"
        >女生</van-button
      >
    </van-col>
    <van-col :span="8" style="opacity: 0">空白列</van-col>
  </van-row>
  <seen-blank-row :height="30"></seen-blank-row>
  <van-row title="学历">
    <van-col :span="2" style="opacity: 0">空白列</van-col>
    <van-col
      v-for="(educationEntry, key) in educations"
      :key="key"
      :span="20 / educations.size"
    >
      <van-button
        :plain="education !== educationEntry[0]"
        round
        type="primary"
        @click="onEducationClick(educationEntry[0])"
        >{{ SchoolUtils.idToName(educationEntry[0]) }}
      </van-button>
    </van-col>
    <van-col :span="2" style="opacity: 0">空白列</van-col>
  </van-row>
  <seen-blank-row :height="30"></seen-blank-row>
  <van-row title="年龄">
    <van-col :span="2" style="opacity: 0">空白列</van-col>
    <van-col :span="20">
      <van-field
        v-model="birthYear"
        is-link
        label="出生年份"
        placeholder="选择年份"
        readonly
        @click="onBirthYearPickerClick"
      />
      <van-popup v-model:show="showPicker" position="bottom" round>
        <van-picker
          v-model="pickerBirthYear"
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </van-col>
    <van-col :span="2" style="opacity: 0">空白列</van-col>
  </van-row>
  <seen-blank-row :height="30"></seen-blank-row>
  <van-row title="是否毕业">
    <van-col :span="6" style="opacity: 0">空白列</van-col>
    <van-col :span="6">
      <van-button
        :plain="!isGraduated"
        round
        type="primary"
        @click="changeGraduated"
        >已毕业</van-button
      >
    </van-col>
    <van-col :span="6">
      <van-button
        :plain="isGraduated"
        round
        type="primary"
        @click="changeGraduated"
        >上学中</van-button
      >
    </van-col>
    <van-col :span="6" style="opacity: 0">空白列</van-col>
  </van-row>
  <seen-blank-row :height="40"></seen-blank-row>
  <van-row title="进入">
    <van-col :span="6" style="opacity: 0">空白列</van-col>
    <van-col :span="12">
      <van-button type="primary" @click="onEnterClick">进入</van-button>
    </van-col>
    <van-col :span="6"></van-col>
  </van-row>
</template>

<script lang="ts" setup>
import type { PickerOption } from "vant";
import type { Numeric } from "vant/lib/utils";
import { ref } from "vue";
import { useRoute } from "vue-router";

import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import { AJAX } from "../../../config";
import { API_BASIC_INFO } from "../../../http/basic-info-service-api";
import { Education } from "../../../model/consumer/school/Education";
import { BasicInfo } from "../../../model/consumer/user-info/BasicInfo";
import { Sex } from "../../../model/consumer/user-info/Sex";
import { R } from "../../../model/sys/api-result";
import { PathEnum, SeenRouterUtils, router } from "../../../router";
import { SchoolUtils } from "../../../util/consumer/school/school-util";

const currentYear = ref<number>(new Date().getFullYear());
const isMale = ref(true);
const education = ref(Education["学士"].valueOf());
const educations = SchoolUtils.toEducations();
const birthYear = ref<number>(currentYear.value - 24);
const showPicker = ref(false);
const columns = ref<PickerOption[]>([]);
const miniAge = 16;
for (let i = 0; i < 24; i++) {
  const year = currentYear.value - miniAge - i;
  const item: PickerOption = {
    text: year,
    value: year,
  };
  columns.value.push(item);
}
const onBirthYearPickerClick = () => {
  showPicker.value = true;
  pickerBirthYear.value[0] = birthYear.value;
};
const pickerBirthYear = ref<Numeric[]>([1996]);
const onConfirm = () => {
  showPicker.value = false;
  birthYear.value = pickerBirthYear.value[0] as number;
};
const changeMale = () => {
  isMale.value = !isMale.value;
};
const changeEducation = (item: Education) => {
  education.value = item;
};
const onEducationClick = (item: Education) => {
  changeEducation(item);
};
const isGraduated = ref(true);
const changeGraduated = () => {
  isGraduated.value = !isGraduated.value;
};
const route = useRoute();
const userId = ref(Number(route.query.userId));
const onEnterClick = () => {
  const data: BasicInfo = {
    userId: userId.value,
    sex: isMale.value ? Sex.MALE : Sex.FEMALE,
    education: education.value,
    birthYear: birthYear.value,
    graduated: isGraduated.value,
  };
  const config = {
    ...API_BASIC_INFO.saveBasicInfo,
    data: data,
  };
  AJAX.request<string>(config).then((res: R<string>) => {
    if (res.code === 1) {
      //进入首页
      SeenRouterUtils.toPage(router, PathEnum.MainSwipe, {
        userId: userId.value,
      });
    }
  });
};
</script>

<style scoped></style>
