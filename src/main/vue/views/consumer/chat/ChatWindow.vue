<template>
  <van-row :style="{ height: '50px' }" title="标题栏">
    <van-col span="24">
      <van-nav-bar
          :title="toName"
          left-arrow
          left-text="返回"
          right-text="信息"
          @click-left="onClickLeft"
          @click-right="onClickRight"
      >
      </van-nav-bar>
    </van-col>
  </van-row>
  <van-row
      v-if="sortLocalChatMessages.length === 0"
      :style="{ height: height - 100 + 'px' }"
      style="opacity: 0"
      title="无聊天内容时"
  >
    空白行
  </van-row>
  <van-row v-else title="聊天记录列表">
    <van-col
        id="chatRecordList"
        :style="{ height: height - 100 + 'px' }"
        span="24"
        style="overflow-y: scroll"
    >
      <!--倒序-->
      <van-row
          v-for="(localChatMessage, index) in sortLocalChatMessages"
          :key="index"
          gutter="2"
      >
        <van-col :span="24">
          <van-row title="时间行">
            <van-col :span="8" style="opacity: 0">空白列</van-col>
            <van-col :span="8" class="seen-info-color seen-font-small">
              {{ getSendTime(localChatMessage) }}
            </van-col>
            <van-col :span="8" style="opacity: 0">空白列</van-col>
          </van-row>
          <van-row title="消息行">
            <template
                v-if="
                localChatMessage.remoteId === null
                  ? true
                  : remoteIdToSelfMap[localChatMessage.remoteId]
              "
            >
              <seen-self-sender-comp
                  v-model:voice-file="localChatMessage.file"
                  :content-type="localChatMessage.contentType"
                  :is-sending="isSending(localChatMessage)"
                  :photo="{ url: getPhotoUrl(localChatMessage) }"
                  :self-image-url="
                  selfPhotoId
                    ? PhotoUtil.firstImageUrl(
                        photoIdToPhotoContentMap[selfPhotoId]
                      )
                    : ''
                "
                  :text="{ content: getText(localChatMessage) }"
                  @load-image="loadImage()"
              >
              </seen-self-sender-comp>
            </template>
            <template v-else>
              <seen-other-receiver-comp
                  v-model:voice-file=" localChatMessage.file"
                  :content-type="localChatMessage.contentType" :other-image-url="
                  toPhotoId
                    ? PhotoUtil.firstImageUrl(
                        photoIdToPhotoContentMap[toPhotoId]
                      )
                    : ''
                "
                  :photo="{ url: getPhotoUrl(localChatMessage) }"
                  :text="{ content: getText(localChatMessage) }"
                  @load-image="loadImage()"
              >
              </seen-other-receiver-comp>
            </template>
          </van-row>
          <seen-blank-row title="底部空白行"/>
        </van-col>
      </van-row>
      <seen-blank-row title="聊天记录底部行"/>
    </van-col>
  </van-row>
  <van-row :style="{ height: '50px' }" title="聊天输入框">
    <van-col span="20">
      <van-row v-if="valueType === ContentType.TEXT">
        <van-col span="5">
          <van-icon name="chat-o" size="3rem" @click="changeValueType"/>
        </van-col>
        <van-col span="19">
          <van-field v-model="currentInputText" style="background-color: ghostwhite"
                     title="输入的文本内容" @keyup.enter="onEnterPress"
          />
        </van-col>
      </van-row>
      <van-row v-if="valueType === ContentType.IMAGE">
        <van-col span="5">
          <van-icon name="photo-o" size="3rem" @click="changeValueType"/>
        </van-col>
        <van-col span="19">
          <van-uploader
              v-model="imageFiles"
              :after-read="afterRead"
              :max-count="1"
              :max-size="20 * 1024 * 1024"
              style="width: 100%"
              @oversize="onOversize"
          >
            <van-button block icon="plus"> 添加图片</van-button>
          </van-uploader>
        </van-col>
      </van-row>
      <van-row v-if="valueType === ContentType.VOICE">
        <van-col span="5">
          <van-icon name="volume-o" size="3rem" @click="changeValueType"/>
        </van-col>
        <van-col span="19">
          <van-button
              :type="recording ? 'success' : 'default'"
              block
              @click="onClickRecord"
          >
            {{ recording ? "点击停止" : "点击说话" }}
          </van-button>
        </van-col>
      </van-row>
    </van-col>
    <van-col span="4">
      <van-button
          v-if="valueType === ContentType.TEXT"
          type="primary"
          @click="onSendClick"
      >发送
      </van-button>
    </van-col>
  </van-row>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

