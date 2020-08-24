import { type } from './type.js'

export default function isFunction (obj) {
    return type(obj) === 'function'
}
