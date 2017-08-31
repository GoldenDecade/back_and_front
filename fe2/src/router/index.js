import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Overview from '@/components/Overview'
import ClassInfo from '@/components/ClassInfo'
import Activity from '@/components/Activity'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/overview',
      name: 'overview',
      component: Overview
    },
    {
      path: '/classInfo',
      name: 'classInfo',
      component: ClassInfo
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
  ],
  linkActiveClass: 'active'
})
