import { productionErrorTip } from './config'
import { featureToDeg } from './compute'
/*
  Overlay Events
    事件名  说明  参数
    editor-open
    editor-close
*/

function bindClose(){
  this.editorClose()
}

function setEditorOpen(overlay){
  overlay.emit('editor-open')
  overlay._isEditorOpen = true
  overlay.setDraggable(true)
  overlay.on('del', bindClose)
}
function setEditorClose(overlay){
  overlay.emit('editor-close')
  delete overlay._isEditorOpen
  overlay.setDraggable(false)
  overlay.off('del', bindClose)
  overlay.params && featureToDeg(overlay, overlay.params)
}

export default function overlayEditor(overlay, options = {}) {
  return new Promise ((resolve, reject) => {
    // console.log(overlay.CLASS_NAME)
    var pluginName
    switch (overlay.CLASS_NAME) {
      case 'AMap.Marker':
        break;
      case 'AMap.Polyline':case 'AMap.Polygon':
        pluginName = 'PolyEditor'
        break;
      case 'AMap.Circle':
        pluginName = 'CircleEditor'
        break;
      case 'AMap.Rectangle':
        pluginName = 'RectangleEditor'
        break;
      case 'AMap.BezierCurve':
        pluginName = 'BezierCurveEditor'
        break;
      default:
        reject && reject(overlay)
        productionErrorTip && console.error('无法编辑的类型！', overlay.CLASS_NAME, overlay)
        return false
    }
    if(pluginName){
      let map = overlay.getMap()
      map && map.plugin(["AMap."+ pluginName], () => {
        overlay.editorOpen = function(){
          if (overlay._isEditorOpen) return
          setEditorOpen(overlay)
          overlay.editorFeature = new window.AMap[pluginName](map, overlay)
          overlay.editorFeature.open()
        }
        overlay.editorClose = function(){
          if (!overlay._isEditorOpen) return
          setEditorClose(overlay)
          overlay.editorFeature.close()
        }
        !options.unOpen && overlay.editorOpen && overlay.editorOpen()
        resolve && resolve(overlay)
      })
    } else {
      overlay.editorOpen = function(){
        if (overlay._isEditorOpen) return
        setEditorOpen(overlay)
      }
      overlay.editorClose = function(){
        if (!overlay._isEditorOpen) return
        setEditorClose(overlay)
      }
      !options.unOpen && overlay.editorOpen && overlay.editorOpen()
      resolve && resolve(overlay)
    }
  })
}