import {useWindowSize} from "@vant/use";
import type {UploaderFileListItem} from "vant";
import {showDialog, showNotify, showToast} from "vant";
import {useStopwatch} from "vue-timer-hook";
import SeenBlankRow from "../../../components/SeenBlankRow.vue";

import SeenOtherReceiverComp from "../../../components/SeenOtherReceiverComp.vue";
import {API_BASIC_INFO} from "../../../../ts/http/basic-info-service-api.ts";
import {API_CHAT} from "../../../../ts/http/chat-service-api.ts";
import {API_PHOTO} from "../../../../ts/http/photo-service-api.ts";
import {API_VOICE} from "../../../../ts/http/voice-service-api.ts";
import type RemoteChatMessage from "../../../../ts/model/consumer/chat/RemoteChatMessage";
import {ContentType, type ContentTypeValue,type LocalChatMessage,type Voice,} from "../../../../ts/model/consumer/chat/chat.ts";
import type{UserInfo} from "../../../../ts/model/consumer/user-info/UserInfo.ts";
import type{UserMainInfo} from "../../../../ts/model/consumer/user-info/UserMainInfo.ts";
import {type R, StatusCode} from "../../../../ts/model/sys/api-result.ts";
import {PathEnum, SeenRouterUtils} from "../../../../ts/router";
import {DateUtil} from "../../../../ts/util/date-util.ts";
import SeenSelfSenderComp from "../../../components/SeenSelfSenderComp.vue";
import seenAxios from "../../../../ts/http/seen-axios.ts";
import type {PhotoContent} from "../../../../ts/model/consumer/photo/file.ts";
import photoService from "../../../../ts/service/cosumer/photo/photo-service";
import PhotoUtil from "../../../../ts/util/consumer/photo/photo-util.ts";
import {envService} from "../../../../ts/config/sys/env";
import {ajaxService} from "../../../../ts/config/sys/ajax";

const {height} = useWindowSize();
const route = useRoute();

const pageUserId = Number(route.query.pageUserId);
if (pageUserId == null) {
  showNotify({type: "danger", message: "页面访问异常"});
}
const router = useRouter();

//自己的头像
const selfPhotoId = ref<number>();
//对方的头像
const toPhotoId = ref<number>();
//对方的名字
const toName = ref("");
//自己的id
const selfId = ref(0);
//发送框文本消息
const currentInputText = ref("");

const historyIdToRemoteChatMessageMap = ref<Record<number, RemoteChatMessage>>(
    {}
);
//1 文本，2 图片，3 语音
const valueType = ref<ContentTypeValue>(ContentType.TEXT);
// 预先设置一个变量来存MediaRecorder实例
let mediaRecorder: MediaRecorder;
const audioFile = ref<File>();
let currentVoice: Voice = {
  id: 0,
  url: "",
  blankText: "",
};

