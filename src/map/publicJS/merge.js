export default function merge (first, second) {
    let len = +second.length
    let j = 0
    let i = first.length

    for (; j < len; j++) {
        first[ i++ ] = second[ j ]
    }

    first.length = i

    return first
}
