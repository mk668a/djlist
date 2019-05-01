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
 error: 'images/error.png', // エラー時に表示する画像指定
 loading: 'images/loading.gif', // ロード中に表示する画像指定
 attempt: 1 // ロード失敗した時のリトライの上限指定
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
