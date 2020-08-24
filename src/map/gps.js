import { map } from '../../base/map/map'
import { getMarkers } from './icon'
import infoWindow from './infoWindow'
import { randomPoints } from '../index'

function getPointsData (center, number) {
  return randomPoints([center.lng, center.lat], number, (point, i) => ({
    type: Math.random() > 0.5 ? 1 : 2,
    position: point,
    id: i,
    src: './static/4_27.png',
  }))
}

export function initGps(){
  let markers = getMarkers()
  let center = map.getCenter()
  var data = getPointsData(center, 10)
  markers.add(data)

  // markers.allHide()
  // markers.typeHide(1)
  // setTimeout(() => markers.allShow(), 3000)
  // setTimeout(() => markers.typeShow(1), 5000)

  markers.run(getPointsData(center, 10))

  setInterval(() => markers.run(getPointsData(center, 10)), 10000)
  setTimeout(() => markers.startTrack(1), 3000)
  setTimeout(() => markers.clearTrack(), 50000)

  // console.log(markers)
  // markers.run(getPointsData(center))
}