import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'

Vue.use(VueRouter)

const routes = [
  //auth
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue')
  },
  //home
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Index.vue'),
    meta: { requiresAuth: true }
  },
  //user
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/store',
    name: 'user.store',
    component: () => import('../views/user/StoreUpdate.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/view/:id',
    name: 'user.view',
    component: () => import('../views/user/View.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/user/update/:id',
    name: 'user.update',
    component: () => import('../views/user/StoreUpdate.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  //notfound
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: require('../views/notfound/Index').default
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let auth = store.getters.getLogin.auth

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    if (auth) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router
