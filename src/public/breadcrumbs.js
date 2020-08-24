import config from '../config'
const { breadcrumbs } = config

let _breadcrumbs = JSON.parse(JSON.stringify(breadcrumbs))
let $breadcrumbs = {}

function reorganize(breadcrumbs, target = []) {
  breadcrumbs.forEach(breadcrumb => {
    let name = breadcrumb.name
    let title = breadcrumb.title
    if (breadcrumb.children && breadcrumb.children.length > 0) {
      reorganize(breadcrumb.children, [...target, {
        name: name,
        title: title
      }])
    }
    $breadcrumbs[name] = [...target, {
      name: name,
      title: title
    }]
  })
}

reorganize(_breadcrumbs)

export default {
  install (Vue, router) {
    Vue.prototype.$breadcrumbs = $breadcrumbs
  }
}