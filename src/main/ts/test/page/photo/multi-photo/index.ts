import Vant, { Icon } from "vant";
import "vant/lib/index.css";
import { createApp } from "vue";
import "../../../../../css/assets/main.css";

import App from "../../../../../vue/test/page/photo/multi-photo/Index.vue";

const app = createApp(App);
app.use(Icon);
app.use(Vant);
app.mount("#app");
