//scripts
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
//styles
import '/src/css/main.css';
//config & mount
const myapp = createApp(App);
myapp.config.globalProperties.$axios = axios;
myapp.use(store);
myapp.use(router);
myapp.mount('#app');