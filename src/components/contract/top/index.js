import Vue from 'vue'
import state from './state'
import mutation from './mutation'
import action from './action'

export default () => {
  return new Vue ({
    data() {
      return {
        ...state
      }
    },
    methods: {
      ...mutation,
      ...action
    }
  })
}
