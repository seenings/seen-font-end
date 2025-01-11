<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>{{ msg }}</p>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
interface Props {
  msg?: string;
}
const props = withDefaults(defineProps<Props>(), {
  msg: "",
});
const msg = ref<string>(props.msg);
</script>
