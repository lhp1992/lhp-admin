import MiddlewareContinuous from '../publicJS/middleware-continuous.js'

class BindEvents {
  _events = {}
  on (event, fn, isBefore) {
    if(typeof fn !== 'function'){
      throw 'middleware must be a function';
    }
    if (!this._events[event]) this._events[event] = new MiddlewareContinuous()
    this._events[event].use(fn, isBefore)
  }
  off (event, fn) {
    this._events[event].unUse(fn)
  }
  emit (event, ...arg) {
    if (this._events[event]) this._events[event].go(...arg)
  }
}

export default BindEvents
