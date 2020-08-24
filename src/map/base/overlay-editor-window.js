import { productionErrorTip } from './config'
import { getOverlayCenter } from './compute'
import OverlayDraw from './overlay-draw'
import { extend, isArray } from './public'
import { editorWindowCustoms } from './overlay-customized'

let infoWindow
let overlayActive
let $domObj = {}
let customsDefault = {
  name: {
    type: 'text',
    key: 'name',
    content: '名称'
  },
  color: {
    type: 'color',
    key: 'color',
    content: '颜色',
    callback: function(overlay, color){
      overlayActive.editorWindowData.options['fillColor'] = color
      overlayActive.editorWindowData.options['strokeColor'] = color
      overlay.setOptions({
        fillColor: color,
        strokeColor: color
      })
    }
  },
  fillColor: {
    isOptions: true,
    type: 'color',
    key: 'fillColor',
    content: '填充颜色',
    callback: function(overlay, color){
      overlay.setOptions({
        fillColor: color
      })
    }
  },
  strokeColor: {
    isOptions: true,
    type: 'color',
    key: 'strokeColor',
    content: '线条颜色',
    callback: function(overlay, color){
      overlay.setOptions({
        strokeColor: color
      })
    }
  },
  strokeStyle: {
    isOptions: true,
    type: 'select',
    key: 'strokeStyle',
    content: '线条样式',
    options: [
      {
        name: '实线',
        value: 'solid'
      }, {
        name: '虚线',
        value: 'dashed'
      }
    ],
    callback: function(overlay, value){
      overlay.setOptions({
        strokeStyle: value
      })
    }
  },
  strokeWeight: {
    isOptions: true,
    type: 'range',
    key: 'strokeWeight',
    content: '线条宽度',
    max: 20,
    min: 1,
    callback: function(overlay, value){
      overlay.setOptions({
        strokeWeight: value
      })
    }
  },
  fillOpacity: {
    isOptions: true,
    type: 'range',
    key: 'fillOpacity',
    content: '透明度',
    callback: function(overlay, value){
      overlay.setOptions({
        fillOpacity: value / 100
      })
    }
  },
  showDir: {
    isOptions: true,
    type: 'checkbox',
    key: 'showDir',
    content: '是否延路径显示方向箭头。',
    callback: function(overlay, value){
      overlay.setOptions({
        showDir: value
      })
    }
  }
}

let defaults = {
  'AMap.Marker': ['name'],
  'AMap.Polygon': ['color', 'strokeStyle', 'strokeWeight', 'fillOpacity'],
  'AMap.Circle': ['color', 'strokeStyle', 'strokeWeight', 'fillOpacity'],
  'AMap.Rectangle': ['color', 'strokeStyle', 'strokeWeight', 'fillOpacity'],
  'AMap.Polyline': ['strokeColor', 'strokeStyle', 'strokeWeight', 'showDir']
}