const recording = ref(false);
const onOversize = () => {
  showToast("文件大小不能超过 20mb");
};
const imageFiles = ref<UploaderFileListItem[]>([]);
const remoteIdToSelfMap = computed(() => {
  let data: Record<number, boolean> = {};
  localChatMessages.value.map((localChatMessage) => {
    let remoteId = localChatMessage.remoteId;
    if (remoteId === null) {
      return null;
    } else {
      const remoteChatMessage = historyIdToRemoteChatMessageMap.value[remoteId];
      data[remoteId] = remoteChatMessage
          ? remoteChatMessage.fromUserId === selfId.value
          : true;
    }
  });
  return data;
});
const getSendTime = (localChatMessage: LocalChatMessage): string => {
  return DateUtil.fromNowByMinute(localChatMessage.sendTime);
};
const afterRead = (items: UploaderFileListItem | UploaderFileListItem[]) => {
  let files: UploaderFileListItem[];
  if (Array.isArray(items)) {
    files = items;
  } else {
    files = [items];
  }
  let file: UploaderFileListItem|undefined = files[0];
  let photoFile: File;
  if (!file || !file.file) {
    showToast("文件有问题");
    return;
  } else {
    photoFile = file.file;
  }
  file.status = "uploading";
  //放到聊天列表
  const localChatMessage: LocalChatMessage = {
    remoteId: null,
    contentType: ContentType.IMAGE,
    text: "",
    file: photoFile,
    sendTime: new Date(),
  };
  let length = localChatMessages.value.push(localChatMessage);
  //清理聊天框
  onInputClear();
  //上传照片
  uploadPhoto(photoFile).then((photoId) => {
    //发送照片消息
    sendPhotoMessage(photoId).then((remoteId: number) => {
      // 更新本地聊天记录
      let data = {
        ...localChatMessage,
        remoteId,
      };
      localChatMessages.value.splice(length - 1, 1, data);
      historyIdToRemoteChatMessage([remoteId]);
    });
  });
};
const uploadPhoto = (file: File): Promise<number> => {
  const formData = new FormData();
  formData.append("file", file);
  return seenAxios<R<number>>({
    ...API_PHOTO.uploadPhoto,
    data: formData,
  }).then((res) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      return res.data.data;
    } else {
      throw new Error("照片上传失败");
    }
  });
};

const onVoiceStart = () => {
  navigator.mediaDevices
      .getUserMedia({audio: true})
      .then((stream: MediaStream) => {
        let chunks: Blob[];
        mediaRecorder = new MediaRecorder(stream);
        const watch = useStopwatch();
        // 录音开始事件监听（即调用 mediaRecorder.start()时会触发该事件）
        mediaRecorder.onstart = () => {
          watch.start();
          chunks = [];
          currentVoice = {
            id: 0,
            url: "",
            blankText: "",
          };
        };
        // 录音可用事件监听，发生于mediaRecorder.stop()调用后，mediaRecorder.onStop 前
        mediaRecorder.ondataavailable = (e: BlobEvent) => {
          chunks.push(e.data);
          console.log('耗时' + e.timeStamp)
        };
        mediaRecorder.onerror = () => {
          watch.pause();
        };
        // 录音结束事件监听，发生在mediaRecorder.stop()和 mediaRecorder.ondataavailable 调用后
        mediaRecorder.onstop = () => {
          watch.pause();
          // 获取到录音的blob
          const blob: Blob = new Blob(chunks, {type: "audio/webm;codecs=opus"});
          //  将blob转换为file对象，名字可以自己改，一般用于需要将文件上传到后台的情况
          audioFile.value = new File([blob], "chat-record.webm");
          // 将blob转换为地址，一般用于页面上面的回显，这个url可以直接被 audio 标签使用
          const audioUrl = URL.createObjectURL(blob);
          const seconds = watch.seconds.value;
          //2-10的空格
          let blankText = "  ";
          for (let i = 3; i < seconds && i < 10; i++) {
            blankText += " ";
          }
          currentVoice = {
            id: 0,
            url: audioUrl,
            blankText: blankText,
          };
          //放到聊天列表
          const localChatMessage: LocalChatMessage = {
            remoteId: null,
            contentType: ContentType.VOICE,
            text: "",
            file: audioFile.value,
            sendTime: new Date(),
          };
          let length = localChatMessages.value.push(localChatMessage);
          //清理聊天框
          onInputClear();
          //上传录音
          uploadVoice(audioFile.value).then((res: number) => {
            //发送录音
            sendVoiceMessage(res).then((remoteId: number) => {
              // 更新本地聊天记录
              let data = {
                ...localChatMessage,
                remoteId,
              };
              localChatMessages.value.splice(length - 1, 1, data);
              historyIdToRemoteChatMessage([remoteId]);
            });
          });
        };
      })
      .catch((e) => {
        console.error(e)
        showDialog({message: "非安全模式下录音功能不支持"});
      })
      .finally(() => {
        mediaRecorder.start(60 * 1000);
        recording.value = true;
      });
};
const onClickRecord = () => {
  if (recording.value === false) {
    onVoiceStart();
  } else {
    onVoiceEnd();
  }
};
const onVoiceEnd = () => {
  mediaRecorder.stop();
  recording.value = false;
};
const localChatMessages = ref<LocalChatMessage[]>([]);
/**
 * 按发送时间升序排列
 */
