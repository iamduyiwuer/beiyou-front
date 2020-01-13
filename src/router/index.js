import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import HomeIndex from '../components/Index'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'
import Realtime from '../components/data_hub/Realtime'
import History from '../components/data_hub/History'
import Monitor from '../components/video/Monitor'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: HomeIndex
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/realtime',
        component: Realtime
      },
      {
        path: '/history',
        component: History
      },
      {
        path: '/monitor',
        component: Monitor
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数， 表示放行 next():放行 next('/login'):强制跳转
  if (to.path === '/login') return next()
  // 如果访问的是需要权限的页面，首先获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
