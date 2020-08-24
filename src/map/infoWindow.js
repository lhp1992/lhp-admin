import { map, getInfoWindow } from './base/map'
import './infoWindow.css'
import BindEvents from './base/events'

let listObject = {
  sp: {
    title: "视频",
    width: 280,
    imgKey: 'src',
    field: {bh: '编号', mc: '名称', sptlx: '设备类型'},
    buts: ["查看视频","录像播放"],
    butClick:function(title, data){
      console.log(title, data)
    }
  }
}

function model(data, _field, imgKey){
  let table = ''
  for (var key in _field) {
    table += '<tr><td><span class="my_iw_title">'+ _field[key] +'</span>：<span class="my_iw_colon_1">'+ data[key] +'</span></td></tr>';
  };
  let content = '\
    <table>'+ table +'</table>\
  ';
  if (imgKey && data[imgKey]) content = '\
    <table style="width: calc(100% - 120px);display: inline-block;margin-right: 10px;vertical-align: top;">'+ table +'</table\
    ><img style="width:110px" src="'+ data[imgKey] +'" />\
  '
  return content
}

function butsModel(buts){
  var html = "";
  if(buts) buts.map(function(item,index){
    html+="<a class='table_Html_buts' href='javascript:void(0);'>"+item+"&nbsp;&nbsp;</a>";
  });
  return html;
}

const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
function trim (text) {
  return text == null ? '' : (text + '').replace(rtrim, '')
}

class InfoWindow extends BindEvents {
  constructor(obj = {}) {
    super()
    this.map = obj.map || map
    this.infoWindow = getInfoWindow()
  }
  show(type, position, data, feature) {
    if (feature) this.infoWindow.feature = feature
    let obj
    if (typeof type === 'object') {
      obj = type
      type = undefined
    } else {
      obj = listObject[type]
      if (!obj) return
    }
    this.infoWindow.open(this.map, position)
    this.infoWindow.setContent(this.getDom(obj, data, type))
  }
  hide() {
    this.infoWindow.close()
  }
  getDom(item, data, type){
    let self = this
    var html = '<div class="my_infoWindow" style="width:'+ item.width +'">\
        <span class="weui-loadmore__tips" style="cursor: pointer;" id="infowindow_context_close">\
          <a href="javascript:void(0);"></a>\
          <span id="infowindow_context_title">'+ item.title +'</span>\
          <a href="javascript:void(0);"></a>\
        </span>\
        <div class="my_iw_main">\
          '+ (item.model ? item.model(data, item.field, item.imgKey) : model(data, item.field, item.imgKey)) +'\
        </div>\
        '+ (item.butsModel ? ('<div class="my_iw_btns">'+ item.butsModel(item.buts, data) +'</div>') : ('<div class="my_iw_btns">'+ butsModel(item.buts, data)) +'</div>') +'\
      </div>\
    '
    
    var dom = document.createElement("div"); 
    dom.innerHTML = html; 
    // console.log(dom.querySelectorAll('.my_iw_btns a'))
    dom.querySelectorAll('.my_iw_btns a').forEach((e) => {
      e.addEventListener('click', function(){
        item.butClick(trim(this.textContent), data)
        if(type) self.emit(type, trim(this.textContent), data)
      })
    })
    return dom
  }
}

export default InfoWindow