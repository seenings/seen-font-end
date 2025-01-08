<template>
  <seen-blank-row :height="30" title="顶部留白" />
  <van-row :title="title">
    <van-col span="1" style="opacity: 0">空白列</van-col>
    <van-col span="22">
      <van-row>
        <van-col span="1" @click="onClickBack()">
          <van-icon name="arrow-left" />
        </van-col>
        <van-col span="22">{{ title }}</van-col>
        <van-col span="1" style="opacity: 0">空白列</van-col>
      </van-row>
    </van-col>
    <van-col span="1" style="opacity: 0">空白列</van-col>
  </van-row>
  <van-row ref="editBasicInformationRef">
    <van-col span="1" style="opacity: 0">空白列</van-col>
    <van-col span="22">
      <van-row title="基本信息">
        <van-col :span="1">
          <van-icon name="label-o" />
        </van-col>
        <van-col :span="12" class="seen-left" style="font-weight: bolder"
          >基本信息
        </van-col>
        <van-col :span="11" style="opacity: 0">空白列</van-col>
      </van-row>
      <seen-blank-row />
      <van-row title="基本信息-">
        <van-col :span="1" style="opacity: 0">空白列</van-col>
        <van-col span="22">
          <van-row title="呢称" @click="onClickAliasNameEdit()">
            <van-col :span="10" class="seen-left">昵称</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{ basicInformation.aliasName }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="出生日期" @click="onClickBirthDateEdit()">
            <van-col :span="10" class="seen-left">出生日期</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{
                    !basicInformation.birthDate
                      ? ""
                      : DateUtil.dateToChinenseDate(basicInformation.birthDate)
                  }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="性别" @click="onClickSexEdit()">
            <van-col :span="10" class="seen-left">性别</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{ basicInformation.sex === 1 ? "男" : "女" }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="身高" @click="onClickStatureEdit()">
            <van-col :span="10" class="seen-left">身高</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col v-if="basicInformation.stature" :span="23">
                  {{ basicInformation.stature + "cm" }}
                </van-col>
                <van-col v-else :span="23"></van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="体重" @click="onClickWeightEdit()">
            <van-col :span="10" class="seen-left">体重</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col v-if="basicInformation.weight" :span="23">
                  {{ basicInformation.weight + "kg" }}
                </van-col>
                <van-col v-else :span="23"></van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="现居住地" @click="onClickCurrentResidenceEdit()">
            <van-col :span="10" class="seen-left">现居住地</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{
                    CitiesUtils.valuesToText(
                      cascaderColumns.cities,
                      basicInformation.currentResidence
                    )
                  }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="出生地" @click="onClickBirthPlaceEdit()">
            <van-col :span="10" class="seen-left">出生地</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{
                    CitiesUtils.valuesToText(
                      cascaderColumns.cities,
                      basicInformation.birthPlace
                    )
                  }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="婚姻状况" @click="onClickMaritalStatusEdit()">
            <van-col :span="10" class="seen-left">婚姻状况</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{ UserUtils.idToName(basicInformation.maritalStatus) }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
        </van-col>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
      </van-row>
      <van-row title="教育与工作">
        <van-col :span="1">
          <van-icon name="label-o" />
        </van-col>
        <van-col :span="12" class="seen-left" style="font-weight: bolder"
          >教育与工作
        </van-col>
        <van-col :span="11" style="opacity: 0">空白列</van-col>
      </van-row>
      <seen-blank-row />
      <van-row title="教育与工作-">
        <van-col :span="1" style="opacity: 0">空白列</van-col>
        <van-col span="22">
          <van-row title="最高学历" @click="onClickHighestEducationEdit()">
            <van-col :span="10" class="seen-left">最高学历</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{ SchoolUtils.idToName(educationAndWork.highestEducation) }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="毕业院校" @click="onClickHighestSchoolIdEdit()">
            <van-col :span="10" class="seen-left">毕业院校</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{
                    CitiesUtils.valuesToText(
                      cascaderColumns.schools,
                      educationAndWork.highestSchoolIds
                    )
                  }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="职位" @click="onClickWorkPositionEdit()">
            <van-col :span="10" class="seen-left">职位</van-col>
            <van-col :span="14" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{
                    RecordUtils.valueToText(
                      columns.workPosition,
                      educationAndWork.workPositionId
                    )
                  }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="公司" @click="onClickWorkCompanyEdit()">
            <van-col :span="12" class="seen-left">公司</van-col>
            <van-col :span="12" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{ educationAndWork.workCompany }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
          <van-row title="年收入" @click="onClickAnnualIncomeIndexEdit()">
            <van-col :span="12" class="seen-left">年收入</van-col>
            <van-col :span="12" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{
                    RecordUtils.valueToText(
                      columns.yearIncome,
                      educationAndWork.annualIncomeIndex
                    )
                  }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
        </van-col>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
      </van-row>
      <van-row title="联系信息">
        <van-col :span="1">
          <van-icon name="label-o" />
        </van-col>
        <van-col :span="12" class="seen-left" style="font-weight: bolder"
          >联系信息
        </van-col>
        <van-col :span="11" style="opacity: 0">空白列</van-col>
      </van-row>
      <seen-blank-row />
      <van-row title="联系信息-">
        <van-col :span="1" style="opacity: 0">空白列</van-col>
        <van-col span="22">
          <van-row title="手机号" @click="onClickPhoneNumberEdit()">
            <van-col :span="12" class="seen-left">手机号</van-col>
            <van-col :span="12" class="seen-right">
              <van-row>
                <van-col :span="23">
                  {{ contactInformation.photoNumber }}
                </van-col>
                <van-col :span="1">
                  <van-icon name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row />
        </van-col>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
      </van-row>
    </van-col>
    <van-col span="1" style="opacity: 0">空白列</van-col>
  </van-row>
  <seen-blank-row title="底部留白" />
  <van-sticky
    :container="editBasicInformationRef"
    position="bottom"
    title="保存按钮"
  >
    <van-row>
      <van-col :span="4" style="opacity: 0">空白列</van-col>
      <van-col :span="16">
        <van-button round type="primary" @click="onClickSave">保存</van-button>
      </van-col>
      <van-col :span="4" style="opacity: 0">空白列</van-col>
    </van-row>
  </van-sticky>
  <!--弹出框-->
  <van-popup
    v-model:show="showPicker.aliasName"
    closeable
    position="bottom"
    round
    title="别名"
    @close="showPicker.aliasName = false"
  >
    <seen-blank-row :height="40" />
    <van-row>
      <van-col span="2" style="opacity: 0">空白列</van-col>
      <van-col span="20">
        呢称
        <van-field
          v-model="editBasicInformation.aliasName"
          maxlength="20"
          placeholder="请输入别名"
          show-word-limit
        ></van-field>
      </van-col>
      <van-col span="2" style="opacity: 0">空白列</van-col>
    </van-row>
    <seen-blank-row :height="40" />
    <van-row>
      <van-col :span="24">
        <van-button round type="primary" @click="onClickAliasNameOk"
          >确定
        </van-button>
      </van-col>
    </van-row>
    <seen-blank-row />
  </van-popup>
  <van-popup
    v-model:show="showPicker.birthDate"
    position="bottom"
    round
    title="出生年月日"
  >
    <van-date-picker
      v-model="editBasicInformation.birthDate"
      :min-date="minDate"
      title="选择年月日"
      type="date"
      @cancel="showPicker.birthDate = false"
      @confirm="onClickBirthDateOk"
    />
  </van-popup>
  <van-popup v-model:show="showPicker.sex" position="bottom" round title="性别">
    <van-picker
      v-model="editBasicInformation.sex"
      :columns="columns.sex"
      @cancel="showPicker.sex = false"
      @confirm="onClickSexOk"
    />
  </van-popup>
  <van-popup
    v-model:show="showPicker.stature"
    closeable
    position="bottom"
    round
    title="身高"
    @close="showPicker.stature = false"
  >
    <seen-blank-row />
    <van-row>
      <van-col span="24">身高</van-col>
    </van-row>
    <seen-blank-row :height="40" />
    <van-row>
      <van-col span="2" style="opacity: 0">空白列</van-col>
      <van-col span="20">
        <van-stepper
          v-model="editBasicInformation.stature"
          :button-size="width / 8"
          :default-value="editBasicInformation.sex[0] === 1 ? 170 : 160"
          :input-width="width / 4"
          integer
          max="260"
          min="40"
        />
        厘米
      </van-col>
      <van-col span="2" style="opacity: 0">空白列</van-col>
    </van-row>
    <seen-blank-row :height="40" />
    <van-row title="保存按钮">
      <van-col :span="24">
        <van-button round type="primary" @click="onClickStatureOk"
          >保存
        </van-button>
      </van-col>
    </van-row>
    <seen-blank-row />
  </van-popup>
  <van-popup
    v-model:show="showPicker.weight"
    closeable
    position="bottom"
    round
    title="体重"
    @close="showPicker.weight = false"
  >
    <seen-blank-row />
    <van-row>
      <van-col span="24">体重</van-col>
    </van-row>
    <seen-blank-row :height="40" />
    <van-row>
      <van-col span="2" style="opacity: 0">空白列</van-col>
      <van-col span="20">
        <van-stepper
          v-model="editBasicInformation.weight"
          :button-size="width / 8"
          :default-value="editBasicInformation.sex[0] === 1 ? 69 : 59"
          :input-width="width / 4"
          integer
          max="150"
          min="5"
        />
        公斤
      </van-col>
      <van-col span="2" style="opacity: 0">空白列</van-col>
    </van-row>
    <seen-blank-row :height="40" />
    <van-row title="保存按钮">
      <van-col :span="24">
        <van-button round type="primary" @click="onClickWeightOk"
          >保存
        </van-button>
      </van-col>
    </van-row>
    <seen-blank-row />
  </van-popup>
  <van-popup
    v-model:show="showPicker.maritalStatus"
    position="bottom"
    round
    title="婚姻状况"
  >
    <van-picker
      v-model="editBasicInformation.maritalStatus"
      :columns="columns.maritalStatus"
      @cancel="showPicker.maritalStatus = false"
      @confirm="onClickMaritalStatusOk"
    />
  </van-popup>
  <van-popup
    v-model:show="showPicker.currentResidence"
    position="bottom"
    round
    title="现居住地"
  >
    <van-picker
      v-model="editBasicInformation.currentResidence"
      :columns="cascaderColumns.cities"
      :columns-field-names="{
        text: 't',
        value: 'v',
        children: 'c',
      }"
      title="现居住地"
      @cancel="showPicker.currentResidence = false"
      @confirm="onClickCurrentResidenceOk"
    />
  </van-popup>
  <van-popup
    v-model:show="showPicker.birthPlace"
    position="bottom"
    round
    title="出生地"
  >
    <van-picker
      v-model="editBasicInformation.birthPlace"
      :columns="cascaderColumns.cities"
      :columns-field-names="{
        text: 't',
        value: 'v',
        children: 'c',
      }"
      title="出生地"
      @cancel="showPicker.birthPlace = false"
      @confirm="onClickBirthPlaceOk"
    />
  </van-popup>
  <van-popup
    v-model:show="showPicker.highestEducation"
    position="bottom"
    round
    title="学历"
  >
    <van-picker
      v-model="editEducationAndWork.highestEducation"
      :columns="columns.education"
      @cancel="showPicker.highestEducation = false"
      @confirm="onClickHighestEducationOk"
    />
  </van-popup>
  <van-popup
    v-model:show="showPicker.highestSchoolId"
    position="bottom"
    round
    title="毕业院校"
  >
    <van-picker
      v-model="editEducationAndWork.highestSchoolIds"
      :columns="cascaderColumns.schools"
      :columns-field-names="{
        text: 't',
        value: 'v',
        children: 'c',
      }"
      title="毕业院校"
      @cancel="showPicker.highestSchoolId = false"
      @confirm="onClickHighestSchoolIdOk"
    />
  </van-popup>
  <van-popup
    v-model:show="showPicker.workPosition"
    position="bottom"
    round
    title="职位"
  >
    <van-picker
      v-model="editEducationAndWork.workPositionId"
      :columns="columns.workPosition"
      @cancel="showPicker.workPosition = false"
      @confirm="onClickWorkPositionOk"
    />
  </van-popup>
  <van-popup
    v-model:show="showPicker.annualIncomeIndex"
    position="bottom"
    round
    title="年收入"
  >
    <van-picker
      v-model="editEducationAndWork.annualIncomeIndex"
      :columns="columns.yearIncome"
      @cancel="showPicker.annualIncomeIndex = false"
      @confirm="onClickAnnualIncomeIndexOk"
    />
  </van-popup>
  <van-popup
    v-model:show="showPicker.workCompany"
    closeable
    position="bottom"
    round
    title="公司"
    @close="showPicker.workCompany = false"
  >
    <seen-blank-row :height="40" />
    <van-row>
      <van-col span="2" style="opacity: 0">空白列</van-col>
      <van-col span="20">
        公司
        <van-field
          v-model="editEducationAndWork.workCompany"
          maxlength="40"
          placeholder="请输入公司名"
          show-word-limit
        ></van-field>
      </van-col>
      <van-col span="2" style="opacity: 0">空白列</van-col>
    </van-row>
    <seen-blank-row :height="40" />
    <van-row>
      <van-col :span="24">
        <van-button round type="primary" @click="onClickWorkCompanyOk"
          >确定
        </van-button>
      </van-col>
    </van-row>
    <seen-blank-row />
  </van-popup>
