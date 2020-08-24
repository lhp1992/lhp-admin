export default function randomPoints (center, n, cb) {
  const lngX = center[0]
  const latY = center[1]
  let arr = []
  for (let i = 1; i < (n + 1); i++) {
    let point = []
    point[0] = (lngX + (Math.random() * 2 - 1) * 0.01).toFixed(6)
    point[1] = (latY + (Math.random() * 2 - 1) * 0.01).toFixed(6)
    arr.push(cb(point, i))
  }
  return arr
}

