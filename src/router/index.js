import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '@/router/middlewares/auth'
import {guest} from '@/router/middlewares/guest'
import middlewarePipeline from './middlewarePipeline'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import('@/views/Register'),
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/Login'),
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/home',
    name: 'owner',
    component: ()=>import('@/views/Home'),
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '*',
    component: ()=>import('@/views/Error404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next, 
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
