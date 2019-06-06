import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry);

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3, // 事前ロードする高さの割合指定
  error: '../assets/noimg.png', // エラー時に表示する画像指定
  loading: '../assets/loading.gif', // ロード中に表示する画像指定
  attempt: 1 // ロード失敗した時のリトライの上限指定
});

import feather from 'vue-icon'
Vue.use(feather, 'v-icon')

import firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDstgddie6uySLHh2tdrD5bRPdt5OB14h8",
  authDomain: "djlist-5d87e.firebaseapp.com",
  databaseURL: "https://djlist-5d87e.firebaseio.com",
  projectId: "djlist-5d87e",
  storageBucket: "djlist-5d87e.appspot.com",
  messagingSenderId: "174625711382",
  appId: "1:174625711382:web:b58819e7215b0af9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: {
    App
  },
  router,
  template: '<App/>',
  render: h => h(App)
})
