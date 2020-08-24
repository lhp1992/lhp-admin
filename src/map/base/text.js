import { extend, isArray } from './public'
import Feature from './feature'
import { text as markerOptions, productionErrorTip } from './config'

export function newFeature(params = {}, options) {
  if (!params[this.positionKey] || (isArray(params[this.positionKey]) && (!params[this.positionKey][0] || !params[this.positionKey][1]))) {
    productionErrorTip && console.error('坐标错误！', params[this.positionKey], params)
    return false
  }
  const item = new AMap.Text(params.options ? extend({}, options || this.options, params.options) : (options || this.options))
  item.setPosition(params[this.positionKey])
  item.setText(params[this.textKey] || '未定义的内容')
  return item
}

class Text extends Feature {
  options = markerOptions
  constructor(obj = {}) {
    super()
    this.textKey = 'text'
    this.positionKey = 'position'
    this.init(obj)
  }
  newFeature = newFeature
}

export default Text
