export default function gradientColor (gradient) {
    gradient && gradient.sort(function (a, b) {
        return a.value - b.value
    })
    this.gradient = gradient || this.default
}
gradientColor.prototype.default = [
    {
        color: '#0000ff',
        value: 0.25
    }, {
        color: '#00ff00',
        value: 0.55
    }, {
        color: '#ffff00',
        value: 0.85
    }, {
        color: '#ff0000',
        value: 1
    }
]

gradientColor.prototype.calculation = function (startHex, endHex, step, i) {
    const startR = parseInt('0x' + startHex.slice(1, 3))
    const startG = parseInt('0x' + startHex.slice(3, 5))
    const startB = parseInt('0x' + startHex.slice(5, 7))
    const endR = parseInt('0x' + endHex.slice(1, 3))
    const endG = parseInt('0x' + endHex.slice(3, 5))
    const endB = parseInt('0x' + endHex.slice(5, 7))
    const sR = (endR - startR) / step
    const sG = (endG - startG) / step
    const sB = (endB - startB) / step
    var hex = this.rgbToHex(parseInt((sR * i + startR)), parseInt((sG * i + startG)), parseInt((sB * i + startB)))
    return hex
}

gradientColor.prototype.getColor = function (value) {
    var len = this.gradient.length
    if (value > this.gradient[len - 1].value) {
        return this.gradient[len - 1].color
    }
    if (value < this.gradient[0].value) {
        return this.gradient[0].color
    }
    for (var i = 0; i < len; i++) {
        if (value > this.gradient[i].value) {
            const start = this.gradient[i].color
            const end = this.gradient[i + 1].color
            const step = this.gradient[i + 1].value - this.gradient[i].value
            const val = value - this.gradient[i].value
            return this.calculation(start, end, step, val)
        }
    }
}

gradientColor.prototype.hex = function (x) {
    return ('0' + parseInt(x).toString(16)).slice(-2)
}
gradientColor.prototype.rgbToHex = function (r, g, b) {
    var _hex = '#' + this.hex(r) + this.hex(g) + this.hex(b)
    return _hex.toUpperCase()
}
