import { extend } from './public'
import OverlayGroup from './overlay-group'
import { featureToDeg } from './compute'
import { productionErrorTip } from './config'
import { drawCustoms } from './overlay-customized'

/*
  OverlayDraw Events
    事件名  说明  参数
    drawed  绘制覆盖物结束时触发事件（已添加进group）  feature, params, closeFnc
*/

/*
  OverlayDraw Options
    参数  说明  类型  可选值  默认值
    drawCustoms  自定义类型，mousetool绘制方法名规则列表  object{type: (string: methodName(mousetool方法名[marker,'polygon','polyline','circle','rectangle'...]), object: {methodName, getOption: function(overlay){return option}})}  —  —
*/

const getDrawMethod = function (type) {
  if(!type) return
  switch (type) {
    case 'marker': case (type.match(/^marker./) || {}).input:case 'text': case (type.match(/^text./) || {}).input:
      return 'marker'
    case 'polygon': case (type.match(/^polygon./) || {}).input:
      return 'polygon'
    case 'polyline': case (type.match(/^polyline./) || {}).input:
      return 'polyline'
    case 'circle': case (type.match(/^circle./) || {}).input:
      return 'circle'
    case 'rectangle': case (type.match(/^rectangle./) || {}).input:
      return 'rectangle'
    case 'military.flag':
      return 'marker'
    case 'military.arrow':
      return 'polygon'
  }
}

const drawFeatureToOptions = function (currentMethodName, item) {
  if(!currentMethodName) return
  let option = {}
  switch (currentMethodName) {
    case 'marker':
      option[this.positionKey] = item.getPosition()
      break
    case 'polygon':case 'polyline':
      option[this.pathKey] = item.getPath()
      break
    case 'circle':
      option[this.centerKey] = item.getCenter()
      option[this.radiusKey] = item.getRadius()
      break
    case 'rectangle':
      option[this.boundsKey] = item.getBounds()
      break
  }
  return option
}

class OverlayDraw extends OverlayGroup {
  _drawCustoms = drawCustoms
  isClear = true
  constructor (options = {}) {
    super(options)
    if (this.customs) {
      this.customs.forEach((custom) => {
        if (custom.name) {
          if (custom.drawCustom) this._drawCustoms[custom.name] = custom.drawCustom
        } else {
          productionErrorTip && console.error('错误的custom自定义类型！', custom.name, custom)
        }
      })
    }
    extend(true, this._drawCustoms, options.drawCustoms)
    this.map.plugin(["AMap.MouseTool"],() => { 
      this.mousetool = new AMap.MouseTool(this.map)
      this.mousetool.on('draw', (e) => {
        let params = this.currentparams
        let _option = drawFeatureToOptions.bind(this)(this.currentMethodName, e.obj) || {}
        let _custom = this._drawCustoms[this.currentKey]
        if (_custom && _custom.getOption) _option = _custom.getOption(this, e.obj)
        extend(params, _option)
        // featureToDeg(e.obj, params)
        params[this.groupTypeKey] = this.currentKey
        const feature = this.add(params)
        e.obj.setMap(null)
        this.emit('drawed', feature, params, (isClear) => this.mousetool.close(isClear))
      })
      this.on('remove', () => {
        this.mousetool.close(true)
      })
    });
  }
  draw (key, params = {}) {
    let _methodName
    if (this._drawCustoms[key]) {
      _methodName = this._drawCustoms[key].methodName || this._drawCustoms[key]
    } else {
      _methodName = getDrawMethod(key)
    }
    if (!_methodName) {
      productionErrorTip && console.error('错误的方法名！', key, _methodName, this._drawCustoms)
      return
    }
    this.mousetool.close(this.isClear)
    this.currentKey = key
    this.currentparams = params
    this.currentMethodName = _methodName
    this.mousetool[_methodName](extend({
      strokeOpacity: 0.9,
      fillOpacity: 0.9
    }, this.defaults[key] || this.defaults['all'] || {}, params.options || {}))
  }
  drawClose (isClear) {
    this.mousetool.close(isClear)
  }
}

export default OverlayDraw
