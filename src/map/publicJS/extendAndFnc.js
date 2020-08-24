import isPlainObject from './isPlainObject.js'
import isFunction from './isFunction.js'
import isArray from './isArray.js'

export default function extend () {
    let options
    let name
    let src
    let copy
    let copyIsArray
    let clone
    let target = arguments[ 0 ] || {}
    let i = 1
    let length = arguments.length
    let deep = false

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target
        target = arguments[ i ] || {}
        i++
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && !isFunction(target)) {
        target = {}
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this
        i--
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[ i ]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[ name ]
                copy = options[ name ]

                // Prevent never-ending loop
                if (target === copy) {
                    continue
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false
                        clone = src && isArray(src) ? src : []
                    } else {
                        clone = src && isPlainObject(src) ? src : {}
                    }

                    // Never move original objects, clone them
                    target[ name ] = extend(deep, clone, copy)

                // Don't bring in undefined values
                } else if (copy !== undefined) {
                    if(isFunction(target[ name ]) && isFunction(copy)){
                        var obj2Fnc = target[ name ]
                        var obj1Fnc = copy
                        target[ name ] = function () {
                            obj1Fnc.apply(this, arguments)
                            return obj2Fnc.apply(this, arguments)
                        }
                    } else {
                        target[ name ] = copy
                    }
                }
            }
        }
    }

    // Return the modified object
    return target
}
