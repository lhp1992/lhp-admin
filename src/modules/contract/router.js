import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/unpermission',
    name: 'UnPermission',
    component: () => import('@/page/unpermission')
  }, {
    path: '*',
    name: 'Error',
    component: () => import('@/page/error')
  }
]

const router = new Router({
  routes: routes
})

export let asyncRoutes = [
  {
    path: '',
    name: 'Contract',
    component: () => import('@/page/contract-layout'), 
    children: [
      {
        path: '/zjcg',
        name: 'ContractZjcg',
        component: () => import('@/page/contract-zjcg')
      }
    ]
  }, {
    path: '/zjcg2',
    name: 'ContractZjcg2',
    component: () => import('@/page/contract-zjcg2')
  }
]

export default router
