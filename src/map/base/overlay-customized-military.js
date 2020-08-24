import { extend, isArray } from './public.js'
import { getAngle } from './compute.js'
import { productionErrorTip } from './config'

const flag = {
  name: 'military.flag',
  newFeature (params = {}, options) {
    if (!params[this.positionKey] || (isArray(params[this.positionKey]) && (!params[this.positionKey][0] || !params[this.positionKey][1]))) {
      productionErrorTip && console.error('坐标错误！', params[this.positionKey], params)
      return false
    }
    const item = new AMap.Marker(params.options ? extend({}, options || this.options, params.options) : (options || this.options))
    item.flagColor = params.flagColor || '#1791fc'
    item.flagSize = params.flagSize || 32
    function setFlag(color, size){
      let _width = size || 32
      let _height = size || 32
      // item.setContent('<svg t="1558940895346" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10221" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+ _width +'" height="'+ _height +'"><defs><style type="text/css"></style></defs><path fill="'+ color +'" d="M230.4 215.7c0 22.2-9.8 39.2-29.6 50.9v586.1c0 4-1.5 7.5-4.4 10.4-2.9 2.9-6.4 4.4-10.4 4.4h-29.6c-4 0-7.5-1.5-10.4-4.4-2.9-2.9-4.4-6.4-4.4-10.4V266.6c-19.8-11.7-29.6-28.7-29.6-50.9 0-16.4 5.7-30.3 17.3-41.9 11.6-11.6 25.5-17.3 41.9-17.3s30.3 5.7 41.9 17.3c11.6 11.6 17.3 25.5 17.3 41.9zM912 245.4v353.3c0 7.7-1.9 13.6-5.7 17.8-3.9 4.2-9.9 8.4-18.3 12.8-66.5 35.8-123.3 53.7-170.9 53.7-18.8 0-37.9-3.4-57.2-10.2-19.3-6.8-36-14.2-50.2-22.2-14.2-8-32-15.4-53.5-22.2-21.4-6.8-43.4-10.2-66-10.2-59.3 0-130.9 22.5-214.8 67.6-5.3 2.8-10.3 4.2-15.3 4.2-8 0-15-2.9-20.8-8.8-5.8-5.8-8.8-12.9-8.8-20.8V316.7c0-9.8 4.8-18.4 14.3-25.5 6.5-4.3 18.7-10.9 36.6-19.9 72.8-37 137.8-55.6 195-55.6 33 0 63.9 4.5 92.6 13.4 28.7 9 62.5 22.5 101.4 40.7 11.7 5.8 25.3 8.8 40.7 8.8 16.7 0 34.8-3.2 54.4-9.7 19.6-6.5 36.6-13.7 50.9-21.7 14.3-8 27.9-15.3 40.7-21.7 12.8-6.5 21.2-9.7 25.2-9.7 8 0 15 2.9 20.8 8.8 6 5.8 8.9 12.7 8.9 20.8z" p-id="10222"></path></svg>')
      // item.setContent('<svg t="1575363956137" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2647" width="'+ size +'" height="'+ size +'"><path d="M633.3 155.8s39.4-181.4-378.1-13.1V582S668.3 372.2 618 595.2c0 0 244.7-76.6 292.8-65.5V96.8c0.1 0-209.7 24-277.5 59zM166.7 64c-29.6 0-53.5 23.9-53.5 53.5v789c0 29.6 23.9 53.5 53.5 53.5s53.6-23.9 53.6-53.5v-789c0-29.6-24-53.5-53.6-53.5z" p-id="2648" fill="'+ color +'"></path></svg>')
      item.setContent('<svg t="1575364126035" class="icon" viewBox="0 0 1024 1024" width="'+ size +'" height="'+ size +'"><path d="M995.555556 170.666667H654.222222V28.444444a28.444444 28.444444 0 0 0-28.444444-28.444444H28.444444a28.444444 28.444444 0 0 0-28.444444 28.444444v967.111112a28.444444 28.444444 0 0 0 28.444444 28.444444h56.888889a28.444444 28.444444 0 0 0 28.444445-28.444444V568.888889h341.333333v142.222222a28.444444 28.444444 0 0 0 28.444445 28.444445h512a28.444444 28.444444 0 0 0 28.444444-28.444445V199.111111a28.444444 28.444444 0 0 0-28.444444-28.444444z" p-id="2971" fill="'+ color +'"></path></svg>')
      item.setOffset({
        x: 0,
        y: - size
      })
    }
    item.setFlagColor = function(color){
      this.flagColor = color
      setFlag(color, this.flagSize)
    }
    item.setFlagSize = function(size){
      this.flagSize = size
      setFlag(this.flagColor, size)
    }
    item.setFlagColor(item.flagColor)
    item.setPosition(params[this.positionKey])
    return item
  },
  editorWindow: [
    {
      type: 'color',
      key: 'flagColor',
      content: '颜色',
      callback: function(overlay, color){
        overlay.setFlagColor(color)
      }
    }, {
      type: 'range',
      key: 'flagSize',
      content: '大小',
      value: 32,
      max: 100,
      min: 20,
      callback: function(overlay, value){
        overlay.setFlagSize(value)
      }
    },
  ]
}

