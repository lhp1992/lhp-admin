import Vue from 'vue'

const state = new Vue ({
})

export default {
  install (Vue, options) {
    Vue.prototype.$state = state
  }
}