import { type } from './type.js'

export default function isArray (obj) {
    return type(obj) === 'array'
}
