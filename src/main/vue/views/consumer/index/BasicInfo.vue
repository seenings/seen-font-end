<template>
  <h3>录入基本信息</h3>
  <seen-blank-row :height="30"></seen-blank-row>
  <van-row title="性别">
    <van-col :span="8" style="opacity: 0">空白列</van-col>
    <van-col :span="4">
      <van-button v-if="isMale" round type="primary" @click="changeMale"
      >男生
      </van-button
      >
      <van-button v-else plain round type="primary" @click="changeMale"
      >男生
      </van-button
      >
    </van-col>
    <van-col :span="4">
      <van-button v-if="isMale" plain round type="primary" @click="changeMale"
      >女生
      </van-button
      >
      <van-button v-else round type="primary" @click="changeMale"
      >女生
      </van-button
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
      >{{ Education.key(educationEntry[0]) }}
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
      >已毕业
      </van-button
      >
    </van-col>
    <van-col :span="6">
      <van-button
          :plain="isGraduated"
          round
          type="primary"
          @click="changeGraduated"
      >上学中
      </van-button
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
import type {PickerOption} from "vant";
import type {Numeric} from "vant/lib/utils";
import {ref} from "vue";
import {useRoute} from "vue-router";

import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import {API_BASIC_INFO} from "../../../../ts/http/basic-info-service-api.ts";
import {Education, type EducationValue} from "../../../../ts/model/consumer/school/Education.ts";
import type {BasicInfo} from "../../../../ts/model/consumer/user-info/BasicInfo.ts";
import {Sex} from "../../../../ts/model/consumer/user-info/Sex.ts";
import type {R} from "../../../../ts/model/sys/api-result.ts";
import {PathEnum, SeenRouterUtils, router} from "../../../../ts/router";
import {SchoolUtils} from "../../../../ts/util/consumer/school/school-util.ts";
import seenAxios from "../../../../ts/http/seen-axios.ts";

const currentYear = ref<number>(new Date().getFullYear());
const isMale = ref(true);
const education = ref(Education["学士"]);
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
const changeEducation = (item: EducationValue) => {
  education.value = item;
};
const onEducationClick = (item: EducationValue) => {
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
  return seenAxios<R<string>>(config).then((res) => {
    return res.data;
  }).then((data) => {
    if (data.code === 1) {
      //进入首页
      return SeenRouterUtils.toPage(router, PathEnum.MainSwipe, {
        userId: userId.value,
      });
    }
  });
};
</script>

<style scoped></style>
