import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

Vue.use(Router)

import userSignup from '@/components/usercomponents/userSignup'
import userLogin from '@/components/usercomponents/userLogin'
import userContent from '@/components/usercomponents/userContent'

import privacypolicy from '@/components/privacypolicy'
import termsofservise from '@/components/termsofservise'
import itemMain from '@/components/itemcomponents/itemMain'

export default new Router({
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
      path: '/userContent',
      name: 'userContent',
      component: userContent
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
