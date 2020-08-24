import extend from './extend.js'
import randomUuid from './randomUuid.js'

const defaults = {
	idKey: 'id',
	pIdKey: 'pId',
	childrenKey: 'children'
}

const analysisTree = function (data, options = {}) {
	var opt = extend({}, defaults, options)
	var objArr = []
	var dataAllArr = []
	var objs = {}
	var addIdArr = []

	function analysis(data, pid){
		extend(true, [], data).forEach(function(item){
			var _children = item[opt.childrenKey]
			pid && (item[opt.pIdKey] = pid)
			if(!item[opt.idKey]){
				item[opt.idKey] = randomUuid(8, 16)
				addIdArr.push(item)
			}
			if(_children){
				analysis(_children, item[opt.idKey])
				delete item[opt.childrenKey]
			}
			dataAllArr.push(item)
			objs[item[opt.idKey]] = item
		})
	}
	analysis(extend(true, [], data))
	var allArr = extend(true, [], dataAllArr)

	dataAllArr.forEach(function(item){
		var _pid = item[opt.pIdKey]
		if(_pid && objs[_pid]){
			var _obj = objs[_pid]
			if(!_obj[opt.childrenKey]) _obj[opt.childrenKey] = []
			_obj[opt.childrenKey].push(item)
		} else {
			objArr.push(item)
		}
	})

	addIdArr.forEach(function(item){
		delete item[opt.idKey]
		if(item[opt.childrenKey]) item[opt.childrenKey].forEach(function(citem){
			delete citem[opt.pIdKey]
		})
	})
	return {
		data: data,
		allArr: allArr,
		objArr: objArr,
		objs: objs
	}
}

export default analysisTree
