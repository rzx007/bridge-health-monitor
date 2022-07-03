import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Main from '@/layout/Main/index.vue'
import { getStorge } from '@/utils/auth'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '@/store/index'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    hidden: false, // 拓展路由属性
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
          title: '登录'
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Main,
    meta: {
      title: '重载'
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect/index.vue'),
        meta: {
          title: '重载'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    //  处理路由切换滚动行为
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition
      }
      if (from.meta.saveSrollTop) {
        const top: number = document.documentElement.scrollTop || document.body.scrollTop
        resolve({ left: 0, top })
      }
    })
  }
})

export default router
