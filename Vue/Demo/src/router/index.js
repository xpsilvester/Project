import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PPTList from '@/components/PPTList'
import CMS from '@/pages/CMS'
import Chat from '@/pages/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/PPTList',
      name: 'PPTList',
      component: PPTList
    },
    {
      path: '/CMS',
      name: 'CMS',
      component: CMS
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
