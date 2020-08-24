const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

export default function trim (text) {
    return text == null ? '' : (text + '').replace(rtrim, '')
}
