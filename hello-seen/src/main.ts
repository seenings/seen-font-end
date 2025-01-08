import { createPinia } from "pinia";
import Vant from "vant";
import "vant/lib/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { router } from "./router";

const app = createApp(App);
app.use(router);
app.use(Vant);

app.use(createPinia());
app.mount("#app");
