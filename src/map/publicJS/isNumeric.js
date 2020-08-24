import { type } from './type.js'

export default function isNumeric (obj) {
    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var toType = type(obj)
    return (toType === 'number' || toType === 'string') &&

        // parseFloat NaNs numeric-cast false positives ('')
        // ...but misinterprets leading-number strings, particularly hex literals ('0x...')
        // subtraction forces infinities to NaN
        !isNaN(obj - parseFloat(obj))
}
