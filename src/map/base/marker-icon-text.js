import OverlayGroup from './overlay-group'
import { productionErrorTip } from './config'

const iconObject = {}

export function defaultModelFnc(icon, text = '', color = 'red', textStyle, direction) {
  let _textStyle = ''
  if (textStyle) {
    for (let key in textStyle) {
      _textStyle += key +':'+ textStyle[key] +';'
    }
  }
  let html = '<div class="marker-icon" style="color: '+ color +';">\
    <div class="marker-icon-title" style="color: '+ color +';'+ _textStyle +'">'+ text +'</div>\
    <div class="marker-icon-img"><img src="'+ icon.src +'" style="width: '+ (icon.size[0] || 0) +'px;height: '+ (icon.size[1] || 0) +'px;"></div>\
    <i class="marker-icon-i animated" style="background-image: radial-gradient('+ color +' 30%, transparent 80%);"></i>\
  </div>'
  return html
}

export function initIconText(markersObject, modelFnc) {
  if($('style[name="IconMarker"]').length < 1){
    $('body').append('<style name="IconMarker">.marker-icon{text-align:center;position:relative}.marker-icon-img{margin:0 auto}.marker-icon-img.animated{animation-iteration-count:infinite;-webkit-animation-iteration-count:infinite}.marker-icon-i{display:block;width:50px;height:30px;overflow:hidden;border-radius:100%;margin:0 auto;transform:scale3d(.4,.4,.4);border:2px solid rgba(255,255,255,.3);background:-webkit-radial-gradient(#d5272a 30%,transparent 80%);background:radial-gradient(#d5272a 30%,transparent 80%);position:absolute;bottom:-30px;left:50%;margin-left:-25px}.marker-icon-i.animated{animation:pulse2 2s infinite linear}@-webkit-keyframes pulse2{from{-webkit-transform:scale3d(.2,.2,.2);transform:scale3d(.2,.2,.2);opacity:1}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:0}}@keyframes pulse2{from{-webkit-transform:scale3d(.2,.2,.2);transform:scale3d(.2,.2,.2);opacity:1}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);opacity:0}}.marker-icon .marker-icon-title{color:#d5272a}.marker-icon-title{text-shadow:1px 1px 0 rgba(0,0,0,1);position:absolute;top:-5px;left:50%;transform:translate(-50%,-100%);white-space:nowrap}.my_markerClusterer{position:relative;line-height:0}.my_mc_num{position:absolute;right:-12px;top:-12px;min-width:24px;min-height:24px;background-color:red;border-radius:24px;white-space:normal;color:#fff;line-height:24px;text-align:center;padding:0 5px;font-size:12px}</style>')
  }
  // let _textKey = options.textKey || 'text'
  // let _defaultModelFnc = (icon, text) => defaultModelFnc(icon, text)
  // let _modelFnc = options.modelFnc || _defaultModelFnc
  markersObject.on('added', (overlay) => {
    if (overlay.CLASS_NAME == 'AMap.Marker') {
      const _src = overlay.getIcon()
      function update(){
        const _html = modelFnc.bind(markersObject)(iconObject[_src], overlay.params, overlay)
        if (_html) overlay.setContent(_html)
      }
      if (iconObject[_src]) {
        update()
      } else {
        let image = new Image()
        image.src = _src
        image.onload = function(){
          iconObject[_src] = {
            src: _src,
            width: image.width,
            height: image.height,
            size: [image.width, image.height]
          }
          update()
        }
        productionErrorTip && (image.onerror = function(){
          console.error('图片加载错误！', _src, overlay)
        })
      }
    }
  })
}


