<script lang="ts" setup>
import {useWindowSize} from "@vant/use";
import {showImagePreview} from "vant";
import {onMounted, reactive, ref, watch} from "vue";
import {ContentType, type ContentTypeValue} from "../../ts/model/consumer/chat/chat.ts";
import PhotoUtil from "../../ts/util/consumer/photo/photo-util.ts";

const {width} = useWindowSize();
const fontHeight = ref(22.5);
const photoWidth = ref(((width.value - 16) * 4) / 24);
const photoChatWidth = ref(((((width.value - 16) * 15) / 24) * 20) / 24);

export interface Props {
  otherImageUrl: string;
  contentType?: ContentTypeValue;
  photo?: {
    url: string;
  };
  text?: {
    content: string;
  };
}

const props = defineProps<Readonly<Props>>();
const emits = defineEmits<{
  (e: 'loadImage'): void
}>();

const voiceFile = defineModel<File | null>("voiceFile")
const voice = reactive<{ url: string, seconds: number }>({url: '', seconds: 0});
watch(voiceFile, (newVal) => {
  if (newVal != null && props.contentType === ContentType.VOICE) {
    console.log("解析声音,类型" + props.contentType)
    const voiceUrl = PhotoUtil.fileToUrl(newVal);
    voice.url = voiceUrl;
    urlToSeconds(voiceUrl)
  } else {
    voice.seconds = 0;
  }
})

const urlToSeconds = (voiceUrl: string) => {
  navigator.mediaDevices.getUserMedia({audio: true}).then(() => {
    const audioContext = new AudioContext();
    return fetch(voiceUrl).then(res => {
      return res.arrayBuffer()
    }).then(arrayBuffer => {
      return audioContext.decodeAudioData(arrayBuffer);
    }).then(audioBuffer => {
      // 获取音频的时长
      const duration = audioBuffer.duration;
      const durationByCeil = Math.ceil(duration);
      voice.seconds = durationByCeil;
      return durationByCeil;
    });
  });
}
onMounted(() => {
  if (voiceFile.value != null && props.contentType === ContentType.VOICE) {
    console.log("解析声音,类型" + props.contentType)
    const voiceUrl = PhotoUtil.fileToUrl(voiceFile.value);
    voice.url = voiceUrl;
    urlToSeconds(voiceUrl)
  }
})

const loadImage = () => {
  emits('loadImage')
}
const onPhotoView = () => {
  if (props.photo) {
    const url = props.photo.url;
    showImagePreview({
      closeable: true,
      images: [url],
    });
  }
};

const playing = ref<boolean>(false);
let audioElement: HTMLAudioElement;

const play = (
    voice: { url: string; seconds: number } | undefined
) => {
  if (voice) {
    if (playing.value === true) {
      audioElement.pause();
      playing.value = false;
      return
    }
    playing.value = true;
    audioElement = new Audio(voice.url);
    //播放 mp3这个音频对象
    audioElement.play();
    audioElement.onended = function () {
      playing.value = false;
    };
  }
};
/**
 * voice面板的占位
 * @param min 最小值
 * @param actual  实际值
 * @param max 最大值
 */
const voiceSpan = (min: number, actual: number, max: number): number => {
  if (actual < min) {
    return min;
  } else if (actual > max) {
    return max;
  } else {
    return actual;
  }
}
</script>

<template>
  <van-col span="4" title="接收者消息">
    <van-image
        :height="photoWidth"
        :src="otherImageUrl"
        :width="photoWidth"
        alt="接收者头像"
        fit="cover"
    />
  </van-col>
  <van-col span="1" style="opacity: 0">空白列</van-col>
  <van-col span="15" style="text-align: left">
    <van-row v-if="contentType === ContentType.IMAGE && photo">
      <van-col :span="24" style="text-align: left" @click="onPhotoView()">
        <van-image :src="photo.url" :width="photoChatWidth" alt="聊天照片" @load="loadImage"/>
      </van-col>
    </van-row>
    <van-row v-else-if="contentType === ContentType.VOICE && voice">
      <van-col
          v-if="voice"
          :class="playing ? 'playing' : 'played'"
          :span="voiceSpan(4,voice.seconds,16)"
          :style="{
          padding: (photoWidth - fontHeight) / 2 + 'px 0',
        }"
          style="border: 0 solid; border-radius: 7px; text-align: center"
          @click="play(voice)"
      >
        <van-icon name="volume"/>
        {{ voice.seconds + '"' }}
      </van-col>
      <van-col
          v-if="voice"
          :span="24 - voiceSpan(4,voice.seconds,16)"
          style="opacity: 0"
      >空白列
      </van-col>
    </van-row>
    <van-row v-else-if="contentType === ContentType.TEXT && text">
      <van-col
          :style="{
          padding: (photoWidth - fontHeight) / 2 + 'px 0',
        }"
          class="seen-back-info-color"
          span="24"
          style="border: 0 solid; border-radius: 7px"
      >
        <van-row>
          <van-col class="seen-left" span="24" style="padding: 0 8px">
            {{ text.content }}
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row v-else>
      <van-col class="seen-back-access-color" span="24"
      >无法识别的消息类型
      </van-col>
    </van-row>
  </van-col>
  <van-col span="4" style="opacity: 0">空白列</van-col>
</template>

<style scoped>
.playing {
  background-color: var(--seen-info-color);
}

.played {
  background-color: var(--seen-chat-color);
}
</style>
