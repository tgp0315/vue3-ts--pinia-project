const projectName = import.meta.env.VITE_GLOB_APP_TITLE

export function warn(message: string): void {
  console.warn(`[${projectName} warn]:${message}`)
}

export function error(message: string): void {
  throw new Error(`[${projectName} error]:${message}`)
}
