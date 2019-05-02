import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

Vue.use(Router)

import userSignup from '@/components/usercomponents/userSignup'
import userLogin from '@/components/usercomponents/userLogin'
import userConfirm from '@/components/usercomponents/userConfirm'

import privacypolicy from '@/components/privacypolicy'
import termsofservise from '@/components/termsofservise'
import itemMain from '@/components/itemcomponents/itemMain'

let router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/userSignup',
      name: 'userSignup',
      component: userSignup
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/userConfirm',
      name: 'userConfirm',
      component: userConfirm
    },
    {
      path: '/itemMain',
      name: 'itemMain',
      component: itemMain
    },
    {
      path: '/privacypolicy',
      name: 'privacypolicy',
      component: privacypolicy
    },
    {
      path: '/termsofservise',
      name: 'termsofservise',
      component: termsofservise
    }
  ]
})

import firebase from 'firebase'
// router.beforeEach()を追加
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    console.log("unlogined");
    next('userLogin')
  } else if (!requiresAuth && currentUser) next()
  else next()
})

export default router
