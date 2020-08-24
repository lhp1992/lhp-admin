let modal = {
  modules: {
    'MODAL-LIST': {
      path: () => import('@/components/modal'),
      animated: 'dialog-fade',
      children: [
        {
          name: 'Demo',
          path: () => import('@/page/modal-demo')
        }, {
          name: 'Transfer',
          path: () => import('@/page/modal-transfer')
        }
      ]
    }
  }, 
  openModules: {}
}

export default modal
