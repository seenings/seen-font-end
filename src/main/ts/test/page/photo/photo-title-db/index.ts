import { Icon } from "vant";
import "vant/lib/index.css";
import { createApp } from "vue";
import App from "../../../../../vue/test/page/photo/photo-title-db/Index.vue";

const app = createApp(App);
app.use(Icon)
app.mount("#app");
