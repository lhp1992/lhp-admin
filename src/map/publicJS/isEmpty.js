export default function isEmpty (v) {
    switch (typeof v) {
    case 'undefined':
        return true
    case 'string':
        if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true
        break
    case 'boolean':
        if (!v) return true
        break
    case 'number':
        if (v === 0 || isNaN(v)) return true
        break
    case 'object':
        if (v === null || v.length === 0) return true
        for (var i in v) {
            return false
        }
        return true
    }
    return false
}
