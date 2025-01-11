import { Icon } from "vant";
import "vant/lib/index.css";
import { createApp } from "vue";
import App from "./Index.vue";

const app = createApp(App);
app.use(Icon)
app.mount("#app");
