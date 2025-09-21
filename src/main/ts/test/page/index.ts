import "vant/lib/index.css";
import { createApp } from "vue";
import "../../../css/assets/main.css";
import App from "../../../vue/test/page/Index.vue";

const app = createApp(App);

app.mount("#app");
