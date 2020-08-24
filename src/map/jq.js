import { map } from './base/map'
import { isLegalLngLat } from './base/compute'

let jq

export function initJq(){
  jq = new AMap.Marker({
    map: map
  })
  jq.on('click', function(){
    console.log(jq)
  })
}

export function setJq(center, data){
  if (!jq) initJq()
  let _center = center
  let isLegalLngLat = isLegalLngLat(_center)
  if (!isLegalLngLat) {
    _center = [0.000001, 0.000001]
  }
  jq.isLegalLngLat = isLegalLngLat
  jq.params = data
  jq.setMap(map)
  jq.setPosition(_center)
  return jq
}

// export function updatePosition (jqno, x, y , callback) {
//   $ajax("../../../kshServices/jqCaseAction/updateJqcasePoints",{jqno: jqno,shape: x +','+ y},function(msg){
//     setJq([x, y], jq.params)
//     callback && callback(msg)
//   });
// }

export function getJq(){
  return jq
}