let map, contextMenu, infoWindow

function newMap (id, opt = {}, params = {}) {
  map = new AMap.Map(id, (opt || {})) // eslint-disable-line
  // !params.notContextMenu && (map.contextMenu = new AMap.ContextMenu()) // eslint-disable-line
  // !params.notInfoWindow && (map.infoWindow = new AMap.InfoWindow()) // eslint-disable-line
  return map
}

function setMap (_map) {
  map = _map
}

function getMap () {
  return map
}

function setInfoWindow (opt = {}, infoWindow) {
  const _infoWindow = infoWindow || getInfoWindow()
  for (let key in opt) {
    _infoWindow.set(key, opt[key])
  }
}

function getInfoWindow () {
  if(!infoWindow){
    infoWindow = new AMap.InfoWindow()
    infoWindow.on('close', () => infoWindow.feature = null)
  }
  return infoWindow
}

function getContextMenu () {
  if(!contextMenu){
    contextMenu = new AMap.ContextMenu()
  }
  return contextMenu
}

export { map, newMap, setMap, getMap, setInfoWindow, getInfoWindow, getContextMenu }
