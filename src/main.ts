import "./assets/main.css";
import "./style.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import useToast from "vue-toastification";
import "vue-toastification/dist/index.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(ElementPlus)
  .use(useToast, {
    position: "top-right",
    timeout: 1500,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
  })
  .use(pinia)
  .use(router)
  .mount("#app");
