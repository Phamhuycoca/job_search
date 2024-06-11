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
//import GoogleSignInPlugin from "vue3-google-signin"
import vue3GoogleLogin from "vue3-google-login"
const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(vue3GoogleLogin, {
  clientId: '573787933121-2pdk3q3f6upb09h040cf4u1v4dun38b4.apps.googleusercontent.com',
})
.use(pinia)
  .use(ElementPlus)
  .use(useToast, {
    position: "top-right",
    timeout: 1500,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
  })
  .use(router)
  .mount("#app");
