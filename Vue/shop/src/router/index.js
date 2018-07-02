import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test/Test'
import Home from '@/pages/Home'
import Cart from '@/pages/Cart'
import Category from '@/pages/Category'
import About from '@/pages/About'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
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
    }
  ]
})
