<template>
  <van-row ref="personIntroduceMain">
    <van-col :span="24">
      <seen-blank-row :height="20" title="顶部空白"/>
      <van-row title="用户主页">
        <van-col :span="2" @click="onClickBack()">
          <van-icon name="arrow-left"/>
        </van-col>
        <van-col :span="20"> 用户主页</van-col>
        <van-col :span="2" style="opacity: 0">空白列</van-col>
      </van-row>
      <van-row title="头像">
        <van-col v-if="selfEdit" span="24">
          <van-row>
            <van-col span="18" style="opacity: 0">空白列</van-col>
            <van-col span="6" @click="onClickUploadPhoto">
              编辑
              <van-icon name="arrow"/>
            </van-col>
          </van-row>
        </van-col>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
        <van-col :span="22">
          <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item
                v-for="(image, index) in primayPhotoIds"
                :key="index"
                @click="imagePreviewByPrimary(index)"
            >
              <van-image
                  :alt="'写真' + index"
                  :height="(rate * 4 * 9) / 10"
                  :src="PhotoUtil.firstImageUrl(photoIdToPhotoContentMap[image])"
                  :width="(rate * 3 * 9) / 10"
                  fit="cover"
                  position="center"
              />
            </van-swipe-item>
          </van-swipe>
        </van-col>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
      </van-row>
      <seen-blank-row :height="20" title="头像下方空白"/>
      <van-row title="基础资料">
        <van-col :span="1" style="opacity: 0">空白列</van-col>
        <van-col :span="22">
          <van-row title="名字">
            <van-col
                :span="8"
                style="font-size: larger; font-weight: bold; text-align: left"
            >
              {{ userIntroduceInfo.aliasName }}
            </van-col>
            <van-col v-if="userIntroduceInfo.userAuthId === 1" :span="10">
              <van-icon class="seen-access-color" name="star"/>
              <label>{{ "已认证" }}</label>
            </van-col>
            <van-col v-if="userIntroduceInfo.userAuthId === 0" :span="10">
              <van-icon class="seen-danger-color" name="star"/>
              <label>{{ "未认证" }}</label>
            </van-col>
            <van-col span="6">
              <van-row v-if="selfEdit">
                <van-col :span="24" @click="onClickEditInfo()">
                  编辑
                  <van-icon name="arrow"/>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <seen-blank-row/>
          <van-row title="年龄，身高，体重">
            <van-col :span="2">
              <van-icon name="birthday-cake-o"/>
            </van-col>
            <van-col :span="8" style="text-align: left">
              {{
                userIntroduceInfo.birthYear +
                "年" +
                "·" +
                userIntroduceInfo.constellation
              }}
            </van-col>
            <van-col :span="2">
              <van-icon name="manager-o"/>
            </van-col>
            <van-col :span="12" style="text-align: left">
              {{
                userIntroduceInfo.statureCm +
                "CM" +
                "·" +
                userIntroduceInfo.weightKg +
                "KG"
              }}
            </van-col>
          </van-row>
          <van-row title="所在地">
            <van-col :span="2">
              <van-icon name="wap-home-o"/>
            </van-col>
            <van-col :span="22" style="text-align: left">
              {{
                "现居" +
                userIntroduceInfo.currentResidenceCityName +
                "·" +
                userIntroduceInfo.birthPlaceProvinceName +
                userIntroduceInfo.birthPlaceCityName +
                "人"
              }}
            </van-col>
          </van-row>
          <van-row title="学历">
            <van-col :span="2">
              <van-icon name="desktop-o"/>
            </van-col>
            <van-col :span="22" style="text-align: left">
              {{
                SchoolUtils.educationToName(userIntroduceInfo.educationId) +
                "·" +
                userIntroduceInfo.schoolName
              }}
            </van-col>
          </van-row>
          <van-row title="工作">
            <van-col :span="2">
              <van-icon name="manager-o"/>
            </van-col>
            <van-col :span="22" style="text-align: left">
              {{
                userIntroduceInfo.workPositionName +
                "·" +
                userIntroduceInfo.workCompanyName
              }}
            </van-col>
          </van-row>
        </van-col>
        <van-col :span="1" style="opacity: 0">空白列</van-col>
      </van-row>
      <seen-blank-row :height="20"/>
      <van-row v-if="authInfo !== null" title="身份认证">
        <van-col :span="6"><p style="font-weight: bolder">身份认证</p></van-col>
        <van-col :span="10" style="opacity: 0">空白列</van-col>
        <van-col
            v-if="authInfo.totalValue >= 60"
            :span="8"
            class="seen-access-color"
        >
          <p>{{ "证件可信度" + authInfo.totalValue + "%" }}</p>
        </van-col>
        <van-col v-else :span="8" class="seen-danger-color">
          <p>{{ "证件可信度" + authInfo.totalValue + "%" }}</p>
        </van-col>
      </van-row>
      <seen-blank-row/>
      <van-row>
        <van-col :span="24">
          <van-row :gutter="2" title="认证内容">
            <van-col :span="8">
              <van-row>
                <van-col :span="24">
                  <van-icon name="user-circle-o"/>
                </van-col>
              </van-row>
              <van-row>
                <van-col v-if="authInfo.identity" :span="24"
                >实名已认证
                </van-col>
                <van-col v-else :span="24" class="seen-danger-color"
                >实名未认证
                </van-col>
              </van-row>
            </van-col>
            <van-col :span="8">
              <van-row>
                <van-col :span="24">
                  <van-icon name="desktop-o"/>
                </van-col>
              </van-row>
              <van-row>
                <van-col v-if="authInfo.education" :span="24"
                >学历已认证
                </van-col>
                <van-col v-else :span="24" class="seen-danger-color"
                >学历未认证
                </van-col>
              </van-row>
            </van-col>
            <van-col :span="8">
              <van-row>
                <van-col :span="24">
                  <van-icon name="manager-o"/>
                </van-col>
              </van-row>
              <van-row>
                <van-col v-if="authInfo.work" :span="24">工作已认证</van-col>
                <van-col v-else :span="24" class="seen-danger-color"
                >工作未认证
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <seen-blank-row/>
      <van-row title="个人信息">
        <van-col :span="6">
          <p class="seen-font-bolder-weight">个人信息</p>
        </van-col>
        <van-col :span="18" style="opacity: 0">空白列</van-col>
      </van-row>
      <seen-blank-row :height="20" title="个人介绍前面空白"/>
      <van-row>
        <van-col
            v-for="(item, index) in personIntroduceData"
            :key="index"
            :span="24"
        >
          <van-row v-if="item.introduceContent || selfEdit" title="单个介绍">
            <van-col :span="1" style="opacity: 0">空白列</van-col>
            <van-col span="22">
              <van-row>
                <van-col :span="8" class="seen-left">
                  <van-tag :text-color="primaryColor" plain size="large">
                    {{ item.introduceTitle }}
                  </van-tag>
                </van-col>
                <van-col :span="12" style="opacity: 0">空白列</van-col>
                <van-col
                    v-if="selfEdit"
                    :span="4"
                    @click="onClickIntroduceEdit(item.introduceTypeId)"
                >
                  编辑
                  <van-icon name="arrow"/>
                </van-col>
                <van-col v-else span="4" style="opacity: 0">空白列</van-col>
              </van-row>
              <seen-blank-row/>
              <van-row>
                <van-col
                    v-if="!item.introduceContent"
                    :span="24"
                    class="seen-info-color"
                >
                  留下更多信息，让他人更好地了解自己。
                </van-col>
                <van-col
                    v-else
                    span="24"
                    style="white-space: pre-wrap; text-align: left"
                >
                  {{ item.introduceContent }}
                </van-col>
              </van-row>
              <seen-blank-row/>
              <van-row
                  v-for="(
                  photoIdValue, photoIndex
                ) in PhotoUtil.orderToPhotoIdToImageIds(item.orderToPhotoIdMap)"
                  :key="photoIndex"
                  title="内容写真"
                  @click="
                  imagePreview(
                    PhotoUtil.toImageUrls(
                      photoIdToPhotoContentMap,
                      item.orderToPhotoIdMap
                    ),
                    photoIndex
                  )
                "
              >
                <van-col :span="24">
                  <van-image
                      :alt="item.introduceTitle"
                      :src="
                      PhotoUtil.firstImageUrl(
                        photoIdToPhotoContentMap[photoIdValue]
                      )
                    "
                      :width="(wideRate * 9 * 8) / 10"
                      fit="cover"
                      position="center"
                  />
                </van-col>
              </van-row>
              <seen-blank-row/>
            </van-col>
            <van-col :span="1" style="opacity: 0">空白列</van-col>
          </van-row>
        </van-col>
      </van-row>
      <seen-blank-row :height="20" title="个人介绍下方空白"/>
      <van-row title="TA的标签">
        <van-col :span="6">
          <p class="seen-font-bolder-weight">TA的标签</p>
        </van-col>
        <van-col :span="12" style="opacity: 0">空白列</van-col>
        <van-col v-if="selfEdit" :span="6" @click="onClickEditTag()">
          编辑
          <van-icon name="arrow"/>
        </van-col>
        <van-col v-else :span="4" style="opacity: 0">空白列</van-col>
      </van-row>
      <seen-blank-row/>
      <van-row>
        <van-col :span="24">
          <van-row title="标签内容">
            <van-col :span="1" style="opacity: 0">空白列</van-col>
            <van-col v-if="tagNames" :span="22">
              <van-row>
                <van-col
                    v-for="(item, index) in tagNames"
                    :key="index"
                    :span="Math.max(5, item.length * 2)"
                    class="seen-left"
                >
                  <van-row>
                    <van-col span="24">
                      <van-tag
                          :color="primaryColor"
                          plain
                          round
                          size="large"
                          type="primary"
                      >
                        {{ item }}
                      </van-tag>
                    </van-col>
                  </van-row>
                  <seen-blank-row/>
                </van-col>
              </van-row>
            </van-col>
            <van-col v-else class="seen-info-color" span="22"
            >留下自己的标签，让他人更好地了解自己。
            </van-col>
            <van-col :span="1" style="opacity: 0">空白列</van-col>
          </van-row>
        </van-col>
      </van-row>
      <seen-blank-row title="底部空白"/>
    </van-col>
  </van-row>

  <van-sticky :container="personIntroduceMain" position="bottom">
    <van-row title="点赞">
      <van-col :span="20" style="opacity: 0">空白列</van-col>
      <van-col :span="4" @click="onClickThumb">
        <van-icon v-if="thumb" color="#ee0a24" name="star" size="40"/>
        <van-icon v-else name="star-o" size="40"/>
      </van-col>
    </van-row>
    <van-row title="关注">
      <van-col :span="20" style="opacity: 0">空白列</van-col>
      <van-col :span="4" @click="onClickFocus">
        <van-icon v-if="focus" color="#ee0a24" name="like" size="40"/>
        <van-icon v-else name="like-o" size="40"/>
      </van-col>
    </van-row>
    <van-row title="推给朋友和想认识TA">
      <van-col :span="2" style="opacity: 0">空白列</van-col>
      <van-col :span="10">
        <van-button
            class="seen-back-primary-color"
            icon="share-o"
            round
            @click="onClickShare()"
        >推给朋友
        </van-button>
      </van-col>
      <van-col :span="10">
        <van-button
            class="seen-back-primary-color seen-white-color"
            icon="eye-o"
            round
            @click="onClickAddFriend()"
        >
          想认识TA
        </van-button>
      </van-col>
      <van-col :span="2" style="opacity: 0">空白列</van-col>
    </van-row>
    <seen-blank-row :height="30"></seen-blank-row>
  </van-sticky>
  <van-action-sheet v-model:show="showCoinEnough" title="玫瑰花足够">
    <van-row>
      <van-col span="1" style="opacity: 0">空白列</van-col>
      <van-col span="22">
        <van-row title="名字">
          <van-col
              :span="8"
              style="font-size: larger; font-weight: bold; text-align: left"
          >
            {{ userIntroduceInfo.aliasName }}
          </van-col>
          <van-col v-if="userIntroduceInfo.userAuthId === 1" :span="16">
            <van-icon class="seen-access-color" name="star"/>
            <label>{{ "已认证" }}</label>
          </van-col>
          <van-col v-if="userIntroduceInfo.userAuthId === 0" :span="16">
            <van-icon class="seen-danger-color" name="star"/>
            <label>{{ "未认证" }}</label>
          </van-col>
        </van-row>
        <seen-blank-row/>
        <van-row>
          <van-col :span="6"></van-col>
          <van-col :span="12" style="text-align: center"
          >申请失败扣除一半玫瑰花
          </van-col>
          <van-col :span="6"></van-col>
        </van-row>
        <seen-blank-row/>
        <van-row title="申请按钮">
          <van-col :span="24">
            <van-button type="success" @click="onClickAdd"
            >{{ "申请成功扣减100朵玫瑰花" }}，{{ "立即申请" }}
            </van-button>
          </van-col>
        </van-row>
        <seen-blank-row/>
      </van-col>
      <van-col span="1" style="opacity: 0">空白列</van-col>
    </van-row>
  </van-action-sheet>
  <van-action-sheet v-model:show="showCoinNotEnough" title="玫瑰花不够">
    <van-row title="玫瑰花不足提示">
      <van-col :span="6" style="opacity: 0">空白列</van-col>
      <van-col :span="12">
        <van-button size="small" type="default"
        >玫瑰花不足，无法认识TA。
        </van-button>
      </van-col>
      <van-col :span="6" style="opacity: 0">空白列</van-col>
    </van-row>
    <seen-blank-row/>
    <van-row>
      <van-col :span="6" style="opacity: 0">空白列</van-col>
      <van-col :span="12">
        <van-button type="primary" @click="onClickBuy"
        >去购买玫瑰花
        </van-button>
      </van-col>
      <van-col :span="6" style="opacity: 0">空白列</van-col>
    </van-row>
    <seen-blank-row/>
    <van-row>
      <van-col :span="6" style="opacity: 0">空白列</van-col>
      <van-col :span="12">
        <van-button type="success" @click="onClickDoTask"
        >做任务获取玫瑰花
        </van-button>
      </van-col>
      <van-col :span="6" style="opacity: 0">空白列</van-col>
    </van-row>
    <seen-blank-row/>
  </van-action-sheet>
