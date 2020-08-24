import Vue from 'vue'
import config from '../config'

const { authoritys } = config
export let authorityList = []

export function verifyMenu(menu) {
  return menu.filter(item => {
    if (item.name) {
      if (!ifPagePermission(item.name)) return false
    }
    if (item.children) {
      let _children = verifyMenu(item.children)
      if (_children.length > 0) {
        item.children = _children
      } else {
        delete item.children
      }
    }
    return true
  })
}

export function verifyModule(arr) {
  return arr.filter(name => {
    return ifPagePermission(name)
  })
}

export function verifyRouter(router) {
  return router.filter(item => {
    if (item.name) {
      if (!ifPagePermission(item.name)) return false
    }
    if (item.children) {
      let _children = verifyRouter(item.children)
      if (_children.length > 0) {
        item.children = _children
      } else {
        delete item.children
      }
    }
    return true
  })
}

export function ifPagePermission(key) {
  const authority = authoritys[key]
  if (authority && authorityList.indexOf(authority) === -1) return false
  return true
}

export function ifPermission(key) {
  return authorityList.indexOf(key) !== -1 
}

export default {
  install (Vue, options = {}) {
    Vue.prototype.$ifPermission = ifPermission
    
    if (options.authorityList) {
      authorityList = options.authorityList
    } else {
      authorityList = []
    }

    for (let key in config.menu) {
      config.menu[key] = verifyMenu(config.menu[key])
    }

    for (let key in config.modal.modules) {
      let children = config.modal.modules[key].children
      if (children && children.length > 0) config.modal.modules[key].children = verifyModule(children)
    }

    let router = options.router
    let key = options.name
    let asyncRoutes = options.asyncRoutes
    if (!router || !asyncRoutes) return
    router.addRoutes(verifyRouter(asyncRoutes))

    router.beforeEach((to, from, next) => {
      if (to.name && !ifPagePermission(to.name)) {
        next('/unpermission')
        return
      }
      next()
    })

  }
}
