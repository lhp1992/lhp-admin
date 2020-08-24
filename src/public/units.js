export function getOverlayOptions (type, center, parmas = {}) {
  const lngX = center[0]
  const latY = center[1]

  function getPoint(){
    let point = []
    point[0] = (lngX + (Math.random() * 2 - 1) * 0.01).toFixed(6)
    point[1] = (latY + (Math.random() * 2 - 1) * 0.01).toFixed(6)
    return point
  }
  switch(type){
    case 'marker':
      parmas.position = getPoint()
      break;
    case 'polygon':case 'polyline':
      let path = []
      for (let i = 0; i < 4; i++) {
        path.push(getPoint())
      }
      parmas.path = path
      break;
    case 'rectangle':
      parmas.bounds = [getPoint(), getPoint()]
      break;
    case 'circle':
      parmas.center = getPoint()
      parmas.radius = 500
      break;
  }
  return parmas
}