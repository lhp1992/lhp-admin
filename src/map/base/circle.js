import { extend, isArray } from './public'
import Feature from './feature'
import { circle as circleOptions, productionErrorTip } from './config'
import MiddlewareContinuous from '../publicJS/middleware-continuous.js'
import overlayEditor from './overlay-editor'

export function newFeature(params = {}, options) {
  if (!params[this.centerKey] || !params[this.radiusKey]) {
    productionErrorTip && console.error('坐标错误！', params[this.pathKey], params)
    return false
  }
  const item = new AMap.Circle(params.options ? extend({}, options || this.options, params.options) : (options || this.options))
  item.setCenter(params[this.centerKey])
  item.setRadius(params[this.radiusKey])
  return item
}

class Circle extends Feature {
  options = polygonOptions
  constructor(obj = {}) {
    super()
    this.centerKey = 'center'
    this.radiusKey = 'radius'
    this.init(obj)
  }
  newFeature = newFeature
}

export default Circle

const bindUpdate = function(){
  clearTimeout(this.circleSearch.timeout)
  this.circleSearch.timeout = setTimeout(() =>{
    this.circleSearch.middleware.go(this.getCenter(), this.getRadius(), this)
  }, 500)
}

export const bindCircleSearch = function(circle, callback){
  if(typeof callback !== 'function'){
    productionErrorTip && console.error('错误的回调函数！', callback)
  }
  const isEdit = circle._isEditorOpen
  if (!circle._isBindCircleSearch) {
    circle.circleSearch = {
      middleware: new MiddlewareContinuous()
    }
    circle._isBindCircleSearch = true
    circle.circleSearch.middleware.use(callback)
    circle.unBindCircleSearch = () => {
      circle.editorFeature.off('move', bindUpdate)
      circle.editorFeature.off('adjust', bindUpdate)
      clearTimeout(circle.circleSearch.timeout)
      delete circle._isBindCircleSearch
      delete circle.circleSearch
      delete circle.unBindCircleSearch
      if (!isEdit) circle.editorClose()
    }

    const bindEvents = function(){
      circle.editorFeature.on('move', bindUpdate, circle)
      circle.editorFeature.on('adjust', bindUpdate, circle)
    }

    if (!isEdit) {
      overlayEditor(circle).then(() => bindEvents())
    } else {
      circle.editorOpen()
      bindEvents()
    }
  } else {
    circle.circleSearch.middleware.use(callback)
  }
}
