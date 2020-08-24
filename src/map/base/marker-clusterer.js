import { extend, isArray } from './public'
// import Marker from './marker'

function bindEvents() {
  let fnAddedBatch = () => {}
  let fnDeledBatch = () => {}
  if (this.isClustererType) {
    this.clustererTypeKey = this.clustererTypeKey || 'clustererType'
    let clustererType = {}
    // 对feature根据type进行分类
    const classify = (targets) => {
      if (!isArray(targets)) targets = [targets]
      let _typeObject = {}
      targets.forEach(item => {
        const type = item.params[this.clustererTypeKey]
        if (type) {
          if (!_typeObject[type]) _typeObject[type] = []
          _typeObject[type].push(item)
        }
      })
      return _typeObject
    }
    // 根据type创建不同Clusterer类
    fnAddedBatch = (targets) => {
      const _typeObject = classify(targets)
      for (let key in _typeObject) {
        if (!clustererType[key]) {
          clustererType[key] = new AMap.MarkerClusterer(this.map, [], this.clustererOptions)
          if (this._isHide) clustererType[key].setMap(null)
        }
        if (!this._isHide && !clustererType[key]._isHide) {
          clustererType[key].addMarkers(_typeObject[key])
        }
      }
    }
    fnDeledBatch = (targets) => {
      const _typeObject = classify(targets)
      for (let key in _typeObject) {
        clustererType[key].removeMarkers(_typeObject[key])
      }
    }
    this.clustererType = clustererType
  } else {
    const markerClusterer = new AMap.MarkerClusterer(this.map, [], this.clustererOptions)
    fnAddedBatch = (targets) => {
      if (!isArray(targets)) targets = [targets]
      markerClusterer.addMarkers(targets)
    }
    fnDeledBatch = (targets) => {
      if (!isArray(targets)) targets = [targets]
      markerClusterer.removeMarkers(targets)
    }
    this.clusterer = markerClusterer
  }

  this.on('added-batch', fnAddedBatch)
  this.on('deled-batch', fnDeledBatch)
}
function bindMethods() {
  if(this.isClustererType){
    this.typeRemove = function(type){
      let clusterer = this.clustererType[type]
      if(clusterer){
        this.del(clusterer.getMarkers())
        clusterer.clearMarkers()
        clusterer.setMap()
      }
    }
    this.typeToggle = function(type){
      let clusterer = this.clustererType[type]
      if (!clusterer) return
      if (clusterer._isHide) {
        this.typeShow(type)
      } else {
        this.typeHide(type)
      }
    }
    this.typeHide = function(type){
      let clusterer = this.clustererType[type]
      if(!clusterer){
        this.clustererType[type] = new AMap.MarkerClusterer(this.map, [], this.clustererOptions)
        clusterer = this.clustererType[type]
      }
      this.clustererType[type]._isHide = true
      clusterer.setMap(null)
    }
    this.typeShow = function(type){
      let clusterer = this.clustererType[type]
      if(!clusterer){
        this.clustererType[type] = new AMap.MarkerClusterer(this.map, [], this.clustererOptions)
        clusterer = this.clustererType[type]
      }
      this.clustererType[type]._isHide = false
      if (this._isHide) {
        clusterer.setMap(null)
      } else {
        clusterer.setMap(this.map)
        const targets = this.filter(this.clustererTypeKey, type)
        clusterer.setMarkers(targets)
      }
    }
    this.allHide = function(){
      this._isHide = true
      for (let type in this.clustererType) {
        this.clustererType[type].setMap(null)
      }
    }
    this.allShow = function(){
      this._isHide = false
      for (let type in this.clustererType) {
        if (!this.clustererType[type]._isHide) this.typeShow(type)
      }
    }
  }
}

const clustererOptions = {}
export const initClusterer = function () {
  this.clustererOptions = extend({}, clustererOptions, this.clustererOptions || {})
  this.isSetMap = false

  this.map.plugin(["AMap.MarkerClusterer"], () => {
    bindEvents.bind(this)()
    bindMethods.bind(this)()
  })
}

// class MarkerClusterer extends Marker {
//   constructor(obj = {}, ...agr) {
//     super(obj, ...agr)
//     this.clustererOptions = extend({}, clustererOptions, this.clustererOptions || {})
//     this.isSetMap = false
//     this.map.plugin(["AMap.MarkerClusterer"], () => {
//       bindEvents.bind(this)()
//       bindMethods.bind(this)()
//     })
//   }
// }

// export default MarkerClusterer