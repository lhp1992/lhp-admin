import { extend, isArray } from './public'
import Feature from './feature'
import { polyline as polylineOptions, productionErrorTip } from './config'

export function newFeature(params = {}, options) {
  if (!params[this.pathKey] || !isArray(params[this.pathKey])) {
    productionErrorTip && console.error('坐标错误！', params[this.pathKey], params)
    return false
  }
  const item = new AMap.Polyline(params.options ? extend({}, options || this.options, params.options) : (options || this.options))
  item.setPath(params[this.pathKey])
  return item
}

class Polyline extends Feature {
  options = polylineOptions
  constructor(obj = {}) {
    super()
    this.pathKey = 'path'
    this.init(obj)
  }
  newFeature = newFeature
}

export default Polyline