</template>

<script lang="ts" setup>
import {useWindowSize} from "@vant/use";
import {computed, onMounted, ref, watch} from "vue";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";

import {showImagePreview, showNotify, showToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {AJAX} from "../../../config";
import {API_BASIC_INFO} from "../../../http/basic-info-service-api";
import {API_COIN} from "../../../http/coin-service-api";
import {API_FRIEND} from "../../../http/friend-service-api";
import {API_INTERACT_USER} from "../../../http/interact-user-service-api";
import {API_LOGIN} from "../../../http/login-service-api";
import seenAxios from "../../../http/seen-axios";
import type{PhotoContent} from "../../../model/consumer/photo/file";
import {Education} from "../../../model/consumer/school/Education";
import type{UserIntroduceInfo} from "../../../model/consumer/user-info/BasicInfo";
import type{PersonIntroduce} from "../../../model/consumer/user-info/UserInfo";
import type{R} from "../../../model/sys/api-result";
import {StatusCode} from "../../../model/sys/api-result";
import {PathEnum, router, SeenRouterUtils} from "../../../router";
import photoService from "../../../service/cosumer/photo/photo-service";
import PhotoUtil from "../../../util/consumer/photo/photo-util";
import {SchoolUtils} from "../../../util/consumer/school/school-util";

const primaryColor = ref("#437de8");
const personIntroduceMain = ref<Element>();
const route = useRoute();
//对方的id
const pageUserId = Number(route.query.pageUserId);
if (pageUserId == null) {
  console.error("页面访问异常");
  showToast("页面访问异常");
}
const selfEdit = ref(false);
const checkSelf = () => {
  const config = {
    ...API_LOGIN.checkSelf,
    params: {
      pageUserId: pageUserId,
    },
  };
  seenAxios<R<boolean>>(config).then((res) => {
    if ((res.data.code ) === StatusCode.SUCCESS) {
      selfEdit.value = res.data.data;
    }
  });
};
const userRouter = useRouter();
const onClickIntroduceEdit = (introduceTypeId: number) => {
  SeenRouterUtils.toPage(userRouter, PathEnum.EditPersonIntroduce, {
    introduceTypeIndex: introduceTypeId,
  });
};
const primaryPhotoUrls = computed(() => {
  return PhotoUtil.toImageUrlsByPhotoId(
      photoIdToPhotoContentMap.value,
      primayPhotoIds.value
  );
});
const imagePreviewByPrimary = (startPosition: number) => {
  let photoId = primayPhotoIds.value[startPosition];
  if(photoId===undefined||photoIdToPhotoContentMap.value[photoId]===undefined){
    console.error("照片ID不存在");
    return;
  }
  if (photoIdToPhotoContentMap.value[photoId].imageUrl !== "") {
    showImagePreview({
      images: primaryPhotoUrls.value,
      startPosition: startPosition,
      closeable: true,
      onChange: (index: number) => {
        imagePreviewByPrimary(index);
      },
    });
    return;
  } else {
    let photoUrl = photoService.photoIdToPhotoUrl(photoId);
    photoIdToPhotoContentMap.value[photoId] = {
      file: null,
      compressImageUrl: photoUrl,
      imageUrl: photoUrl,
      status: '下载成功'
    }
    showImagePreview({
      images: primaryPhotoUrls.value,
      startPosition: startPosition,
      closeable: true,
      onChange: (index: number) => {
        imagePreviewByPrimary(index);
      },
    });
    return;
  }
};
const imagePreview = (images: string[], startPosition: number) => {
  showImagePreview({
    images: images,
    startPosition: startPosition,
    closeable: true,
  });
};
const {width, height} = useWindowSize();
const wideRate = ref(Math.min(width.value / 9, height.value / 16));
const rate = ref(Math.min(width.value / 3, height.value / 4));
const onClickBack = () => {
  router.go(-1);
};
const onClickShare = () => {
  //推荐给朋友 TODO
  showToast("未对接接口");
};
const showCoinEnough = ref<boolean>(false);
const showCoinNotEnough = ref<boolean>(false);
const onClickAddFriend = () => {
  //想认识TA，弹框
  onClickAddFriendBefore();
  checkEnough();
};
const checkEnough = () => {
  const config = {
    ...API_COIN.checkEnough,
  };
  AJAX.request<boolean>(config).then((res) => {
    if ((res.code ) === StatusCode.SUCCESS) {
      showCoinEnough.value = res.data;
      showCoinNotEnough.value = !res.data;
    }
  });
};
const onClickAdd = () => {
  applyFriend();
};
const applyFriend = () => {
  const config = {
    ...API_FRIEND.applyFriend,
    params: {
      appliedUserId: pageUserId,
    },
  };
  seenAxios<R<boolean>>(config).then((res) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      if (res.data.data) {
        showNotify({type: "success", message: "发送消息成功"});
      } else {
        showNotify({type: "warning", message: res.data.msg});
      }
      showCoinEnough.value = false;
    }
  });
};

