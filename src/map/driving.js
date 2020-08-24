import { map } from '../../base/map/map'
import Driving from '../../base/map/driving'

export function initDriving(){
  let driving = new Driving()
  driving.on('search', e => console.log(e))
  let center = map.getCenter()
  driving.search(center, center)
  // markers.run(getPointsData(center))
  setTimeout(() => driving.clear(), 5000)
}