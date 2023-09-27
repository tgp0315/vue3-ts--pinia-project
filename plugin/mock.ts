import path from 'path'
import fs from 'fs'
// const mockRouteMap = {}

interface Options {
  entry?: string
}
const viteMockPlugin = (options: Options = {}) => {
  options.entry = options?.entry || './mock'
  return {
    name: 'vite-mock-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 自定义请求处理...
        const method = req.headers.method
        if (method) {
          let route: string = path.resolve(process.cwd(), options.entry, `${method}.ts`)
          const cacheRoute = route.replace(/\\/g, '\\')
          route = route.replace(/\\/g, '/')
          console.log(route)
          try {
            const isExist = await isFileExisted(route)
            if (isExist) {
              delete require.cache[cacheRoute]
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const content = require(route)
              if (content) {
                const chunk = send(content)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(chunk)
              } else {
                next()
              }
            } else {
              next()
            }
          } catch (e) {
            console.log(e, 'e')
            next()
          }
        } else {
          next()
        }
      })
    },
  }
}

function isFileExisted(path_way) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, (err) => {
      if (err) {
        reject(false) // "不存在"
      } else {
        resolve(true) // "存在"
      }
    })
  })
}

// 实现一个send方法
function send(body) {
  console.log(body)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let chunk: any = JSON.stringify(body)
  if (chunk) {
    chunk = Buffer.from(chunk, 'utf-8')
  }
  return chunk
}

export default viteMockPlugin
