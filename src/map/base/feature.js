import { map, getContextMenu } from './map'
import { extend, isArray } from './public'
import BindEvents from './events'
import overlayEditor from './overlay-editor'

/*
  Feature Events
    事件名  说明  参数
    add  新增feature开始时的回调触发事件  params
    added  新增feature成功时的回调触发事件  feature
    added-batch  批量新增feature成功时的回调触发事件  features
    del  删除feature开始时的回调触发事件  feature
    deled-batch  批量删除feature开始时的回调触发事件  features
    click  单击feature时触发事件  feature params
*/

/*
  Overlay Events
    事件名  说明  参数
    del  删除overlay开始时的回调触发事件  overlay
*/

/*
  Feature Options
    参数  说明  类型  可选值  默认值
    isSetMap  新增feature自动setMap  boolean  —  false
    idKey  —  string  —  id
    map  —  —  —  —
    click  overlay点击事件  function(overlay, params){}  —  —
    isEditor  overlay是否可编辑  boolean  —  false
    isEditorOnly  overlay是否唯一可编辑  boolean  —  false
    isEditorOpen  overlay是否自动open编辑状态  boolean  —  false
*/

function addItem (params) {
  // const _params = extend(true, {}, params)
  this.emit('add', params)
  const item = this.newFeature(params)
  if (!item) {
    return false
  }
  // item.params = _params
  item.params = params
  if(!item.del) item.del = () => {
    this.del.bind(this)(item)
  }
  if (this._events['click']) {
    item.on('click', () => {
      this.emit('click', item, item.params)
    })
    item.click = () => {
      this.emit('click', item, item.params)
    }
  }
  if (params[this.idKey]) this.idObject[params[this.idKey]] = item
  this.isSetMap && this.map.add(item)
  this.data.push(item)
  this.emit('added', item)
  return item
}

function delItem (item) {
  this.emit('del', item)
  item.emit('del')
  const idx = this.data.indexOf(item)
  if (idx !== -1) {
    const id = item.params[this.idKey]
    if (id) delete this.idObject[id]
    this.data.splice(idx, 1)
  }
}

function initEditor () {
  if (this.isEditor) {
    if (this.isEditorOnly) {
      this.on('added', overlay => {
        overlay.on('editor-open', () => {
          if (this.editorOverlay) {
            this.editorOverlay.editorClose()
          }
          this.editorOverlay = overlay
        })
        overlay.on('editor-close', () => {
          if (this.editorOverlay === overlay) {
            this.editorOverlay = null
          }
        })
      })
    }
    this.isEditorOpen ? this.on('added', overlay => overlayEditor(overlay)) : this.on('added', overlay => overlayEditor(overlay, {unOpen: true}))
  }
}

class Feature extends BindEvents {
  init (obj = {}) {
    this.isSetMap = true
    this.idKey = 'id'
    for (const key in obj) {
      this[key] = obj[key]
    }
    // this.events = {}
    !this.map && (this.map = map)
    if (!this.map) {
      console.error('错误的map！')
    }
    this.data = []
    this.idObject = {}

    initEditor.bind(this)()
    // this.emit('inited')
  }
  add (data) {
    let target
    if (!isArray(data)) {
      target = addItem.bind(this)(data)
      this.emit('added-batch', [target])
    } else {
      target = data.map(item => addItem.bind(this)(item))
      this.emit('added-batch', target)
    }
    return target
  }
  remove () {
    this.emit('remove')
    this.data.forEach(item => {
      this.emit('del', item)
      item.emit('del')
    })
    this.emit('deled-batch', this.data)
    this.map.remove(this.data)
    this.data.length = 0
    this.idObject = {}
  }
  del (data) {
    if (!data) return
    if (!isArray(data)) data = [data]
    data.forEach(item => delItem.bind(this)(item))
    this.map.remove(data)
    this.emit('deled-batch', data)
  }
  delById (ids) {
    if (!isArray(ids)) ids = [ids]
    this.del(ids.map(id => this.idObject[id]).filter(obj => obj))
  }
  getById (ids) {
    if (!isArray(ids)) {
      return this.idObject[ids]
    } else {
      return ids.map(id => this.idObject[id])
    }
  }
  filter (key, value) {
    return this.data.filter(item => item.params[key] == value)
  }
}

export default Feature
