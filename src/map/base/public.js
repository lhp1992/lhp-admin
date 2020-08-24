import extend from '../publicJS/extend'
import isArray from '../publicJS/isArray'
import isFunction from '../publicJS/isFunction'

// const isArray = $.isArray
// const extend = $.extend

export {extend, isArray, isFunction}

export function randomPoints (center, n) {
    const lngX = center[0]
    const latY = center[1]
    let arr = []
    for (var i = 0; i < n; i++) {
        var point = []
        point[0] = lngX + (Math.random() * 2 - 1) * 0.01
        point[1] = latY + (Math.random() * 2 - 1) * 0.01
        arr.push({
            center: point,
            id: i
        })
    }
    return arr
}

export function random (min, max, fixed) {
    let number = Math.random() * (max - min) + min
    if (fixed === 0) {
        number = Math.round(number)
    }
    if (fixed) {
        number = parseFloat(number.toFixed(fixed))
    }
    return number
}

function tile2long (x,z) {
    return (x/Math.pow(2,z)*360-180);
}
function tile2lat (y,z) {
    var n=Math.PI-(2*Math.PI*y)/Math.pow(2,z);
    return ((180/Math.PI)*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}
export function getLnglat (x, y, z){
    return [tile2long(x, z), tile2lat(y, z)]
}

