export default function grep (elems, callback, invert) {
    var callbackInverse
    let matches = []
    let i = 0
    let length = elems.length
    let callbackExpect = !invert

    // Go through the array, only saving the items
    // that pass the validator function
    for (; i < length; i++) {
        callbackInverse = !callback(elems[ i ], i)
        if (callbackInverse !== callbackExpect) {
            matches.push(elems[ i ])
        }
    }

    return matches
}
