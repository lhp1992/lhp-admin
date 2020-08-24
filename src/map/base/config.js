import { extend } from './public'
const confit = {
  all: {
    strokeColor: "#1791fc",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#1791fc",
    fillOpacity: 0.35,
    cursor: 'pointer'
  },
  marker: {},
  polygon: {},
  polyline: {},
  circle: {},
  text: {
    anchor: 'center'
  },
  rectangle: {},
}
const marker = extend({}, confit.all, confit.marker)
const polygon = extend({}, confit.all, confit.polygon)
const polyline = extend({}, confit.all, confit.polyline)
const circle = extend({}, confit.all, confit.circle)
const text = extend({}, confit.all, confit.text)
const rectangle = extend({}, confit.all, confit.rectangle)

const productionErrorTip = true

export { confit, marker, polygon, polyline, circle, text, rectangle, productionErrorTip }
