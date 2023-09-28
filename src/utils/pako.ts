// 后端返回的数据量较大，后端使用gzip压缩数据，前端拿到接口返回的压缩数据进行解压
import pako from 'pako'

// b64Data-->传入加密的数据进行解密
export const unzip = (b64Data: string) => {
  let strData = atob(b64Data)
  const charData = strData.split('').map(function (x) {
    return x.charCodeAt(0)
  })
  const binData = new Uint8Array(charData)
  const data = pako.inflate(binData)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  strData = String.fromCharCode.apply(null, new Uint16Array(data) as any)
  return strData
}

// 加密
export const zip = (str: object | string) => {
  if (typeof str !== 'string') {
    str = JSON.stringify(str)
  }
  const binaryString = pako.gzip(str, { to: 'string' })
  return btoa(binaryString)
}

// 示例代码
// import { zip, unzip } from '@/utils/pako'

// const data = { name: 'lyc', age: '18', sex: 'male' }
// const compress = zip(JSON.stringify(data))
// console.log(compress)
// // 输出：
// // H4sIAAAAAAAAA6tWykvMTVWyUsqpTFbSUUpMB7ENLYDM4tQKIDM3MSdVqRYAlcYjMyYAAAA=

// const unCompress = JSON.parse(unzip(compress))
// console.log(unCompress)
