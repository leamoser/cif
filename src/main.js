//scripts
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
import slugify from "slugify-js"
import { injections } from "./helpers/injections.js"

//styles
import '/src/css/main.scss';

//config & mount
const myapp = createApp(App);
myapp.config.globalProperties.$axios = axios;
myapp.config.globalProperties.$slugify = slugify;
myapp.config.globalProperties.$injection = injections;
myapp.use(store);
myapp.use(router);
myapp.mount('#app');