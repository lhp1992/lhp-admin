// import { map } from './base/map'
import Marker from './base/marker'
import './icon.css'
import InfoWindow from './infoWindow'

let _defaultTextStyle = ''

let iconTypes = {
  sp: {
    color: 'red',
    infoWindowType: 'sp',
    image: require('@/assets/leftTree-hide.png'),
    size: [12, 12],
    textStyle: {
      'background': 'green',
      'color': '#fff'
    },
    cluserAnchor: 'bottom'
  },
  2: {
    color: 'green',
    infoWindowType: 'sp',
    image: './static/4_27.png',
    size: [32, 32]
  }
}

let defaultTextStyle = {
  'background': 'yellow',
  'border': '1px solid #999',
  'text-shadow': 'none',
  'border-radius': '3px',
  'padding': '0 5px'
}

let defaultIcon = {
  color: 'red',
  image: require('@/assets/leftTree-show.png'),
  size: [24, 24],
  cluserOffset: {
    x: -12,
    y: -12
  }
}

let options = {
  anchor: 'bottom-center',
  offset: {
    x: 0,
    y: -15
  }
}

function initIconTypesData(){
  if (defaultTextStyle) _defaultTextStyle = getTextStyle(defaultTextStyle)
  for (let key in iconTypes) {
    const textStyle = iconTypes[key].textStyle
    if (textStyle) {
      iconTypes[key]._textStyle = getTextStyle(textStyle)
    }
    let data = iconTypes[key]
    if (data.cluserAnchor === 'bottom') {
      data.cluserOffset = {
        x: -data.size[0] / 2,
        y: 0
      }
    } else {
      data.cluserOffset = {
        x: -data.size[0] / 2,
        y: -data.size[1] / 2
      }
    }
  }
  if (defaultIcon.textStyle) defaultIcon._textStyle = getTextStyle(defaultIcon.textStyle)
}
initIconTypesData()

function getTextStyle(textStyle){
  let _textStyle = ''
  for (let key in textStyle) {
    _textStyle += key +': '+ textStyle[key] +';'
  }
  return _textStyle
}

export default function initMarkers(map){
  let infoWindow = new InfoWindow({
    map: map
  })

  let markers = new Marker({
    isClusterer: true,
    map: map,
    clustererOptions: {
      maxZoom: 16,
      renderCluserMarker: function (context) {
        var _type = context.markers[0].params.type
        let obj = iconTypes[_type]
        if (!obj) obj = defaultIcon
        var content = '<div class="my_markerClusterer"><img class="my_mc_img" src="'+ obj.image +'" style="width: '+ (obj.size[0] || 0) +'px;height: '+ (obj.size[1] || 0) +'px;"><span class="my_mc_num">'+ context.count +'</span></div>'
        context.marker.setOffset(obj.cluserOffset);
        context.marker.setContent(content)
      }
    },
    clustererTypeKey: 'type',
    isClustererType: true,
    isRun: true,
    options: options
  })

  markers.infoWindow = infoWindow

  markers.on('added', (overlay) => {
    if (overlay && overlay.CLASS_NAME == 'AMap.Marker') {
      let obj = iconTypes[overlay.params.type]
      if(!obj) obj = defaultIcon
      let text = overlay.params.text || '未定义名称'
      let _html = '<div class="marker-icon" style="color: '+ obj.color +';">\
        <div class="marker-icon-title" style="color: '+ obj.color +';'+ _defaultTextStyle + (obj._textStyle ? obj._textStyle : '') +'">'+ text +'</div>\
        <div class="marker-icon-img"><img src="'+ obj.image +'" style="width: '+ (obj.size[0] || 0) +'px;height: '+ (obj.size[1] || 0) +'px;"></div>\
        <i class="marker-icon-i animated" style="background-image: radial-gradient('+ obj.color +' 30%, transparent 80%);"></i>\
      </div>'
      if (_html) overlay.setContent(_html)
    }
  })

  markers.on('click', function(overlay, params){
    var _type = params.type
    var infoWindowType = iconTypes[_type].infoWindowType
    if(infoWindowType){
      infoWindow.show(infoWindowType, overlay.getPosition(), params, overlay)
    }
  })

  return markers
}
