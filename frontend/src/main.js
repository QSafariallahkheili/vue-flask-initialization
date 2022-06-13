import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/store.js";
//require('../node_modules/maplibre-gl/dist/maplibre-gl.css')
import '../node_modules/maplibre-gl/dist/maplibre-gl.css';
import 'bootstrap/dist/css/bootstrap.css';
createApp(App).use(store).mount('#app')
