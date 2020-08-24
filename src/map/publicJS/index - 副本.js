// 用一个或多个其他对象来扩展一个对象，返回被扩展的对象。
import extend from './extend'
// 使用过滤函数过滤数组元素。
import grep from './grep'
// 测试对象是否为数组。
// import isArray from './isArray'
// 测试对象是否为空。（包含空对象，空数组）
// import isEmpty from './isEmpty'
// 测试对象是否是空对象（不包含任何属性）。
// import isEmptyObject from './isEmptyObject'
// 测试对象是否为函数。
// import isFunction from './isFunction'
// 测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）。
// import isPlainObject from './isPlainObject'
// 检测obj的数据类型。
import {type} from './type'
// 合并两个数组
import merge from './merge'
// 数组去重
import unique from './unique'
// 确定它的参数是否是一个数字。
import isNumeric from './isNumeric'
// 去掉字符串起始和结尾的空格。
import trim from './trim'
// 色段取值。
import GradientColor from './gradientColor'

var a1 = {
    a: {
        a: 'a'
    }
}
var a2 = {
    a: {
        b: 'b'
    }
}
console.log(extend(true, {}, a1, a2))
console.log(grep([0,1,2], function(n,i){return n > 0;}))
console.log(grep([0,1,2], function(n,i){return n > 0;}, true))
console.log(merge([0,1,2], [2,3,4]))
console.log(unique([0,1,1,1,2,2,3]))

console.log(isNumeric("-10"))
console.log(isNumeric(16))
console.log(isNumeric(0xFF))
console.log(isNumeric("0xFF"))
console.log(isNumeric("8e5"))
console.log(isNumeric(3.1415))
console.log(isNumeric(+10))
console.log(isNumeric('0144'))
console.log(111)
console.log(isNumeric(""))
console.log(isNumeric({}))
console.log(isNumeric(NaN))
console.log(isNumeric(null))
console.log(isNumeric(true))
console.log(isNumeric(Infinity))
console.log(isNumeric(undefined))

console.log(trim("  hello, how are you?  "))

console.log(type(true)) // === "boolean"
console.log(type(3)) // === "number"
console.log(type("test")) // === "string"
console.log(type(function(){})) // === "function"
console.log(type([])) // === "array"
console.log(type(new Date())) // === "date"
console.log(type(/test/)) // === "regexp"

var a2 = new GradientColor([
    {
        value: 0,
        color: '#ffffff'
    }, {
        value: 1,
        color: '#000000'
    }, {
        value: 0.5,
        color: '#f63563'
    }, {
        value: 0.25,
        color: '#456645'
    }
])
console.log(a2.getColor(0.15))
