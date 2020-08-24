import { Message } from 'element-ui'
import modal from './modal'
import menu from './menu'
import authoritys from './authoritys'
import breadcrumbs from './breadcrumbs'

let config = {
  modal, 
  menu,
  authoritys,
  breadcrumbs,
  map: {
    mapOptions: {
      zoom: 15
    }
  },
  errorFnc(err) {
    Message({ type: 'error', message: err })
  },
  serverApi: '../../VideoLocationServices/'
}

export default config
