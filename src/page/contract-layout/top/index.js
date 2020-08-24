import Vue from 'vue'
import state from './state'
import mutation from './mutation'
import action from './action'

let $top = new Vue ({
  data() {
    return {
      ...state
    }
  },
  methods: {
    ...mutation,
    ...action
  },
})

export default $top