const arrow = {
  name: 'military.arrow',
  newFeature (params = {}, options) {
    var self = this
    if (!params[this.pathKey]) {
      return false
    }
    const item = new AMap.BezierCurve(extend({}, options || this.options, (params.options || {}), {map: this.map, path: params[this.pathKey]}))
    
    var marker = new AMap.Marker({
      map: this.map,
      zIndex: 50,
    })
    // this.data.push(marker)

    function renderMarker(color, size){
      var size = size
      if(!size || size < 10){
        size = 10
      }
      size = size * 2
      marker.setContent('<svg t="1558935638026" class="icon" style="" viewBox="0 0 1024 1024" width="'+ size +'" height="'+ size +'"><path d="M836.510807 434.657683C656.703466 297.433771 476.896125 160.20986 297.110458 22.964274 233.074559-25.888544 140.812869 19.758235 140.812869 100.306592v823.38501c0 80.548357 92.26169 126.196941 156.297589 77.322449 179.785667-137.225717 359.593008-274.447822 539.400349-411.691602 51.01125-38.933061 51.01125-115.711837 0-154.664766z" fill="'+ color +'"></path></svg>')
      marker.setOffset({
        x: - size / 4,
        y: - size / 2
      })
    }
    function onChange(){
      var path = item.getPath()
      var end = path[path.length - 1]
      if(end.controlPoints && end.controlPoints[0]) {
        marker.setAngle(90 + getAngle([end.lng, end.lat], [end.controlPoints[0].lng, end.controlPoints[0].lat]))
      }
      marker.setPosition(end)
    }
    item.setArrowColor = function(color){
      var opt = this.getOptions()
      renderMarker(color, opt.strokeWeight)
    }
    item.setArrowSize = function(size){
      var opt = this.getOptions()
      renderMarker(opt.strokeColor, size)
    }
    var opt = item.getOptions()
    renderMarker(opt.strokeColor, opt.strokeWeight)
    onChange()
    item.on('change', onChange)
    item.on('del', function () {
      marker.setMap(null)
    })
    return item
  },
  drawCustom: {
    methodName: 'rectangle',
    getOption (overlayGroup, overlay) {
      var path = overlay.getBounds().toString().split(';').map(function(item){
        return item.split(',')
      })
      path[1].unshift(path[1][1])
      path[1].unshift(path[0][0])
      let option = {
        options: {
          strokeWeight: 10,
          strokeOpacity: 1
        }
      }
      option[overlayGroup.pathKey] = path
      return option
    }
  },
  editorWindow: [
    {
      isOptions: true,
      type: 'color',
      key: 'strokeColor',
      name: 'military.arrow.strokeColor',
      content: '线条颜色',
      callback: function(overlay, color){
        overlay.setArrowColor(color)
        overlay.setOptions({
          strokeColor: color
        })
      }
    }, {
      isOptions: true,
      type: 'range',
      key: 'strokeWeight',
      content: '线条宽度',
      max: 20,
      min: 1,
      name: 'military.arrow.strokeWeight',
      callback: function(overlay, value){
        overlay.setArrowSize(value)
        overlay.setOptions({
          strokeWeight: value
        })
      }
    },
  ]
}

export { flag, arrow }
