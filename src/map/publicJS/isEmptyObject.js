export default function isEmptyObject (obj) {
    /* eslint-disable no-unused-vars */
    // See https://github.com/eslint/eslint/issues/6125
    let name

    for (name in obj) {
        return false
    }
    return true
}