function getColorDom(_custom) {
  const $dom = $('<div class="editWindow-li" data-key="'+ _custom.key +'" data-type="color">\
    <div class="form-horizontal">\
      <div class="form-group">\
        <label class="col-xs-2" style="padding-right:0;">'+ (_custom.content || '') +'</label>\
        <div class="col-xs-9 clearfix">\
          <div class="select_color edit_color"><div title="#1791fc" class="editWindow-color" style="background-color: #1791fc"></div><div title="#f75564" class="editWindow-color" style="background-color: rgb(247, 85, 100);"></div><div title="#f5ec00" class="editWindow-color" style="background-color: rgb(245, 236, 0);"></div><div title="#c9de00" class="editWindow-color" style="background-color: rgb(201, 222, 0);"></div><div title="#40b22e" class="editWindow-color" style="background-color: rgb(64, 178, 46);"></div><div title="#00a14f" class="editWindow-color" style="background-color: rgb(0, 161, 79);"></div><div title="#00add0" class="editWindow-color" style="background-color: rgb(0, 173, 208);"></div><div title="#2186f8" class="editWindow-color" style="background-color: rgb(33, 134, 248);"></div><div title="#385aaf" class="editWindow-color" style="background-color: rgb(56, 90, 175);"></div><div title="#862c97" class="editWindow-color" style="background-color: rgb(134, 44, 151);"></div><div title="#b6004a" class="editWindow-color" style="background-color: rgb(182, 0, 74);"></div><div title="#ee3129" class="editWindow-color" style="background-color: rgb(238, 49, 41);"></div><div title="#ff9200" class="editWindow-color" style="background-color: rgb(255, 146, 0);"></div><div title="#ffb200" class="editWindow-color" style="background-color: rgb(255, 178, 0);"></div><div title="#804e44" class="editWindow-color" style="background-color: rgb(128, 78, 68);"></div><div title="#f9f89b" class="editWindow-color" style="background-color: rgb(249, 248, 155);"></div><div title="#e4ef99" class="editWindow-color" style="background-color: rgb(228, 239, 153);"></div><div title="#addda6" class="editWindow-color" style="background-color: rgb(173, 221, 166);"></div><div title="#5cd2a6" class="editWindow-color" style="background-color: rgb(92, 210, 166);"></div><div title="#7dd7eb" class="editWindow-color" style="background-color: rgb(125, 215, 235);"></div><div title="#96c3ff" class="editWindow-color" style="background-color: rgb(150, 195, 255);"></div><div title="#a4b5da" class="editWindow-color" style="background-color: rgb(164, 181, 218);"></div><div title="#cda2d2" class="editWindow-color" style="background-color: rgb(205, 162, 210);"></div><div title="#e194ad" class="editWindow-color" style="background-color: rgb(225, 148, 173);"></div><div title="#fc9793" class="editWindow-color" style="background-color: rgb(252, 151, 147);"></div><div title="#ffd090" class="editWindow-color" style="background-color: rgb(255, 208, 144);"></div><div title="#ffdd3c" class="editWindow-color" style="background-color: rgb(255, 221, 60);"></div><div title="#b88f87" class="editWindow-color" style="background-color: rgb(184, 143, 135);"></div><div title="#ffffff" class="editWindow-color" style="background-color: rgb(255, 255, 255);"></div><div title="#cccccc" class="editWindow-color" style="background-color: rgb(204, 204, 204);"></div><div title="#777777" class="editWindow-color" style="background-color: rgb(119, 119, 119);"></div><div title="#000000" class="editWindow-color" style="background-color: rgb(0, 0, 0);"></div></div>\
        </div>\
      </div>\
    </div>\
  </div>')
  return $dom
}

function getTextDom(_custom) {
  const $dom = $('<div class="editWindow-li" data-key="'+ _custom.key +'" data-type="text">\
    <div class="form-horizontal">\
      <div class="form-group">\
        <label class="col-xs-2" style="padding-right:0;">'+ (_custom.content || '') +'</label>\
        <div class="col-xs-9 clearfix">\
          <input class="form-control editWindow-text">\
        </div>\
      </div>\
    </div>\
  </div>')
  return $dom
}

function getSelectDom(_custom) {
  const $dom = $('<div class="editWindow-li" data-key="'+ _custom.key +'" data-type="select">\
    <div class="form-horizontal">\
      <div class="form-group">\
        <label class="col-xs-2" style="padding-right:0;">'+ (_custom.content || '') +'</label>\
        <div class="col-xs-9 clearfix">\
          <select class="form-control editWindow-select">\
            <option style="display: none"></option>\
            '+ (_custom.options ? _custom.options.reduce((total, item) => {
              const _name = item.name || item
              const _value = item.value || item
              total += '<option value="'+ _value +'">'+ _name +'</option>'
              return total
            }, '') : '') +'\
          </select>\
        </div>\
      </div>\
    </div>\
  </div>')
  return $dom
}

function getRangeDom(_custom) {
  const $dom = $('<div class="editWindow-li" data-key="'+ _custom.key +'" data-type="range">\
    <div class="form-horizontal">\
      <div class="form-group">\
        <label class="col-xs-2" style="padding-right:0;">'+ (_custom.content || '') +'</label>\
        <div class="col-xs-9 clearfix my-jrange-box">\
          <div class="my-jrange-box editWindow-range">\
            <div class="editWindow-range-box"></div>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>')
  return $dom
}

