import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
import './lib/vueConponent.scss'
import "./index.scss";
import { router } from './router';

const app = createApp(App);
// app.config.globalProperties.$test = 'test' // 全局挂载
app.use(router);
app.mount("#app");
