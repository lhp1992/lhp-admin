import { extend, isArray } from './public'
import Feature from './feature'
import { polygon as polygonOptions, productionErrorTip } from './config'

export function newFeature(params = {}, options) {
  if (!params[this.boundsKey]) {
    productionErrorTip && console.error('坐标错误！', params[this.boundsKey], params)
    return false
  }

  const item = new AMap.Rectangle(params.options ? extend({}, options || this.options, params.options) : (options || this.options))
  let _bounds = params[this.boundsKey]
  if (isArray(_bounds)) {
      let southWest = []
      let northEast = []
      if (_bounds[0][0] > _bounds[1][0]) {
          southWest.push(_bounds[1][0])
          northEast.push(_bounds[0][0])
      } else {
          southWest.push(_bounds[0][0])
          northEast.push(_bounds[1][0])
      }
      if (_bounds[0][1] > _bounds[1][1]) {
          southWest.push(_bounds[1][1])
          northEast.push(_bounds[0][1])
      } else {
          southWest.push(_bounds[0][1])
          northEast.push(_bounds[1][1])
      }
      item.setBounds(new AMap.Bounds(southWest, northEast))
  } else {
      item.setBounds(_bounds)
  }
  return item
}

class Rectangle extends Feature {
  options = polygonOptions
  constructor(obj = {}) {
    super()
    this.boundsKey = 'bounds'
    this.init(obj)
  }
  newFeature = newFeature
}

export default Rectangle
