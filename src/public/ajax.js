import Axios from 'axios'
import qs from 'qs'
// import { Notify } from 'vant'
import config from '../config'
const { serverApi, errorFnc } = config

// const serverApi = '../../VideoLocationServices/'
// const errorFnc = function (err) {
//   // alert(err)
//   // Notify({ type: 'danger', message: err })
//   Message({ type: 'error', message: err })
// }

export let $axios = function(url, params){
  return new Promise ((resolve, reject) => {
    Axios.post(serverApi + url, qs.stringify(params), {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(response => {
      const msg = response.data
      if (msg.code != 0) {
        errorFnc(msg.msg)
        reject(msg.msg)
        return
      }
      resolve(msg.data)
    }).catch(msg => reject(msg))
  })
}

$axios.post = function(url, params){
  return Axios.post(url, qs.stringify(params), {
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

$axios.upload = function(url, params){
  return new Promise ((resolve, reject) => {
    let formdata = new FormData();
    for (let key in params) {
      formdata.append(key, params[key])
    }
    Axios.post(serverApi + url, formdata, {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      const msg = response.data
      if (msg.code != 0) {
        errorFnc(msg.msg)
        reject(msg.msg)
        return
      }
      resolve(msg.data)
    }).catch(msg => reject(msg))
  })
}

// $axios.all = function(https){
//   return new Promise ((resolve, reject) => {
//     Axios.all(https).then(Axios.spread(resolve)).catch(msg => reject(msg))
//   })
// }

export default {
  install (Vue, options) {
    Vue.prototype.$axios = Axios
    Vue.prototype.$ajax = $axios
  }
}
