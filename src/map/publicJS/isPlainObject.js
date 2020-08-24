import { class2type } from './type.js'

const toString = class2type.toString
const hasOwn = class2type.hasOwnProperty
const fnToString = hasOwn.toString
const getProto = Object.getPrototypeOf
const ObjectFunctionString = fnToString.call(Object)

export default function isPlainObject (obj) {
    let proto
    let Ctor
    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== '[object Object]') {
        return false
    }

    proto = getProto(obj)

    // Objects with no prototype (e.g., `Object.create(null)`) are plain
    if (!proto) {
        return true
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
    return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
}
