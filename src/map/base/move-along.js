import { extend } from './public.js'
import { map } from './map.js'
import BindEvents from './events'

class MoveAlong extends BindEvents {
  data = []
  speed = 20
  markerOptions = {
    autoRotation: true,
    // icon: '../../images/icon1/ico3.png',
    // offset: new AMap.Pixel(-14, -17),
    zIndex: 1
  }
  polylineOptions = {
    strokeStyle: 'dashed',
    strokeColor: '#f00000',
    strokeWeight: 3,
    zIndex: 1
  }
  index = 0
  length = 0
  ifMove = false
  autoCenter = true
  sPosition = []
  timeKey = 'time'
  shapeKey = 'shape'
  map = map
  maxSpeed = 5000
  constructor (obj = {}) {
    super()
    this.marker = new AMap.Marker(extend({}, this.markerOptions, obj.markerOptions || {}))
    this.polyline = new AMap.Polyline(extend({}, this.polylineOptions, obj.polylineOptions || {}))
    this.passedPolyline = new AMap.Polyline(extend({}, this.polylineOptions, obj.polylineOptions || {}))

    this.marker.on('moving', (e) => {
      this.passedPolyline.setPath([this.sPosition, e.passedPath[1]])
      if (this.autoCenter) {
        this.map.setCenter(e.passedPath[1])
      }
    })

    this.marker.on('moveend', (e) => {
      this.index++
      this.start(this.index)
    })
  }
  deepCopy (data) {
    var _data
    try {
      _data = JSON.parse(JSON.stringify(data))
    } catch (e) {
      _data = data
    }
    return _data
  }
  load (_data = []) {
    this.close()
    this.data = this.deepCopy(_data)
    var data = this.data
    this.length = this.data.length - 1
    this.index = 0

    data[0].position = data[0][this.shapeKey].split(',')
    data[0].timetamp = new Date(data[0][this.timeKey])
    for (var i = 1, len = data.length; i < len; i ++) {
      data[i].timetamp = new Date(data[i][this.timeKey])
      data[i].position = data[i][this.shapeKey].split(',')
      if (data[i - 1][this.shapeKey] != data[i][this.shapeKey]) {
        var startT = data[i - 1].timetamp
        var endT = data[i].timetamp
        var num = AMap.GeometryUtil.distance(data[i - 1].position, data[i].position)
        var t = endT - startT
        data[i - 1].speed = Math.ceil(num * 3600 / t)
      }
    }

    this.polyline.setPath([])
    this.passedPolyline.setPath([])

    this.map.setCenter(this.data[0].position)
    this.map.setZoom(18);
    this.start()

    this.marker.setMap(this.map)
    this.polyline.setMap(this.map)
    this.passedPolyline.setMap(this.map)
  }
  close () {
    clearTimeout(this.timeOut)
    this.ifMove = false
    if (this.marker && this.polyline && this.passedPolyline) {
      this.marker.stopMove()
      this.marker.setMap(null)
      this.passedPolyline.setMap(null)
      this.polyline.setMap(null)
    }
  }
  start (index) {
    clearTimeout(this.timeOut)
    var index = index || 0
    this.index = index
    this.emit('updatePer', index)
    if (this.marker) this.marker.stopMove()
    if (this.passedPolyline) this.passedPolyline.setPath([])
    var start = this.data[index]
    this.sPosition = start.position
    var path = this.getPath(index)
    if (path.length > 1) {
      this.polyline.setPath(path)
    }
    this.marker.setPosition(start.position)
    this.map.setCenter(start.position)
    var end = this.data[index + 1]
    if (!end) {
      // console.log('播放完毕！')
      return false
    }
    this.ifMove = true
    if (!start.speed) {
      var _this = this
      this.timeOut = setTimeout(() => {
        this.index++
        this.start(this.index)
      }, (end.timetamp - start.timetamp) / this.speed)
      return false
    }

    var _speed = start.speed * this.speed
    if(_speed > this.maxSpeed){
      _speed = this.maxSpeed
    }
    this.marker.moveTo(end.position, _speed)

  }
  getPath (index) {
    return this.data.slice(0, index + 1).map(e => e.position)
  }
  pause () {
    if (!this.ifMove) {
      return false
    }
    clearTimeout(this.timeOut)
    this.marker.pauseMove()
    this.ifMove = false
  }
  play () {
    if(this.ifMove){
      return false
    }
    if(this.index){
      if(this.data[this.index].speed){
        this.marker.resumeMove()
      } else {
        this.start(this.index)
      }
    } else {
      this.start(0)
    }
    this.ifMove = true
  }
}
var moveAlong = {
  data: [],
  timeOut: null,
  speed: 20,
  sPosition: [],
  ifMove: false,
  autoCenter: false,
  per: 0,
  length: 0,
  markerOptions: {
    autoRotation: true,
    icon: '../../images/icon1/ico3.png',
    offset: new AMap.Pixel(-14, -17),
    zIndex: 1
  },
  polylineOptions: {
    strokeStyle: 'dashed',
    strokeColor: '#f00000',
    strokeWeight: 3,
    zIndex: 1
  }
}

