import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test/Test'
import Home from '@/pages/Home'
import Cart from '@/pages/Cart'
import Category from '@/pages/Category'
import About from '@/pages/About'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import Recommend from '@/pages/Recommend'
import Computer from '@/pages/Computer'
import Phone from '@/pages/Phone'
import Router1 from '@/pages/Router'
import Television from '@/pages/Television'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'recommend',
          component: Recommend
        },
        {
          path: 'computer',
          name: 'computer',
          component: Computer
        },
        {
          path: 'phone',
          name: 'phone',
          component: Phone
        },
        {
          path: 'router',
          name: 'router',
          component: Router1
        },
        {
          path: 'television',
          name: 'television',
          component: Television
        }
      ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        keepAlive: false
      }
    }
  ]
})