</template>

<script lang="ts" setup>
import { useWindowSize } from "@vant/use";
import { showToast } from "vant";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";
import { AJAX } from "../../../config";
import { API_BASIC_INFO } from "../../../http/basic-info-service-api";
import { API_DICT } from "../../../http/dict-service-api";
import { API_PUBLIC } from "../../../http/public-service-api";
import { Education } from "../../../model/consumer/school/Education";
import {
    MaritalStatus,
    UserUtils,
} from "../../../model/consumer/user-info/Sex";
import { StatusCode } from "../../../model/sys/api-result";
import { CascaderString } from "../../../model/sys/option";
import { CitiesUtils } from "../../../util/cities-util";
import { SchoolUtils } from "../../../util/consumer/school/school-util";
import { DateUtil } from "../../../util/date-util";
import { MapUtils } from "../../../util/map-util";
import { RecordUtils } from "../../../util/record-util";

const title = "编辑基础资料";
document.title = title;
const router = useRouter();

const { width } = useWindowSize();
const editBasicInformationRef = ref<Element>();
const onClickSave = () => {
  save();
};
const basicInformation = ref<BasicInformation>({
  aliasName: "无昵称",
  birthDate: new Date("1999-01-01"),
  sex: 1,
  stature: 0,
  weight: 0,
  maritalStatus: MaritalStatus["未婚"].valueOf(),
  currentResidence: ["1", "1"],
  birthPlace: ["1", "1"],
});
const editBasicInformation = ref<EditBasicInformation>({
  aliasName: "无昵称",
  birthDate: ["1999", "1", "1"],
  sex: [],
  stature: 0,
  weight: 0,
  maritalStatus: [MaritalStatus["未婚"].valueOf()],
  currentResidence: [],
  birthPlace: [],
});