moveAlong.init = function(data, obj = {}){
  if(this.marker || this.polyline || this.passedPolyline){
    this.remove()
  }
  this.data = data
  this.length = this.data.length - 1
  this.index = 0
  this.updatePer()
  this.ifMove = false
  data[0].position = data[0][this.shapeKey].split(',')
  data[0].timetamp = new Date(data[0].time)
  for(var i = 1, len = data.length; i < len; i ++){
    data[i].timetamp = new Date(data[i].time)
    if(data[i-1][this.shapeKey] != data[i][this.shapeKey]){
      var startT = data[i-1].timetamp
      var endT = data[i].timetamp
      data[i].position = data[i][this.shapeKey].split(',')
      data[i-1].position = data[i-1][this.shapeKey].split(',')
      var num = AMap.GeometryUtil.distance(data[i-1][this.shapeKey].split(','), data[i][this.shapeKey].split(','))
      var t = endT - startT
      data[i-1].speed = Math.ceil(num * 3600 / t)
    }
  }
  this.marker = new AMap.Marker(extend({}, this.markerOptions, obj.markerOptions || {}, {
    map: map,
    position: this.data[0].position,
  }))
  this.polyline = new AMap.Polyline(extend({}, this.polylineOptions, obj.polylineOptions || {}, {
    map: map,
    path: [[0.000001, 0.000001], [0.000002, 0.000002]],
  }))
  this.passedPolyline = new AMap.Polyline(extend({}, this.polylineOptions, obj.polylineOptions || {}, {
    map: map,
    path: [[0.000001, 0.000001], [0.000002, 0.000002]],
  }))
  var _this = this
  this.marker.on('moving', function(e){
    _this.passedPolyline.setPath([_this.sPosition, e.passedPath[1]])
    if(_this.autoCenter){
      map.setCenter(e.passedPath[1])
    }
  })
  this.marker.on('moveend', function(e){
    _this.index++
    _this.start(_this.index)
    _this.updatePer()
  })
  map.setCenter(this.data[0].position)
  map.setZoom(18);
}
moveAlong.getPath = function(index){
  var path = []
  path.push(this.data[0].position)
  for(var i = 0; i < index; i++){
    if(this.data[i].speed) {
      path.push(this.data[i+1].position)
    }
  }
  return path
}
moveAlong.updatePer = function(){
  this.per = Math.ceil((this.index) / this.length * 100)
  this.onUpdatePer && this.onUpdatePer(this.per)
}
moveAlong.start = function(index){
  clearTimeout(this.timeOut)
  var index = index || 0
  this.index = index
  this.updatePer()
  if(this.marker){
    this.marker.stopMove()
  }
  var end = this.data[index + 1]
  if(!end){
    // console.log('播放完毕！')
    return false
  }
  var start = this.data[index]
  if(!start.speed){
    var _this = this
    this.timeOut = setTimeout(function(){
      _this.index++
      _this.start(_this.index)
    }, (end.timetamp - start.timetamp)/this.speed)
    return false
  }
  this.sPosition = start.position
  var path = this.getPath(index)
  if(path.length > 1){
    this.polyline.setPath(path)
  }

  this.marker.setPosition(start.position)
  var _speed = start.speed * this.speed
  if(_speed > 5000){
    _speed = 5000
  }
  this.marker.moveTo(end.position, _speed)
  this.ifMove = true
}
moveAlong.pause = function(){
  if(!this.ifMove){
    return false
  }
  clearTimeout(this.timeOut)
  this.marker.pauseMove()
  this.ifMove = false
}
moveAlong.play = function(){
  if(this.ifMove){
    return false
  }
  if(this.index){
    if(this.data[this.index].speed){
      this.marker.resumeMove()
    } else {
      this.start(this.index)
    }
  } else {
    this.start(0)
  }
  this.ifMove = true
}
moveAlong.setSpeed = function(n){
  this.speed = parseInt(n)
}
moveAlong.remove = function(){
  clearTimeout(this.timeOut)
  if(this.marker && this.polyline && this.passedPolyline){
    this.marker.stopMove()
    this.marker.setMap(null)
    this.passedPolyline.setMap(null)
    this.polyline.setMap(null)
  }
  this.marker = null
  
  this.polyline = null
  
  this.passedPolyline = null
}
moveAlong.setPer = function(per){
  if(!this.data || this.data.length < 2){
    return false
  }
  this.pause()
  this.per = per
  this.index = Math.ceil(this.length * per / 100)
  this.marker.resumeMove()
  var path = this.getPath(this.index)
  this.polyline.setPath(path)
  this.marker.setPosition(path[path.length - 1])
  this.passedPolyline.setPath([[116.397428, 39.90923], [116.397429, 39.90924]])
  map.setCenter(path[path.length - 1])
  this.start(this.index)
  this.ifMove = true
}

export default MoveAlong
