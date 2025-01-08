<script lang="ts" setup>
import { ref } from "vue";
import { photoDbService } from "../../../service/indexed-db/photo-db-service";
const inputTitle = ref<string>("");
const title = ref<string>("标题");
const get = (id: number) => {
  photoDbService.openStorage("photo-title").then((res) => {
    let req = res.get("key1");
    req.onsuccess = () => {
      console.log(req.result);
      title.value = req.result;
    };
  });
};
const put = (id: number) => {
  photoDbService.openStorage("photo-title").then((res) => {
    let req = res.put(inputTitle.value, "key1");
    req.onsuccess = () => {
      console.log(req.result);
    };
  });
};

const inputData = ref<string>("");

const queryData = ref<string>("");
const putAndGetData = () => {
  photoDbService.openStorage("photo-title").then((res) => {
    let req = res.put(inputData.value, "key1");
    req.onsuccess = () => {
      console.log(req.result);
      let req2 = res.get("key1");
      req2.onsuccess = () => {
        console.log(req2.result);
        queryData.value = req2.result;
      };
    };
  });
};
const clear = () => {
  photoDbService.openStorage("photo-title").then((res) => {
    let req = res.clear();
    req.onsuccess = () => {
      console.log("清除成功");
    };
  });
};
</script>

<template>
  <input v-model="inputTitle" />
  <button @click="put(1)">添加</button>
  <h2>{{ title }}</h2>
  <button @click="get(1)">查询</button>
  <h1>第二个表</h1>

  <input v-model="inputData" />
  <button @click="putAndGetData()">添加并查询数据</button>
  <h2>{{ queryData }}</h2>

  <h1>清除图片缓存</h1>
  <button @click="clear">清除缓存</button>
</template>
<style scoped></style>
