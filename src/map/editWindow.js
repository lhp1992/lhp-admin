import { map } from './base/map'
// import Marker from './base/marker'
// import Marker from './base/overlay-group'
import { initIconText } from './base/marker-icon-text'
import overlayEditor from './base/overlay-editor'
// import * as overlayEditorWindow from './base/overlay-editor-window'
import overlayEditorWindow from './base/overlay-editor-window'
import { bindCircleSearch } from './base/circle'

let markers

function randomPoints (center, n, cb) {
  const lngX = center[0]
  const latY = center[1]
  let arr = []
  for (let i = 1; i < (n + 1); i++) {
    let point = []
    point[0] = (lngX + (Math.random() * 2 - 1) * 0.01).toFixed(6)
    point[1] = (latY + (Math.random() * 2 - 1) * 0.01).toFixed(6)
    arr.push(cb(point, i))
  }
  return arr
}
function getPointsData (center, number) {
  return randomPoints([center.lng, center.lat], number, (point, i) => ({
    clustererType: i > 5 ? 1 : 2,
    groupType: 'military.flag',
    position: point,
    id: i
  }))
}

export function init(){
  let center = map.getCenter()

  var overlayGroup = new overlayEditorWindow({
    options: {
      // isEditor: true,
      // isEditorOpen: true,
      // defaults: {
      //   'all': {
      //     strokeColor: "#ff0000",
      //     fillColor: "#ff0000",
      //   },
      //   'polygon.aa': {
      //     strokeColor: "#ffff00",
      //     fillColor: "#ffff00",
      //     strokeStyle: 'dashed'
      //   }
      // },
      getCustomsFeature: function(type, params){
        switch(type){
          // case '111polygon.aa':
          case (type.match(/^111polygon./) || {}).input:
            return options => {console.log(options); return new AMap.Polyline(options)}
        }
      }
    },
    customs: {
      'AMap.Marker': ['name', {
        type: 'select',
        key: 'animate',
        content: '动画',
        options: [
          'bounce',
          'flash',
          'pulse',
          'rubberBand',
          'shake',
          'swing',
          'tada',
          'wobble'
        ],
        callback: function(overlay, value){
          console.log(overlay)
          console.log(value)
          // overlay.setOptions({
          //   strokeStyle: value
          // })
        }
      }],
      // 'marker': [{
      //   type: 'text',
      //   key: 'name',
      //   content: '名称'
      // }],
      // 'polygon.aa': ['color']
    }
  })
  overlayGroup.on('drawed', (feature, currentOptions, closeFnc) => {
    console.log(feature)
    console.log(currentOptions)
    // if (currentOptions.groupType != 'marker') closeFnc(true)
    closeFnc(true)
  })
  overlayGroup.on('add', (e) => {
    // if(e.groupType == 'marker') e.position = center
  })

  var polyline = overlayGroup.add({
    path: randomPoints([center.lng, center.lat], 3, (point, i) => point),
    groupType: 'polygon'
  })

  var polygon2 = overlayGroup.add({
    path: randomPoints([center.lng, center.lat], 3, (point, i) => point),
    groupType: '111polygon.aa'
  })

  let circle = overlayGroup.add({
    groupType: 'circle',
    center: center,
    radius: 500
  })

  // let circle = new AMap.Circle({
  //   center: center,
  //   radius: 500,
  //   map: map
  // })

  bindCircleSearch(circle, (...arg) => console.log(arg))
  bindCircleSearch(circle, (...arg) => console.log(1234))
  setTimeout(() => circle.unBindCircleSearch(), 3000)


  // setTimeout(() => console.log(overlayGroup.editorWindow.submit()), 10000)
  // setTimeout(() => overlayGroup.editorWindow.open(polygon), 500)
  // setTimeout(() => console.log(overlayGroup.data), 5000)

  // overlayGroup.draw('polygon.aa', {
  //   options: {
  //     strokeColor: "#ffff00",
  //     fillColor: "#ffff00",
  //     strokeStyle: 'dashed'
  //   }
  // })

  // overlayGroup.draw('military.arrow')

  // setTimeout(() => overlayGroup.draw('marker'), 5000)

  // markers = new Marker({
  //   // isClustererType: true,
  //   isEditor: true,
  //   isEditorOpen: true,
  //   // isEditorOnly: true,
  //   // isClusterer: true,
  //   // isRun: true
  // })

  // let center = map.getCenter()
  // let data = getPointsData(center, 10)
  // // markers.add(data)

  // let polyline = new AMap.Polygon({
  //   path: randomPoints([center.lng, center.lat], 3, (point, i) => point),
  //   map: map
  // })
  // overlayEditor(polyline)

  // polyline.on('click', function(){
  //   editorWindow.open(polyline, {
  //     // color: '#888'
  //   }, [
  //     'color','fillColor','strokeColor',
  //     {
  //       type: 'color',
  //       key: 'cColor'
  //     }, {
  //       type: 'customize',
  //       key: 'name',
  //       getDom: function(data){
  //         console.log(data)
  //         let $dom = $('<button>提交</button>')
  //         $dom.click(() => {
  //           console.log(editorWindow.submit(polyline))
  //         })
  //         return $dom
  //       }
  //     }
  //   ])
  // })


  // let circle = new AMap.Circle({
  //   center: center,
  //   radius: 500,
  //   map: map
  // })
  // overlayEditor(circle)

  // let rectangle = new AMap.Rectangle({
  //   bounds: new AMap.Bounds([center.lng, center.lat], [center.lng + 0.01, center.lat + 0.01]),
  //   map: map
  // })
  // overlayEditor(rectangle)
}