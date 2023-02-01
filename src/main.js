import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/global.scss'

import { vMaska } from "maska"
const pinia = createPinia()

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

createApp(App).directive("maska", vMaska).component('VueCtkDateTimePicker', VueCtkDateTimePicker).use(router).use(store).use(pinia).mount('#app')