interface EditBasicInformation {
  aliasName: string;
  birthDate: string[];
  sex: number[];
  stature: number;
  weight: number;
  /**
   * 现居地
   */
  currentResidence: string[];
  /**
   * 出生地
   */
  birthPlace: string[];
  /**
   * 婚姻状况
   */
  maritalStatus: number[];
}

const minDate = new Date("1960-01-01");

interface BasicInformation {
  aliasName: string;
  birthDate: Date;
  sex: number;
  stature: number;
  weight: number;
  /**
   * 现居地
   */
  currentResidence: string[];
  /**
   * 出生地
   */
  birthPlace: string[];
  /**
   * 婚姻状况
   */
  maritalStatus: number;
}

const educationAndWork = ref<EducationAndWork>({
  highestEducation: Education["学士"].valueOf(),
  highestSchoolIds: ["1", "1"],
  workPositionId: 1,
  workCompany: "xxx有限责任公司",
  annualIncomeIndex: "4",
});
const editEducationAndWork = ref<EditEducationAndWork>({
  highestEducation: [],
  highestSchoolIds: ["1", "1"],
  workPositionId: [1],
  workCompany: "xxx有限责任公司",
  annualIncomeIndex: [],
});
const contactInformation = ref<ContactInformation>({
  wechatNumber: "",
  photoNumber: "188****8888",
});

