/*
	replaceLabel($('.a2'), 'button')
*/
const replaceLabel = function ($dom, domstring) {
	$dom.each(function(){
		var attributes = this.attributes
	    var element = $(this).children().wrapAll('<'+ domstring +'></'+ domstring +'>').parent()
	    var events = $._data(this, "events")
	    for (var key in attributes) {
	        if(attributes[key].nodeName) element[0].setAttribute(attributes[key].nodeName, attributes[key].nodeValue)
	    }
		for (var key in events) {
			events[key].forEach(function(event){
	        	element.on(key, event)
			})
	    }
	    element.unwrap()
	})
}

export default replaceLabel
