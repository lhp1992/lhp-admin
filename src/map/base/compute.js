import { isArray } from './public'

function Area(p0, p1, p2){
  let area = 0.0;
  area = p0.lng * p1.lat + p1.lng * p2.lat + p2.lng * p0.lat - p1.lng * p0.lat - p2.lng * p1.lat - p0.lng * p2.lat;
  return area / 2;  
}

export function polygonAreaCenter (points) {
  let sum_x = 0,
    sum_y = 0,
    sum_area = 0,
    p1 = points[1];
  for (let i = 2; i < points.length; i++) {
    let p2 = points[i]
    let area = Area(points[0],p1,p2)
    sum_area += area
    sum_x += (points[0].lng + p1.lng + p2.lng) * area
    sum_y += (points[0].lat + p1.lat + p2.lat) * area
    p1 = p2
  }
  let xx = sum_x / sum_area / 3
  let yy = sum_y / sum_area / 3
  return [xx, yy]
}

export function getOverlayCenter (overlay) {
  let _center
  switch(overlay.CLASS_NAME){
    case 'AMap.Marker': case 'AMap.Text':
      _center = overlay.getPosition()
    break;
    case 'AMap.Polyline': case 'AMap.BezierCurve':
      _center = overlay.getPath()[0]
    break;
    case 'AMap.Polygon': case 'AMap.Rectangle':
      _center = polygonAreaCenter(overlay.getPath())
    break;
    case 'AMap.Circle':
      _center = overlay.getCenter()
    break;
  }
  return _center
}

export function featureToDeg (overlay, params = {}) {
  switch(overlay.CLASS_NAME){
    case 'AMap.Marker': case 'AMap.Text':
      params.position = overlay.getPosition().toString().split(',')
      break;
    case 'AMap.Polyline': case 'AMap.Polygon':
      var path = []
      var list = overlay.getPath().toString().split(',')
      for(var i = 0, len = list.length; i < len; i += 2) {
        path.push([list[i], list[i + 1]])
      }
      params.path = path
      break;
    case 'AMap.Rectangle':
      params.bounds = overlay.getBounds().toString().split(';').map(item => item.split(','))
      break;
    case 'AMap.Circle':
      params.center = overlay.getCenter().toString().split(',')
      break;
    case 'AMap.BezierCurve':
      var path = []
      var list = overlay.getPath()
      for(var i = 0, len = list.length; i < len; i++) {
        if(list[i].controlPoints && list[i].controlPoints[0]){
          path.push([list[i].controlPoints[0].lng, list[i].controlPoints[0].lat, list[i].lng, list[i].lat])
        } else {
          path.push([list[i].lng, list[0].lat])
        }
      }
      params.path = path
      break;
  }
}

export function getAngle (p1, p2){
  var ret
  var w1 = p1[1]/180 * Math.PI
  var j1 = p1[0]/180 * Math.PI

  var w2 = p2[1]/180 * Math.PI
  var j2 = p2[0]/180 * Math.PI

  ret = 4 * Math.pow(Math.sin((w1 - w2) / 2), 2) - Math.pow(Math.sin((j1 - j2) / 2) * (Math.cos(w1) - Math.cos(w2)), 2);
  ret = Math.sqrt(ret);

  // var temp = Math.sin(Math.abs(j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
  var temp = Math.sin((j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
  ret = ret/temp;

  ret = Math.atan(ret) / Math.PI * 180 ;
  ret += 90;

  // 这里用如此臃肿的if..else是为了判定追踪单个点的具体情况,从而调整ret的值
  if(j1-j2 < 0){
    // console.log('j1<j2')
    if(w1-w2 < 0){
      // console.log('w1<w2')
      ret;
    }else{
      // console.log('w1>w2')
      ret = -ret+180;
    }
  }else{
    // console.log('j1>j2')
    if(w1-w2 < 0){
      // console.log('w1<w2')
      ret = 180+ret;
    }else{
      // console.log('w1>w2')
      ret = -ret;
    }
  }
  return ret ;
}

export function isLegalLngLat (position) {
  const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
  const longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
  if (isArray(position) && position.length == 2 && longrg.test(position[0]) && latreg.test(position[1])) {
    return true
  } else {
    return false
  }
}