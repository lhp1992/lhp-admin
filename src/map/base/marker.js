import { extend, isArray } from './public'
import Feature from './feature'
import { marker as markerOptions, productionErrorTip } from './config'
import { initClusterer } from './marker-clusterer'
import initRun from './marker-run'

export function newFeature(params = {}, options) {
  if (!params[this.positionKey] || (isArray(params[this.positionKey]) && (!params[this.positionKey][0] || !params[this.positionKey][1]))) {
    productionErrorTip && console.error('坐标错误！', params[this.positionKey], params)
    return false
  }
  const item = new AMap.Marker(params.options ? extend({}, options || this.options, params.options) : (options || this.options))
  item.setPosition(params[this.positionKey])
  params[this.iconKey] && item.setIcon(params[this.iconKey])
  params[this.contentKey] && item.setContent(params[this.contentKey])
  return item
}

class Marker extends Feature {
  options = markerOptions
  constructor(obj = {}) {
    super()
    this.contentKey = 'content'
    this.positionKey = 'position'
    this.iconKey = 'icon'
    this.init(obj)
    if (this.isClusterer) initClusterer.bind(this)()
    if (this.isRun) initRun.bind(this)()
  }
  newFeature = newFeature
}

export default Marker