function getCheckboxDom(_custom) {
  const $dom = $('<div class="editWindow-li" data-key="'+ _custom.key +'" data-type="checkbox">\
    <div class="form-horizontal">\
      <div class="form-group">\
        <label class="col-xs-2" style="padding-right:0;"></label>\
        <div class="col-xs-9 clearfix">\
          <div class="switch switch-inline">\
            <input type="checkbox" class="editWindow-showDir">\
            <label>'+ (_custom.content || '') +'</label>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>')
  return $dom
}

function updateDomValue($dom, _custom) {
  let type = $dom.data('type')
  let key = $dom.data('key')
  let value = overlayActive.editorWindowData[key]
  switch (key){
    case 'color':
      if (!value) value = overlayActive.getOptions && overlayActive.getOptions()['fillColor']
      break
    case 'fillColor':case 'strokeColor':case 'strokeStyle':case 'strokeWeight':case 'showDir':
      value = overlayActive.editorWindowData.options[key] || (overlayActive.getOptions && overlayActive.getOptions()[key]) || false
      break
    case 'fillOpacity':
      value = overlayActive.editorWindowData.options[key] || (overlayActive.getOptions && overlayActive.getOptions()[key] * 100)
      break
  }
  // console.log(overlayActive.getOptions())
  if (!value && _custom.value) value = _custom.value
  switch (type){
    case 'color':
      let $colors = $dom.find('.editWindow-color')
      $colors.removeClass('active')
      if (value) {
        let $color = $dom.find('.editWindow-color[title="'+ value +'"]')
        if ($color.length > 0) {
          $color.addClass('active')
        } else {
          $colors.eq(0).attr('title', value).css('background-color', value).addClass('active')
        }
      }
      break
    case 'text':
      $dom.find('.editWindow-text').val(value || '')
      break
    case 'select':
      $dom.find('.editWindow-select').val(value)
      break
    case 'range':
      $dom.find('.editWindow-range-box').jRange('setValue', parseInt(value).toString())
      break
    case 'checkbox':
      $dom.find('.editWindow-showDir').prop('checked', value)
      break
  }
}

function getDom(_custom) {
  let key = _custom.key
  if (!key) {
    productionErrorTip && console.error('缺少参数key！', key, _custom)
    return
  }
  let $dom
  if (_custom.type == 'customized') {
    _custom.getDom && ($dom = _custom.getDom(overlayActive.editorWindowData, key))
    if (!$dom) {
      productionErrorTip && console.error('错误的自定义函数！', _custom.getDom, _custom)
      return
    }
    return $dom
  }
  let _name = _custom.name || _custom.key
  if (!$domObj[_name]) {
    let type = _custom.type
    function setVal (_value) {
      if (_custom.isOptions) {
        overlayActive.editorWindowData.options[key] = _value
      } else {
        overlayActive.editorWindowData[key] = _value
      }
      _custom.callback && _custom.callback(overlayActive, _value)
    }
    switch (type){
      case 'color':
        $dom = getColorDom(_custom)
        $dom.find('.editWindow-color').click(function(){
          $(this).addClass('active').siblings('.editWindow-color').removeClass('active')
          let _value = $(this).attr('title')
          setVal(_value)
        })
        break
      case 'text':
        $dom = getTextDom(_custom)
        $dom.find('.editWindow-text').change(function(){
          let _value = $(this).val()
          setVal(_value)
        })
        break
      case 'select':
        $dom = getSelectDom(_custom)
        $dom.find('.editWindow-select').change(function(){
          let _value = $(this).val()
          setVal(_value)
        })
        break
      case 'range':
        $dom = getRangeDom(_custom)
        $dom.find('.editWindow-range-box').jRange({
          from: _custom.min || 0,
          to: _custom.max || 100,
          format: '%s',
          width: 280,
          showLabels: true,
          showScale: false,
          snap: true,
          ondragend: setVal,
          onbarclicked: setVal
        })
        break
      case 'checkbox':
        $dom = getCheckboxDom(_custom)
        $dom.find('.editWindow-showDir').change(function(){
          let _value = $(this).is(":checked")
          setVal(_value)
        })
        break
      default:
        productionErrorTip && console.error('错误的规则类型！', type, _custom)
        return
    }
    $domObj[_name] = $dom
  }
  updateDomValue($domObj[_name], _custom)
  return $domObj[_name]
}

