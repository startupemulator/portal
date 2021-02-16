import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b24679a6 = () => interopDefault(import('..\\pages\\createAccount.vue' /* webpackChunkName: "pages/createAccount" */))
const _3ff3edb6 = () => interopDefault(import('..\\pages\\logIn.vue' /* webpackChunkName: "pages/logIn" */))
const _4f8adae4 = () => interopDefault(import('..\\pages\\logined.vue' /* webpackChunkName: "pages/logined" */))
const _d68b5caa = () => interopDefault(import('..\\pages\\unlogined.vue' /* webpackChunkName: "pages/unlogined" */))
const _4cf979ee = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/createAccount",
    component: _b24679a6,
    name: "createAccount"
  }, {
    path: "/logIn",
    component: _3ff3edb6,
    name: "logIn"
  }, {
    path: "/logined",
    component: _4f8adae4,
    name: "logined"
  }, {
    path: "/unlogined",
    component: _d68b5caa,
    name: "unlogined"
  }, {
    path: "/",
    component: _4cf979ee,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
