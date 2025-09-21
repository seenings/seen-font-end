<template>
  <van-overlay :show="props.seenLoading">
    <seen-blank-row :height="height / 2" />
    <van-row>
      <van-col span="24">
        <van-loading color="#437de8" vertical> 寻觅中... </van-loading>
      </van-col>
    </van-row>
  </van-overlay>
</template>
<script lang="ts" setup>
import { useWindowSize } from "@vant/use";
import SeenBlankRow from "./SeenBlankRow.vue";

const { height } = useWindowSize();
interface Props {
  seenLoading: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  seenLoading: true,
});
</script>

<style scoped></style>
