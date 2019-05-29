import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

Vue.use(Router)

import userSignup from '@/components/usercomponents/userSignup'
import userLogin from '@/components/usercomponents/userLogin'
import userInfo from '@/components/usercomponents/userInfo'

import privacypolicy from '@/components/privacypolicy'
import termsofservise from '@/components/termsofservise'
import about from '@/components/about'
import itemMain from '@/components/itemcomponents/itemMain'
import searchMain from '@/components/searchcomponents/searchMain'
import postItem from '@/components/postItem'

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Main',
    component: Main
  }, {
    path: '/userSignup',
    name: 'userSignup',
    component: userSignup
  }, {
    path: '/userLogin',
    name: 'userLogin',
    component: userLogin
  }, {
    path: '/userInfo',
    name: 'userInfo',
    component: userInfo
  },{
    path: '/itemMain',
    name: 'itemMain',
    component: itemMain
  }, {
    path: '/searchMain',
    name: 'searchMain',
    component: searchMain
  }, {
    path: '/postItem',
    name: 'postItem',
    component: postItem
  }, {
    path: '/privacypolicy',
    name: 'privacypolicy',
    component: privacypolicy
  }, {
    path: '/termsofservise',
    name: 'termsofservise',
    component: termsofservise
  }, {
    path: '/about',
    name: 'about',
    component: about
  }]
})