interface ContactInformation {
  wechatNumber: string;
  photoNumber: string;
}

interface EducationAndWork {
  highestEducation: number;
  highestSchoolIds: string[];
  workPositionId: number;
  workCompany: string;
  annualIncomeIndex: string;
}

interface EditEducationAndWork {
  highestEducation: number[];
  highestSchoolIds: string[];
  workPositionId: number[];
  workCompany: string;
  annualIncomeIndex: string[];
}

const showPicker = reactive({
  birthDate: false,
  aliasName: false,
  sex: false,
  stature: false,
  weight: false,
  maritalStatus: false,
  highestEducation: false,
  highestSchoolId: false,
  workPosition: false,
  workCompany: false,
  annualIncomeIndex: false,
  currentResidence: false,
  birthPlace: false,
});
const onClickBirthDateEdit = () => {
  showPicker.birthDate = true;
  if (basicInformation.value.birthDate) {
    const date = new Date(basicInformation.value.birthDate);
    editBasicInformation.value.birthDate[0] = date.getFullYear() + "";
    editBasicInformation.value.birthDate[1] = DateUtil.getMonth(date) + "";
    editBasicInformation.value.birthDate[2] = date.getDate() + "";
  }
};
const onClickBirthDateOk = () => {
  showPicker.birthDate = false;
  basicInformation.value.birthDate = new Date(
    editBasicInformation.value.birthDate[0] +
      "-" +
      editBasicInformation.value.birthDate[1] +
      "-" +
      editBasicInformation.value.birthDate[2]
  );
};
const onClickAliasNameEdit = () => {
  showPicker.aliasName = true;
  editBasicInformation.value.aliasName = basicInformation.value.aliasName;
};
const onClickAliasNameOk = () => {
  showPicker.aliasName = false;
  basicInformation.value.aliasName = editBasicInformation.value.aliasName;
};
const onClickHighestEducationEdit = () => {
  showPicker.highestEducation = true;
  editEducationAndWork.value.highestEducation[0] = Number(
    educationAndWork.value.highestEducation
  );
};
const onClickHighestEducationOk = () => {
  showPicker.highestEducation = false;
  educationAndWork.value.highestEducation = Number(
    editEducationAndWork.value.highestEducation[0]
  );
};
const onClickHighestSchoolIdEdit = () => {
  showPicker.highestSchoolId = true;
  editEducationAndWork.value.highestSchoolIds = educationAndWork.value
    .highestSchoolIds
    ? educationAndWork.value.highestSchoolIds
    : [];
};
const onClickHighestSchoolIdOk = () => {
  showPicker.highestSchoolId = false;
  educationAndWork.value.highestSchoolIds =
    editEducationAndWork.value.highestSchoolIds;
};
//工作岗位
const onClickWorkPositionEdit = () => {
  showPicker.workPosition = true;
  editEducationAndWork.value.workPositionId[0] = Number(
    educationAndWork.value.workPositionId
  );
};
const onClickWorkPositionOk = () => {
  showPicker.workPosition = false;
  educationAndWork.value.workPositionId = Number(
    editEducationAndWork.value.workPositionId[0]
  );
};
//性别
const onClickSexEdit = () => {
  showPicker.sex = true;
  editBasicInformation.value.sex[0] = basicInformation.value.sex;
};
const onClickSexOk = () => {
  showPicker.sex = false;
  basicInformation.value.sex = editBasicInformation.value.sex[0];
};
//身高
const onClickStatureEdit = () => {
  showPicker.stature = true;
  editBasicInformation.value.stature = basicInformation.value.stature;
};
const onClickStatureOk = () => {
  showPicker.stature = false;
  basicInformation.value.stature = editBasicInformation.value.stature;
};
//体重
const onClickWeightEdit = () => {
  showPicker.weight = true;
  editBasicInformation.value.weight = basicInformation.value.weight;
};
const onClickWeightOk = () => {
  showPicker.weight = false;
  basicInformation.value.weight = editBasicInformation.value.weight;
};
//现居地
const onClickCurrentResidenceEdit = () => {
  showPicker.currentResidence = true;
  editBasicInformation.value.currentResidence =
    basicInformation.value.currentResidence;
};
const onClickCurrentResidenceOk = () => {
  showPicker.currentResidence = false;
  basicInformation.value.currentResidence =
    editBasicInformation.value.currentResidence;
};
//出生地
const onClickBirthPlaceEdit = () => {
  showPicker.birthPlace = true;
  editBasicInformation.value.birthPlace = basicInformation.value.birthPlace;
};
const onClickBirthPlaceOk = () => {
  showPicker.birthPlace = false;
  basicInformation.value.birthPlace = editBasicInformation.value.birthPlace;
};
//婚姻状况
const onClickMaritalStatusEdit = () => {
  showPicker.maritalStatus = true;
  editBasicInformation.value.maritalStatus[0] =
    basicInformation.value.maritalStatus;
};
const onClickMaritalStatusOk = () => {
  showPicker.maritalStatus = false;
  basicInformation.value.maritalStatus =
    editBasicInformation.value.maritalStatus[0];
};
//公司
const onClickWorkCompanyEdit = () => {
  showPicker.workCompany = true;
  editEducationAndWork.value.workCompany = educationAndWork.value.workCompany;
};
const onClickWorkCompanyOk = () => {
  showPicker.workCompany = false;
  educationAndWork.value.workCompany = editEducationAndWork.value.workCompany;
};
//年收入
const onClickAnnualIncomeIndexEdit = () => {
  showPicker.annualIncomeIndex = true;
  editEducationAndWork.value.annualIncomeIndex[0] =
    educationAndWork.value.annualIncomeIndex + "";
};
const onClickAnnualIncomeIndexOk = () => {
  showPicker.annualIncomeIndex = false;
  educationAndWork.value.annualIncomeIndex =
    editEducationAndWork.value.annualIncomeIndex[0];
};
const onClickPhoneNumberEdit = () => {
  showToast({
    type: "text",
    message: "手机号认证过后不能修改",
  });
};

