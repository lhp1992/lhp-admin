import { productionErrorTip } from './config'
import * as military from './overlay-customized-military'

const list = [
  military.flag,
  military.arrow
]

const drawCustoms = {}
const editorWindowCustoms = {}
const groupCustoms = {}

list.forEach(item => {
  var name = item.name
  if (name) {
    if (item.drawCustom) drawCustoms[name] = item.drawCustom
    if (item.editorWindow) editorWindowCustoms[name] = item.editorWindow
    if (item.newFeature) groupCustoms[name] = item.newFeature
  }
})

export { drawCustoms, editorWindowCustoms, groupCustoms }
