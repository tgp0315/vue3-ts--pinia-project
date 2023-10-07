/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Plugin } from 'vite'
import child_process from 'child_process'
import os from 'os'
// import * as dotenv from 'dotenv'
// import * as fs from 'fs'

// const NODE_ENV = process.env.NODE_ENV || 'development'
// const envFiles = [
//   `.env.${NODE_ENV}`
// ]
// for (const file of envFiles) {
//   const envConfig = dotenv.parse(fs.readFileSync(file))
//   for (const k in envConfig) {
//     process.env[k] = envConfig[k]
//   }
// }
interface definitionInterface {
  (): void
}

export default function GvaPositionServer(): Plugin {
  return {
    name: 'gva-position-server',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req: any, res: any, next: definitionInterface) => {
        if (req._parsedUrl.pathname === '/gvaPositionCode') {
          const path = req._parsedUrl.query && req._parsedUrl.query.split('=')[1]
          if (path && path !== 'null') {
            if (process.env.VITE_EDITOR === 'webstorm') {
              const linePath = path.split(':')[1]
              const filePath = path.split(':')[0]
              const platform = getPlatform()
              if (platform === 'Windows') {
                child_process.exec(`webstorm64.exe  --line ${linePath} ${filePath}`)
              } else {
                child_process.exec(`webstorm64  --line ${linePath} ${filePath}`)
              }
            } else {
              child_process.exec('code -r -g ' + path)
            }
          }
        }
        next()
      })
    },
  }
}

function getPlatform() {
  'use strict'
  const platform = os.platform()
  switch (platform) {
    case 'darwin':
      return 'MacOSX'
    case 'linux':
      return 'Linux'
    case 'win32':
      return 'Windows'
    default:
      return '无法确定操作系统!'
  }
}