const columns = reactive<
  Record<string, { value: string | number; text: string | number }[]>
>({
  workPosition: [],
  yearIncome: [],
  maritalStatus: MapUtils.mapToPickerOption(UserUtils.toMaritalStatuss()),
  sex: [
    { value: 1, text: "男" },
    { value: 2, text: "女" },
  ],
  education: MapUtils.mapToPickerOption(SchoolUtils.toEducations()),
});
const cascaderColumns = reactive<Record<string, CascaderString[]>>({
  cities: [],
  schools: [],
});
const dictWorkPosition = () => {
  const config = {
    ...API_DICT.dictWorkPosition,
  };
  AJAX.request<Record<number, string>>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      columns.workPosition = RecordUtils.recordToPickerOption(res.data);
    }
  });
};
const dictYearIncome = () => {
  const config = {
    ...API_DICT.dictYearIncome,
  };
  AJAX.request<Record<number, string>>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      columns.yearIncome = RecordUtils.recordToPickerOption(res.data);
    }
  });
};
const toProvinceAndCity = () => {
  const config = {
    ...API_PUBLIC.toProvinceAndCity,
  };
  AJAX.request<CascaderString[]>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      cascaderColumns.cities = res.data;
    }
  });
};
const toProvinceAndSchool = () => {
  const config = {
    ...API_PUBLIC.toProvinceAndSchool,
  };
  AJAX.request<CascaderString[]>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      cascaderColumns.schools = res.data;
    }
  });
};
const selfUserIdToContactInformation = () => {
  const config = {
    ...API_BASIC_INFO.selfUserIdToContactInformation,
  };
  AJAX.request<ContactInformation>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      contactInformation.value = { ...res.data };
    }
  });
};
const selfUserIdToEducationAndWork = () => {
  const config = {
    ...API_BASIC_INFO.selfUserIdToEducationAndWork,
  };
  AJAX.request<EducationAndWork>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      educationAndWork.value = { ...res.data };
    }
  });
};
const selfUserIdToBasicInformation = () => {
  const config = {
    ...API_BASIC_INFO.selfUserIdToBasicInformation,
  };
  AJAX.request<BasicInformation>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      basicInformation.value = { ...res.data };
    }
  });
};
const save = () => {
  const config = {
    ...API_BASIC_INFO.saveBasicInformationAll,
    data: {
      basicInformation: basicInformation.value,
      educationAndWork: educationAndWork.value,
      contactInformation: contactInformation.value,
    },
  };
  AJAX.request<boolean>(config).then((res) => {
    if ((res.code as StatusCode) === StatusCode.SUCCESS) {
      showToast({
        type: "success",
        message: "修改基本信息成功",
      });
      goBack();
    }
  });
};
const onClickBack = () => {
  goBack();
};
const goBack = () => {
  router.back();
};
onMounted(() => {
  toProvinceAndCity();
  toProvinceAndSchool();
  dictWorkPosition();
  dictYearIncome();
  //先字典后取数
  selfUserIdToBasicInformation();
  selfUserIdToEducationAndWork();
  selfUserIdToContactInformation();
});
</script>

<style scoped></style>
../../../config../../../http/basic-info-service-api../../../http/dict-service-api../../../http/public-service-api../../../model/consumer/school/Education../../../model/consumer/user-info/Sex../../../model/sys/api-result../../../model/sys/option../../../util/cities-util../../../util/consumer/school/school-util../../../util/date-util../../../util/map-util../../../util/record-util