function bindDragstart(){
  infoWindow.close()
}

export function open(overlay, data, customs) {
  if (!overlay) return
  overlay.on('dragstart', bindDragstart)
  overlay.isEditorWindow = true
  overlay.editorWindowData = overlay.editorWindowData || (data ? extend({}, data) : {})
  if (!overlay.editorWindowData.options) overlay.editorWindowData.options = {}
  overlayActive = overlay
  let map = overlay.getMap()
  if (!infoWindow) {
    infoWindow = new AMap.InfoWindow({
      autoMove: true,
      content: '',
      anchor: 'top-center'
    })
    infoWindow.on('close', () => {
      overlayActive.off('dragstart', bindDragstart)
    })
    if ($('style[name="editWindow"]').length < 1) $('head:eq(0)').append('<style name="editWindow">.editWindow-grid{overflow-x:hidden;overflow-y:auto;padding:0 6px;max-height:100px}.editWindow-grid .file-list{margin-bottom:0;width:300px}.editWindow-grid .file-list-grid .file{margin:4px;width:42px;height:42px;cursor:pointer}.editWindow-grid .file-list .file:hover .file-icon-image{background-color:#fff0d5}.editWindow-grid .file-list-grid .file.active,.editWindow-grid .file-list-grid .file:hover{border-color:#40a9ff}.editWindow-grid .file-list .file.active .file-icon-image{background-color:#fff0d5}.editWindow-grid .file-list-grid .file .file-icon{width:40px;height:40px}.editWindow-grid .file-list-grid .file-wrapper>.actions>.btn{padding:0}.editWindow-grid .file-list-grid .file-wrapper>.actions{width:100%}.editWindow-grid .file-list-grid .file-icon-image{text-align:center;font-size:0;line-height:42px}.amap-container .editWindow-grid .file-list-grid .file-icon-image img{max-width:100%!important;max-height:100%!important}.editWindow-box{padding-top:15px;width:380px}.editWindow-icon-list{display:flex;justify-content:space-between;flex-wrap:wrap}.editWindow-icon{width:34px;height:34px;border:1px solid transparent;text-align:center;font-size:0;line-height:32px}.editWindow-icon.active{border-color:#000;background-color:#eee}.edit_color{margin-left:-5px}.editWindow-color{float:left;margin-bottom:5px;margin-left:5px;width:20px;height:20px;cursor:pointer;transition:.3s}.editWindow-color.active{border:1px solid #eee;box-shadow:0 0 1px #000}.editWindow-color:hover{transform:translateY(-3px)}.editWindow-range{padding-top:6px}.editWindow-btns .btn{margin:0 5px}.my-jrange-box .theme-green .back-bar .selected-bar{background-color:#4285f4;background-image:none}.my-jrange-box .theme-green .back-bar{margin:6px 0;height:6px;border-radius:6px;background-color:#e4e7ed;background-image:none}.my-jrange-box .theme-green .back-bar .pointer{width:16px;height:16px;border:2px solid #3280fc;border-radius:50%;background-color:#fff;background-image:none;cursor:pointer;user-select:none}</style>')
  }
  let center = getOverlayCenter(overlay)
  let $dom = $('<div class="editWindow-box"></div>')
  let _customs = customs || defaults[overlay.CLASS_NAME]
  if (_customs) {
    _customs.forEach(key => {
      let _custom
      if (typeof(key) == 'string') {
        _custom = customsDefault[key]
        if (!_custom) {
          productionErrorTip && console.error('不存在的规则！', key, _customs)
          return
        }
      } else {
        _custom = key
      }
      $dom.append(getDom(_custom))
    })
  }
  infoWindow.setContent($dom[0])
  infoWindow.open(map, center)
  // infoWindow.setOffset(data.infoWindowOffset || {
  //   x: 0,
  //   y: 0
  // })
  infoWindow.overlay = overlay
}

