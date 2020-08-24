import { extend, isArray } from './public'
import Feature from './feature'
import { polygon as polygonOptions, productionErrorTip } from './config'

export function newFeature(params = {}, options) {
  if (!params[this.pathKey] || !isArray(params[this.pathKey])) {
    productionErrorTip && console.error('坐标错误！', params[this.pathKey], params)
    return false
  }
  const item = new AMap.Polygon(params.options ? extend({}, options || this.options, params.options) : (options || this.options))
  item.setPath(params[this.pathKey])
  return item
}

class Polygon extends Feature {
  options = polygonOptions
  constructor(obj = {}) {
    super()
    this.pathKey = 'path'
    this.init(obj)
  }
  newFeature = newFeature
}

export default Polygon