const onClickAddFriendBefore = () => {
  //TODO
  //查看当前用户是否有头像照片
};
/**
 * 关注
 */
const onClickFocus = () => {
  focus.value = !focus.value;
  focusUser();
};
/**
 * 点赞
 */
const onClickThumb = () => {
  thumb.value = !thumb.value;
  thumbUser();
};
const tagNames = ref<string[]>([
  "外冷内热",
  "犬系",
  "直率",
  "开朗积极",
  "独立",
]);

interface AuthInfo {
  /**
   * 认证总体可信度
   */
  totalValue: number;
  /**
   * 身份是否认证
   */
  identity: boolean;
  /**
   * 学历是否认证
   */
  education: boolean;
  /**
   * 工作是否认证
   */
  work: boolean;
}

const onClickUploadPhoto = () => {
  SeenRouterUtils.toPage(userRouter, PathEnum.EditUserPhoto, {});
};
const authInfo = ref<AuthInfo>({
  education: false,
  totalValue: 30,
  identity: false,
  work: false,
});
const personIntroduceData = ref<PersonIntroduce[]>([]);
const photoIdToPhotoContentMap = ref<Record<number, PhotoContent>>({});
const primayPhotoIds = ref<number[]>([]);
watch(primayPhotoIds, (newVal) => {
  let photoIds = [
    ...new Set(
        newVal?.map((v) => {
          return v;
        })
    ),
  ];
  photoIds?.forEach((photoId) => {
    photoService.photoIdToResourcesByCompress(photoId).then((res) => {
      if (!photoIdToPhotoContentMap.value[photoId] ||
          photoIdToPhotoContentMap.value[photoId].imageUrl === "") {
        photoIdToPhotoContentMap.value[photoId] = {...res};
      }
    });
  });
  photoIds?.forEach((photoId) => {
    let photoUrl = photoService.photoIdToPhotoUrl(photoId);
    photoIdToPhotoContentMap.value[photoId] = {
      file: null,
      compressImageUrl: photoUrl,
      imageUrl: photoUrl,
      status: '下载成功'
    }
  });
});
const userIdToPrimaryPhotoId = () => {
  const config = {
    ...API_BASIC_INFO.userIdToPrimaryPhotoId,
    data: [pageUserId],
  };
  seenAxios<R<Record<number, number[]>>>(config).then((res) => {
    primayPhotoIds.value = res.data.data[pageUserId]
        ? res.data.data[pageUserId]
        : [];
  });
};
const focusUser = () => {
  const config = {
    ...API_INTERACT_USER.focusUser,
    data: [pageUserId],
  };
  seenAxios<R<Record<number, boolean>>>(config).then((res) => {
    if(res.data.data[pageUserId]===undefined){
      console.error(`用户信息不存在，用户ID${pageUserId}`)
      return;
    }
    focus.value = res.data.data[pageUserId];
  });
};
const thumbUser = () => {
  const config = {
    ...API_INTERACT_USER.thumbUser,
    data: [pageUserId],
  };
  seenAxios<R<Record<number, boolean>>>(config).then((res) => {
    if(res.data.data[pageUserId]===undefined){
      console.error(`用户信息不存在，用户ID${pageUserId}`)
      return;
    }
    thumb.value = res.data.data[pageUserId];
  });
};
const userIdToPersonIntroduce = () => {
  const config = {
    ...API_BASIC_INFO.userIdToPersonIntroduce,
    data: [pageUserId],
  };
  seenAxios<R<Record<number, PersonIntroduce[]>>>(config).then((res) => {
    if(res.data.data[pageUserId]===undefined){
      console.error(`用户信息不存在，用户ID${pageUserId}`)
      return;
    }
    personIntroduceData.value = res.data.data[pageUserId];
  });
};
const userIdToTagName = () => {
  const config = {
    ...API_BASIC_INFO.userIdToTagName,
    data: [pageUserId],
  };
  seenAxios<R<Record<number, string[]>>>(config).then((res) => {
    if(res.data.data[pageUserId]===undefined){
      console.error(`用户信息不存在，用户ID${pageUserId}`)
      return;
    }
    tagNames.value = res.data.data[pageUserId];
  });
};
const thumb = ref<boolean>(false);
const destUserIdToThumb = () => {
  const config = {
    ...API_BASIC_INFO.destUserIdToThumb,
    data: [pageUserId],
  };
  seenAxios<R<Record<number, boolean>>>(config).then((res) => {
    if(res.data.data[pageUserId]===undefined){
      console.error(`用户信息不存在，用户ID${pageUserId}`)
      return;
    }
    thumb.value = res.data.data[pageUserId];
  });
};
const focus = ref<boolean>(false);
const destUserIdToFocus = () => {
  const config = {
    ...API_BASIC_INFO.destUserIdToFocus,
    data: [pageUserId],
  };
  seenAxios<R<Record<number, boolean>>>(config).then((res) => {
    if(res.data.data[pageUserId]===undefined){
      console.error(`用户信息不存在，用户ID${pageUserId}`)
      return;
    }
    focus.value = res.data.data[pageUserId];
    loading.value = false;
  });
};
const userIntroduceInfo = ref<UserIntroduceInfo>({
  /**
   * 用户ID
   */
  userId: pageUserId,
  /**
   * 用户认证
   */
  userAuthId: 0,
  /**
   * 昵称
   */
  aliasName: "梅茗",
  /**
   * 现居城市名
   */
  currentResidenceCityName: "深圳",
  /**
   * 出生省份名
   */
  birthPlaceProvinceName: "广东",
  /**
   * 出生城市名
   */
  birthPlaceCityName: "深圳",
  /**
   * 出生年份
   */
  birthYear: 1996,
  /**
   * 星座
   */
  constellation: "摩羯座",
  /**
   * 体重（千克）
   */
  weightKg: 70,

  /**
   * 身高（厘米）
   */
  statureCm: 175,
  /**
   * 学历
   */
  educationId: Education["学士"].valueOf(),
  /**
   * 就读学校
   */
  schoolName: "中国医科大学",
  /**
   * 职业
   */
  workPositionName: "医生",
  /**
   * 工作公司
   */
  workCompanyName: "深圳市第二人民医院",
});
const userIdToUserIntroduceInfo = () => {
  const config = {
    ...API_BASIC_INFO.userIdToUserIntroduceInfo,
    data: [pageUserId],
  };
  seenAxios<R<Record<number, UserIntroduceInfo>>>(config).then((res) => {
    if(res.data.data[pageUserId]===undefined){
      console.error(`用户信息不存在，用户ID${pageUserId}`)
      return;
    }
    userIntroduceInfo.value = res.data.data[pageUserId];
  });
};
const onClickDoTask = () => {
  showToast({message: "未实现"});
  //TODO
};
const onClickBuy = () => {
  showToast({message: "未实现"});
  //TODO
};
const onClickEditInfo = () => {
  SeenRouterUtils.toPage(router, PathEnum.EditBasicInformation, {});
};
const onClickEditTag = () => {
  SeenRouterUtils.toPage(router, PathEnum.EditTag, {});
};
const loading = ref(true);

