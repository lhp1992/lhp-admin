var class2type = {}

'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').forEach(function (name) {
    class2type[ '[object ' + name + ']' ] = name.toLowerCase()
})

function type (obj) {
    if (obj == null) {
        return obj + ''
    }
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[ Object.prototype.toString.call(obj) ] || 'object' : typeof obj
}

export {class2type, type}
