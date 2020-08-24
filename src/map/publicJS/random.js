export default function random (min, max, fixed) {
    let number = Math.random() * (max - min) + min
    if (fixed === 0) {
        number = Math.round(number)
    }
    if (fixed) {
        number = parseFloat(number.toFixed(fixed))
    }
    return number
}