export function submit(overlay) {
  if (!overlay || !overlay.isEditorWindow) return
  if (infoWindow.overlay == overlay) {
    delete infoWindow.overlay
    infoWindow.close()
  }
  delete overlay.isEditorWindow
  const _data = overlay.editorWindowData
  delete overlay.editorWindowData
  return _data
}

/*
  initEditorWindow Options
    参数  说明  类型  可选值  默认值
    customs  OverlayEditorWindow各类型（type,CLASS_NAME均可设置。type优先）覆盖物规对照则列表(不存在的类型规则按overlay.CLASS_NAME对照defaults默认列表)  object(自定义规则), string(与customsDefault默认对照列表Key值相对应)  —  —
*/

/*
  customs Options
    参数  说明  类型  可选值  默认值
    *type  类型  string  [customized:自定义规则, color: 颜色表, text: 输入框, select: 下拉框, range: 滑块]  —
    *key  params中的key  string  —  —
    name  $dom缓存中的key键(不存在时取key作为key键，多条规则共用一个key时使用。)  string  —  —
    value  默认值  string  —  —
    content  提示内容  string  —  —
    getDom  type为customized时可选，返回$dom节点  function(params, key){return $dom}  —  —
    callback  type不为customized时可选，数据改变时的回调  function(overlay, value){}  —  —
    options  type为select时可选  arrary[string, {name: string, value: string}]  —  —
    max  type为range时可选  number  —  100
    min  type为range时可选  number  —  0
*/

export function initEditorWindow(overlayGroup, options = {}) {
  function bindFeatureClick(){
    const _custom = overlayGroup.editorWindow._customs[this.params[overlayGroup.groupTypeKey]] || overlayGroup.editorWindow._customs[this.CLASS_NAME]
    open(this, this.params, _custom)
  }

  options.customs = options.customs || {}

  if (overlayGroup.customs) {
    overlayGroup.customs.forEach((custom) => {
      if (custom.name) {
        if (custom.editorWindow) options.customs[custom.name] = custom.editorWindow
      } else {
        productionErrorTip && console.error('错误的custom自定义类型！', custom.name, custom)
      }
    })
  }

  overlayGroup.editorWindow = {
    _customs: extend({}, editorWindowCustoms, options.customs),
    open: function(features){
      let overlays = overlayGroup.data || []
      if (features) {
        if (isArray(features)) {
          overlays = features
        } else {
          overlays = [features]
        }
      }
      overlays.map(feature => {
        feature.on('click', bindFeatureClick, feature)
        feature.editorOpen && feature.editorOpen()
      })
      return overlays
    },
    submit: function(features){
      let overlays = overlayGroup.data || []
      if (features) {
        if (isArray(features)) {
          overlays = features
        } else {
          overlays = [features]
        }
      }
      infoWindow && infoWindow.close()
      overlayGroup.drawClose && overlayGroup.drawClose()
      return overlays.map(feature => {
        feature.off('click', bindFeatureClick, feature)
        feature.editorClose && feature.editorClose()
        return extend(feature.params, submit(feature))
      })
    },
    getParams: function(){
      return overlayGroup.data.map(feature => {
        return extend({}, feature.editorWindowData || feature.params)
      })
    }
  }

  const init = function() {
    overlayGroup.on('added', feature => {
      feature.on('click', bindFeatureClick, feature)
    })
  }

  init()
}

/*
  OverlayEditorWindow Options
    参数  说明  类型  可选值  默认值
    options  OverlayDraw的options  object  —  —
    customs  —  —  —  —
*/
class OverlayEditorWindow{
  constructor (options = {}){
    const overlayGroup = new OverlayDraw(options.options || {})

    // overlayGroup.on('drawed', (feature, currentOptions) => {
    //   open(feature, currentOptions, overlayGroup.overlayEditorWindow.customs[currentOptions[overlayGroup.groupTypeKey]])
    // })
    
    initEditorWindow(overlayGroup, options)

    return overlayGroup
  }
}

export default OverlayEditorWindow

