/* eslint-disable @typescript-eslint/no-explicit-any */
// 传输数据量过大时 gzip
import pako from 'pako'
import { decode, encode } from 'js-base64'

// b64Data-->传入加密的数据进行解密
export const unzip = (b64Data: string) => {
  const strData = atob(b64Data)
  const charData = strData.split('').map(function (x) {
    return x.charCodeAt(0)
  })
  const binData = new Uint8Array(charData)
  const data = pako.ungzip(binData)

  // ↓切片处理数据，防止内存溢出报错↓
  let str = ''
  const chunk = 8 * 1024
  let i
  for (i = 0; i < data.length / chunk; i++) {
    str += String.fromCharCode.apply(null, data.slice(i * chunk, (i + 1) * chunk) as any)
  }
  str += String.fromCharCode.apply(null, data.slice(i * chunk) as any)
  // ↑切片处理数据，防止内存溢出报错↑

  const unzipStr = decode(str)
  let result = ''

  // 对象或数组进行JSON转换
  try {
    result = JSON.parse(unzipStr)
  } catch (error) {
    if (/Unexpected token o in JSON at position 0/.test(error as any)) {
      // 如果没有转换成功，代表值为基本数据，直接赋值
      result = unzipStr
    }
  }
  return result
}

// 加密
export const zip = (data: object | string) => {
  if (!data) return data
  // 判断数据是否需要转为JSON
  const dataJson =
    typeof data !== 'string' && typeof data !== 'number' ? JSON.stringify(data) : data

  // 使用Base64.encode处理字符编码，兼容中文
  const str = encode(dataJson)
  const binaryString = pako.gzip(str)
  const arr = Array.from(binaryString)
  let s = ''
  arr.forEach((item) => {
    s += String.fromCharCode(item)
  })
  return btoa(s)
}

// 示例代码
// import { zip, unzip } from '@/utils/pako'

// const data = { name: 'lyc', age: '18', sex: 'male' }
// const compress = zip(JSON.stringify(data))
// console.log(compress)
// // 输出：
// H4sIAAAAAAAAA0ut9CqNDDfM8czKz0zyyMnyzCzPjAxPAfN9Q9IzfZy9qqIi0jP9M71KIsMrcjzzDGwBbYZhATQAAAA=

// const unCompress = JSON.parse(unzip(compress))
// console.log(unCompress)
