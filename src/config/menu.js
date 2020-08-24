let menu = {
  slideMenu: [
    {
      title: '导航一',
      icon: 'el-icon-location',
      children: [
        {
          title: '登录',
          name: 'Login'
        }, {
          title: '首页',
          name: 'Home'
        }
      ]
    }, {
      title: '403',
      icon: 'el-icon-menu',
      name: 'UnPermission',
    }, {
      title: '流程管理',
      icon: 'el-icon-s-claim',
      children: [
        {
          title: '新建流程',
          name: 'ProcessAdd'
        }, {
          title: '已办事宜',
          name: 'Ybsy'
        }
      ]
    }, {
      title: '地图',
      icon: 'el-icon-map-location',
      name: 'MapDemo',
    }, {
      title: 'demo',
      icon: 'el-icon-map-location',
      name: 'MapDemo2',
    }
  ]
}

export default menu
