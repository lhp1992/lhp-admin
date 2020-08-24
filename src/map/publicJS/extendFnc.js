export default function extendFnc(obj1, obj2){
    for (var key in obj2) {
        if ($.isFunction(obj2[key]) && $.isFunction(obj1[key])) {
            var obj1Fnc = obj1[key]
            var obj2Fnc = obj2[key]
            obj1[key] = function(){
                obj1Fnc.apply(this, arguments)
                obj2Fnc.apply(this, arguments)
            }
            delete obj2[key]
        }
    }
    return obj1
}
