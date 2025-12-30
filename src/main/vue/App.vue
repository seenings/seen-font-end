<script lang="ts" setup>
import {NavBar as VanNavBar} from "vant";
import {NumberKeyboard as VanNumberKeyboard} from "vant";

document.title = "转觅";
</script>
<template>
  <router-view/>
  <!-- 开启顶部安全区适配 -->
  <van-nav-bar safe-area-inset-top/>

  <!-- 开启底部安全区适配 -->
  <van-number-keyboard safe-area-inset-bottom/>
</template>
