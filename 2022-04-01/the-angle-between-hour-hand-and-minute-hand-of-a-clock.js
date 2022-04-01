/**
 * 时钟的时针和分针的角度
 */

function angle(time) {
  if (!time) return 0
  let t = time.split(':')
  let h24 = parseInt(t[0])
  let m = parseInt(t[1])
  let h12 = h24 >= 12 ? h24 - 12 : h24
  let hAngle = (h12 / 12) * 360
  let mAngle = (m / 60) * 360
  let hAdd = 360 / (12 * 60) // 每分钟时针走的角度
  console.log(hAngle, hAdd, m, mAngle)
  let res = Math.abs(hAngle + hAdd * m - mAngle) // 取绝对值
  // return Math.min(res, 360 - res)
  return Math.ceil(Math.min(res, 360 - res))
}

// console.log(angle('00:01'))
// console.log(angle('23:30'))
