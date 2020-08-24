import Vue from 'vue'
import config from '@/config'
import modulesPage from './modules'
import { ifPagePermission } from '../authority'

const { modal: { modules, openModules }, errorFnc } = config

const $modules = new Vue({
  data(){
    return {
      openModules: openModules
    }
  },
  created(){
    for(var key in modules){
      if(!this.openModules[key]){
        this.$set(this.openModules, key, [])
      }
    }
  },
  methods:{
    open (pkey, ckey, params = {}) {
      if (!modules[pkey]) return
      var target = modules[pkey].children.find(item => item.name === ckey)
      if (!target) return
      if (!ifPagePermission(ckey)) {
        errorFnc('抱歉, 您无权访问此页面！')
        return
      }

      var _index = this.openModules[pkey].findIndex(item => item.name == ckey)
      if(_index != -1){
        if(_index != this.openModules[pkey].length - 1){
          setTimeout(() => this.openModules[pkey].splice(_index, 1), 1)
          this.openModules[pkey].push({
            name: ckey,
            params: params
          })
        } else {
          this.openModules[pkey][_index].params = params
        }
        return
      }
      if (target.isOnly) {
        var _index = this.openModules[pkey].findIndex(item => modules[pkey].children[item.name].isOnly)
        if(_index != -1) this.openModules[pkey].splice(_index, 1)
      }
      this.openModules[pkey].push({
        name: ckey,
        params: params
      })
    },
    close (pkey, ckey) {
      var _index = this.openModules[pkey].findIndex(item => item.name == ckey)
      if (_index != -1) this.openModules[pkey].splice(_index, 1)
    }
  }
})

const initInstance = () => {
  const ModulesPage = Vue.extend(modulesPage);
  const instance = new ModulesPage({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};

export default {
  install (Vue, options) {
    Vue.prototype.$modules = $modules
    Vue.component('modules-page', modulesPage)
  }
}