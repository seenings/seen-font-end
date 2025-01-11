import Vant, { Icon } from "vant";
import "vant/lib/index.css";
import { createApp } from "vue";
import "../../../../assets/main.css";

import App from "./Index.vue";

const app = createApp(App);
app.use(Icon);
app.use(Vant);
app.mount("#app");
