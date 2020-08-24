import { map } from './map'
import { productionErrorTip } from './config'
import BindEvents from './events'

const drivingSearch = function(start, end){
  this.driving.search(start, end, (status, result) => {
    if (status === 'complete') {
      this.emit('search', result)
    } else {
      productionErrorTip && console.error('获取驾车数据失败：' + result)
    }
  })
}

class Driving extends BindEvents {
  constructor(options = {}) {
    super()
    this.map = options.map
    !this.map && (this.map = map)
    if (!this.map) {
      console.error('错误的map！')
    }
    let _drivingOptions = options.options || {}
    _drivingOptions.map = this.map
    _drivingOptions.hideMarkers = true
    this.map.plugin(["AMap.Driving"], () => {
      this.startPoint = new AMap.Marker({
        icon: './static/start.png',
        draggable: true,
        zIndex: 102
      })
      this.endPoint = new AMap.Marker({
        icon: './static/end.png',
        draggable: true,
        zIndex: 102
      })
      this.driving = new AMap.Driving(_drivingOptions)
      this.startPoint.on('dragend', () => {
        drivingSearch.bind(this)(this.startPoint.getPosition(), this.endPoint.getPosition())
      })
      this.endPoint.on('dragend', () => {
        drivingSearch.bind(this)(this.startPoint.getPosition(), this.endPoint.getPosition())
      })
    })
  }
  search(start, end){
    this.startPoint.setPosition(start)
    this.endPoint.setPosition(end)
    this.startPoint.setMap(this.map)
    this.endPoint.setMap(this.map)
    drivingSearch.bind(this)(start, end)
  }
  clear(){
    this.driving.clear()
    this.startPoint.setMap(null)
    this.endPoint.setMap(null)
  }
}

export default Driving