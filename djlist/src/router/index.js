import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

Vue.use(Router)

import userMain from '@/components/usercomponents/userMain'
import userSignup from '@/components/usercomponents/userSignup'
import userConfirm from '@/components/usercomponents/userConfirm'

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
      path: '/userMain',
      name: 'userMain',
      component: userMain
    },
    {
      path: '/userMain/userSignup',
      name: 'userSignup',
      component: userSignup
    },
    {
      path: '/userMain/userConfirm',
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