const sortLocalChatMessages = computed(() => {
  let data = localChatMessages.value;
  return data.sort((a:LocalChatMessage, b:LocalChatMessage) => {
    if (a.sendTime && b.sendTime) {
      return a.sendTime.getTime() - b.sendTime.getTime();
    } else {
      return 0;
    }
  });
});
//是否不在服务器
const isSending = (localChatMessage: LocalChatMessage): boolean => {
  const remoteId = localChatMessage.remoteId;
  return !remoteId;
};

const changeValueType = () => {
  valueType.value = (valueType.value % 3) + 1;
};
const getText = (localChatMessage: LocalChatMessage): string => {
  const chatText = localChatMessage.text;
  return chatText ? chatText : "";
};
const getPhotoUrl = (localChatMessage: LocalChatMessage): string => {
  return PhotoUtil.fileToUrl(localChatMessage.file);
};

const uploadVoice = (file: File): Promise<number> => {
  const formData = new FormData();
  formData.append("file", file);
  return seenAxios<R<number>>({
    ...API_VOICE.uploadVoice,
    data: formData,
  }).then((res) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      let contentId = res.data.data;
      currentVoice.id = contentId;
      return contentId;
    } else {
      throw new Error("录音文件上传失败");
    }
  });
};
const voiceIdToVoice = (
    voiceIds: number[]
): Promise<Record<number, string>> => {
  const config = {
    ...API_VOICE.voiceIdToUrl,
    data: voiceIds,
  };
  return seenAxios<R<Record<number, string>>>(config).then((res) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      return res.data.data;
    } else {
      throw new Error("获取录音文件失败");
    }
  });
};
const textIdToChatText = (
    textIds: number[]
): Promise<Record<number, string>> => {
  const config = {
    ...API_BASIC_INFO.textIdToContent,
    data: textIds,
  };
  return seenAxios<R<Record<number, string>>>(config).then((res) => {
    if ((res.data.code) === StatusCode.SUCCESS) {
      return res.data.data;
    } else {
      throw new Error(res.data.msg);
    }
  });
};
const photoIdToPhotoContentMap = ref<Record<number, PhotoContent>>({});
watch(selfPhotoId, (newVal) => {
  if (newVal) {
    let photoId = newVal;
    photoService.photoIdToResourcesByCompress(photoId).then((res) => {
      if (
          !photoIdToPhotoContentMap.value[photoId] ||
          photoIdToPhotoContentMap.value[photoId].imageUrl === ""
      ) {
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
  }
});
watch(toPhotoId, (newVal) => {
  if (newVal) {
    let photoId = newVal;
    photoService.photoIdToResourcesByCompress(photoId).then((res) => {
      if (
          !photoIdToPhotoContentMap.value[photoId] ||
          photoIdToPhotoContentMap.value[photoId].imageUrl === ""
      ) {
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
  }
});
const getUserInfo = () => {
  const config = {
    ...API_BASIC_INFO.selfUserInfo,
  };
  seenAxios<R<UserInfo>>(config).then((res) => {
    if (res.data.code === StatusCode.SUCCESS.valueOf()) {
      let data = res.data.data;
      selfPhotoId.value = data.mainPhotoId;
      selfId.value = data.userId;
    }
  });
};
const userIdToUserMainInfo = () => {
  seenAxios<R<Record<number, UserMainInfo>>>({
    ...API_BASIC_INFO.userIdToUserMainInfo,
    data: [pageUserId],
  }).then((res) => {
    const userMainInfo = res.data.data[pageUserId];
    if (userMainInfo) {
      toName.value = userMainInfo.aliasName ? userMainInfo.aliasName : "无昵称";
      toPhotoId.value = userMainInfo.mainPhotoId;
    }
  });
};
/**
 * 根据用户ID获取聊天记录ID
 */
const userIdToHistoryId = () => {
  const config = {
    ...API_CHAT.userIdToHistoryId,
    data: [pageUserId],
  };
  return ajaxService.request<Record<number, number[]>>(config).then((res) => {
    if (res.data[pageUserId])
      updateLocalIdToHistoryIdMap(res.data[pageUserId]);
  })
};
const updateLocalChatMessageByRemoteId = (
    localChatMessage: LocalChatMessage
) => {
  if (localChatMessage.remoteId === null) {
    return;
  }
  localChatMessages.value = localChatMessages.value.map((item) => {
    if (item.remoteId === localChatMessage.remoteId) {
      return localChatMessage;
    } else {
      return item;
    }
  });
};
/**
 * 更新ID对应列表
 * @param historyIds  聊天记录ID作为数据
 */
const updateLocalIdToHistoryIdMap = (historyIds: number[]) => {
  for (let i = 0; i < historyIds.length; i++) {
    let remoteId = historyIds[i];
    if (remoteId)
        //先填充空白，后续获取远端数据后填充
      localChatMessages.value.push({
        remoteId: remoteId,
        contentType: ContentType.NONE,
        text: "",
        file: null,
        sendTime: new Date(),
      });
  }
  nextTick(() => {
    onChatRecordListEndChange();
  });
  historyIdToRemoteChatMessage(historyIds).then((res) => {
    historyIds.forEach((n) => {
      let remoteId = n;
      const remoteChatMessage = res[remoteId];
      if (remoteChatMessage) {
        // 更新本地聊天记录
        let localChatMessage: LocalChatMessage = {
          remoteId: remoteId,
          contentType:
          remoteChatMessage.contentTypeId
          ,
          text: "",
          file: null,
          sendTime: new Date(remoteChatMessage.sendTime),
        };
        updateLocalChatMessageByRemoteId(localChatMessage);
        switch (localChatMessage.contentType) {
          case ContentType.TEXT:
            let textId = remoteChatMessage.contentId;
            textIdToChatText([textId]).then((res) => {
              // 更新本地聊天记录
              if (res[textId])
                localChatMessage.text = res[textId];
              updateLocalChatMessageByRemoteId(localChatMessage);
            });
            break;
          case ContentType.VOICE:
            let voiceId = remoteChatMessage.contentId;
            voiceIdToVoice([voiceId]).then((res) => {
              let url = res[voiceId];
              if (url) {
                fetch(new URL(url))
                    .then((response) => response.blob()) // 返回Blob对象表示文件内容
                    .then((blob) => {
                      // 创建File对象并指定文件名
                      // 更新本地聊天记录
                      localChatMessage.file = new File([blob], "filename.txt");
                      updateLocalChatMessageByRemoteId(localChatMessage);
                    });
              }
            });
            break;
          case ContentType.IMAGE:
            let photoUrl = photoService.photoIdToPhotoUrl(remoteChatMessage.contentId);
            // 更新本地聊天记录
            fetch(photoUrl).then((res: Response) => {
              res.blob().then((blob) => {
                localChatMessage.file = new File([blob], 'image');
                updateLocalChatMessageByRemoteId(localChatMessage);
              })
            })
            break;
          default:
            break;
        }
      }
    });
  });
};
/**
 * 根据聊天内容ID获取聊天内容
 * @param historyIds  聊天内容ID
 */
const historyIdToRemoteChatMessage = (
    historyIds: number[]
): Promise<Record<number, RemoteChatMessage>> => {
  const config = {
    ...API_CHAT.historyIdToRemoteChatMessage,
    data: historyIds,
  };
  return seenAxios<R<Record<number, RemoteChatMessage>>>(config).then((res) => {
    let data = res.data.data;
    historyIds.forEach((historyId) => {
      if (data[historyId])
        historyIdToRemoteChatMessageMap.value[historyId] = data[historyId];
    });
    return res.data.data;
  });
};
watch(ref(pageUserId), () => {
  userIdToHistoryId();
});
const onEnterPress = () => {
  if (valueType.value === ContentType.TEXT) {
    onSendClick();
  }
}
const onSendClick = () => {
  //放到聊天列表
  let text = currentInputText.value;
  if (text === "") {
    showNotify({type: "warning", message: "没有聊天消息"});
    return;
  }
  const localChatMessage: LocalChatMessage = {
    remoteId: null,
    contentType: ContentType.TEXT,
    text: text,
    file: null,
    sendTime: new Date(),
  };
  let length = localChatMessages.value.push(localChatMessage);
  nextTick(() => {
    onChatRecordListEndChange();
  });
  //清理聊天框
  onInputClear();
  //上传和发送文本
  sendChatTextMessage(text).then((remoteId: number) => {
    // 更新本地聊天记录
    let data = {
      ...localChatMessage,
      remoteId,
    };
    localChatMessages.value.splice(length - 1, 1, data);
    nextTick(() => {
      onChatRecordListEndChange();
    });
    historyIdToRemoteChatMessage([remoteId]);
  });
};
//输入框清空
const onInputClear = () => {
  currentInputText.value = "";
  currentVoice = {
    id: 0,
    url: "",
    blankText: "",
  };
  imageFiles.value = [];
};
const sendChatTextMessage = (text: string): Promise<number> => {
  const config = {
    ...API_CHAT.sendChatTextMessage,
    params: {
      toUserId: pageUserId,
    },
    data: {
      value: text,
    },
  };
  return seenAxios<R<number>>(config).then((res) => {
    return res.data.data;
  });
};
const sendPhotoMessage = (photoId: number): Promise<number> => {
  const config = {
    ...API_CHAT.sendPhotoMessage,
    params: {
      photoId,
      toUserId: pageUserId,
    },
  };
  return seenAxios<R<number>>(config).then((res) => {
    return res.data.data;
  });
};
const sendVoiceMessage = (voiceId: number): Promise<number> => {
  return seenAxios<R<number>>({
    ...API_CHAT.sendVoiceMessage,
    params: {
      voiceId,
      toUserId: pageUserId,
    },
  }).then((res) => {
    return res.data.data;
  });
};
const onChatRecordListEndChange = () => {
  const elementById = document.querySelector("#chatRecordList");
  if (elementById) {
    elementById.scrollTop = elementById.scrollHeight - elementById.clientHeight;
  }
};
nextTick(() => {
  onChatRecordListEndChange();
});
const onClickLeft = () => {
  router.go(-1);
};
const onClickRight = () => {
  SeenRouterUtils.toPage(router, PathEnum.PersonIntroduce, {
    pageUserId: pageUserId,
  });
};

const eventSourceByTwoChat = new EventSource(
    "/seen/sse-v1/chat/two-chat/receive" +
    "?" +
    envService.getClientTokenName() +
    "=" +
    envService.getClientToken()
);
eventSourceByTwoChat.onmessage = function (event) {
  doMessage(event.data);
};
/**
 * 处理刚接收的新消息
 * @param newHistoryId  消息
 */
const doMessage = (newHistoryId: number) => {
  updateLocalIdToHistoryIdMap([newHistoryId]);
};
const loadImage = () => {
  nextTick(() => {
    onChatRecordListEndChange();
  });
}
onMounted(() => {
  getUserInfo();
  userIdToUserMainInfo();
  userIdToHistoryId();
});
</script>
<style>
.van-uploader__wrapper {
  display: block;
}
</style>