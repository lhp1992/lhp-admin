import { extend, isArray } from './public'
import Feature from './feature'
import { newFeature as marker } from './marker'
import { newFeature as polygon } from './polygon'
import { newFeature as polyline } from './polyline'
import { newFeature as circle } from './circle'
import { newFeature as rectangle } from './rectangle'
import { groupCustoms } from './overlay-customized'
import { productionErrorTip, confit as defaults } from './config.js'
import { featureToDeg } from './compute'

/*
  OverlayEditorWindow Options
    参数  说明  类型  可选值  默认值
    groupTypeKey  —  string  —  groupType
    defaults  overlay初始化options列表(all: 应用于所有类型)  object{all: {}, ...}  —  —
    getCustomsFeature  自定义未知类型overlay初始化对象  function(type, params){return newFeature: overlay初始化函数}  —  —
*/

class OverlayGroup extends Feature {
	defaults = extend(true, {}, defaults)
  _newFeatureCustoms = groupCustoms
  constructor(obj = {}) {
    super()
    this.contentKey = 'content'
    this.positionKey = 'position'
    this.centerKey = 'center'
    this.radiusKey = 'radius'
    this.pathKey = 'path'
    this.groupTypeKey = 'groupType'
    this.textKey = 'text'
    this.boundsKey = 'bounds'
    obj.defaults = extend(this.defaults, obj.defaults || {})
    this.init(obj)
    let _all = this.defaults['all'] || {}
    for (let key in this.defaults) {
      this.defaults[key] = extend({}, _all, this.defaults[key])
    }
    if (this.customs) {
      this.customs.forEach((custom) => {
        if (custom.name) {
          if (custom.newFeature) this._newFeatureCustoms[custom.name] = custom.newFeature
        } else {
          productionErrorTip && console.error('错误的custom自定义类型！', custom.name, custom)
        }
      })
    }
    this.on('getParams', (features) => {
      return features.map(overlay => {
        overlay.params && featureToDeg(overlay, overlay.params)
        return overlay.params
      })
    })
  }
  newFeature(params = {}) {
    const _newFeature = this.getNewFeatureObj(params)
    if (_newFeature) {
      return _newFeature.bind(this)(params, this.defaults[params[this.groupTypeKey]] || this.defaults['all'] || {})
    } else {
      productionErrorTip && console.error('错误的OverlayGroup自定义类型！', params[this.groupTypeKey], params)
    }
  }
  getNewFeatureObj(params) {
    const type = params[this.groupTypeKey]
    if(!type) return
    switch (type) {
      case 'marker': case (type.match(/^marker./) || {}).input:
        return marker
      case 'polygon': case (type.match(/^polygon./) || {}).input:
        return polygon
      case 'polyline': case (type.match(/^polyline./) || {}).input:
        return polyline
      case 'circle': case (type.match(/^circle./) || {}).input:
        return circle
      case 'text': case (type.match(/^text./) || {}).input:
        return text
      case 'rectangle': case (type.match(/^rectangle./) || {}).input:
        return rectangle
      // case 'military.flag':
      //   return military.flag
      // case 'military.arrow':
      //   return military.arrow
      default:
        if (this._newFeatureCustoms[type]) {
          return this._newFeatureCustoms[type]
        } else {
          return this.getCustomsFeature && this.getCustomsFeature(type, params)
        }
    }
  }
  getParams(features){
    let _features = features || this.data
    if (!isArray(features)) _features = [features]
    this.emit('getParams', _features)
  }
}

export default OverlayGroup