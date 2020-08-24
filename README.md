# lhp-admin3333

> lhp-admin 是一个个人后台前端解决方案，它基于 vue 和 element-ui实现，采用多页面方案。包含了 简单权限验证（根据权限动态生成导航菜单、路由），页面鉴权，按钮级别的鉴权功能。

------

## 基本目录结构

```
├── components // 公共组件
├── config // 配置相关
│ ├── index.js // 注入所有config相关，并导出
│ ├── authoritys.js // 页面权限字典
│ ├── menu.js // 导航菜单
│ └── breadcrumbs.js // 面包屑（根据实际情况可以和导航菜单合并）
├── modules // 多页面入口（添加新页面后需要重启项目）
│ ├── index // 文件夹名称对应html名称（例如：index对应index.html页面）
│ │ ├── index.html // 页面入口（同单页面应用index.html）
│ │ ├── index.js // 页面程序入口文件，加载各种公共组件（同单页面应用main.js）
│ │ ├── App.vue // 页面入口文件（同单页面应用App.vue）
│ │ ├── router.js // 页面路由（login等简单页面可不用路由文件）
│ │ └── plugin.js // 页面内独有的公共组件引用入口
│ └── login // login.html页面
│   ├── index.html
│   ├── index.js
│   └── App.vue
├── page // vue页面
└── public // 全局公用方法
  ├── mock // 项目mock 模拟数据
  ├── units // 公用方法
  ├── mixin // mixin
  ├── ajax.js // 基于axios的二次封装（form-data请求数据）
  ├── authority.js // 权限验证
  ├── breadcrumbs.js // 面包屑
  └── state.js // 简单的状态管理（根据情况可使用vuex）
```

------

## 权限验证

```javascript
// /modules/*/router.js
export let asyncRoutes = [
  {
    path: '',
    component: Layout, 
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/page/login')
      }, {
        path: '/flow',
        name: 'Flow',
        component: () => import('@/page/flow')
      }, {
        path: '*',
        name: 'Error',
        component: () => import('@/page/error')
      }
    ]
  }
]
```

需要进行权限验证的页面请尽量写到asyncRoutes动态路由内（没有权限的页面不会添加进路由，没权限者访问会进入404页面）。

```javascript
// /public/authority.js
router.beforeEach((to, from, next) => {
  if (to.name && !ifPagePermission(to.name)) {
    next('/unpermission')
    return
  }
  next()
})
```
当然对于非动态路由也会进行二次鉴权（没权限者访问会进入403页面）。

## config

```javascript
// config/authoritys.js
const authority = {
  Login: 'login', // 访问Login页面需要'login'权限。
  Flow: 'flow' // 访问Flow页面需要'flow'权限。
}
```
router路由必须带name（具名路由）。此处的Key键以及menu.js、breadcrumbs.js中的name都是具名路由的name。

## 公共方法

```vue
<button v-if="$ifPermission('button')"></button>
```
按钮级别的鉴权，当拥有'button'权限时才显示该按钮。

```javascript
this.$ajax('login', { user: '1', password: '123' }).then().catch()
this.$ajax.upload('upload', { file: file, fileParam: '123' }).then().catch()
// 默认post
// 请求地址为serverApi + 'login'。同时会对msg.code != 0进行拦截，并用errorFnc方法向页面进行提示。
// serverApi，errorFnc可在config/index.js中配置

this.$ajax.post('../Servers/login', { user: '1', password: '123' }).then().catch()
// 不会对msg.code != 0进行拦截

this.$axios
// axios
```
http请求方式。
