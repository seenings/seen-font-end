<template>
  <van-row :style="{ opacity: 0, height: height + 'px' }">空白行</van-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";

export interface Props {
  height?: number;
}

const props = defineProps<Props>();
const height = ref<number>(props.height ? props.height : 10);
</script>

<style scoped></style>