watch(
    () => personIntroduceData.value,
    (newVal) => {
      if (newVal) {
        let allIds = newVal
            .map((value) => {
              let keys: number[] = Object.keys(value.orderToPhotoIdMap).map(
                  (value) => Number(value)
              );
              let photoIds: (number | undefined)[] = keys.map((v) => {
                return value.orderToPhotoIdMap[v];
              });
              return photoIds;
            })
            .flatMap((value) => {
              return value;
            });
        allIds.forEach((photoId) => {
          if (photoId === undefined) {
            console.error("找不到照片ID")
            return;
          }
          photoService.photoIdToResourcesByCompress(photoId).then((res) => {
            if (!photoIdToPhotoContentMap.value[photoId] ||
                photoIdToPhotoContentMap.value[photoId].imageUrl === "") {
              photoIdToPhotoContentMap.value[photoId] = {...res};
            }
          });
          let photoUrl = photoService.photoIdToPhotoUrl(photoId);
          photoIdToPhotoContentMap.value[photoId] = {
            file: null,
            compressImageUrl: photoUrl,
            imageUrl: photoUrl,
            status: '下载成功'
          }
        });
        return {};
      }
      return {};
    }
);

onMounted(() => {
  userIdToPrimaryPhotoId();
  userIdToUserIntroduceInfo();
  userIdToPersonIntroduce();
  userIdToTagName();
  destUserIdToThumb();
  destUserIdToFocus();
  checkSelf();
});
</script>

<style scoped></style>
