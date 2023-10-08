export interface definitionInterface {
  (message: string): void
}
export const copyText = (text: string, cb: definitionInterface): boolean => {
  if (typeof document.execCommand !== 'function') {
    cb && cb('复制失败')
    return false
  }
  const dom: HTMLTextAreaElement = document.createElement('textarea')
  dom.value = text
  dom.setAttribute('style', 'display: block;width: 1px;height: 1px;')
  document.body.appendChild(dom)
  dom.select()
  const result: boolean = document.execCommand('copy')
  document.body.removeChild(dom)
  if (result) {
    cb && cb('复制成功')
    return true
  }
  if (typeof document.createRange !== 'function') {
    cb && cb('复制失败')
    return false
  }
  const range: Range = document.createRange()
  const div: HTMLDivElement = document.createElement('div')
  div.innerHTML = text
  div.setAttribute('style', 'height: 1px;fontSize: 1px;overflow: hidden;')
  document.body.appendChild(div)
  range.selectNode(div)
  const selection: Selection | null = window.getSelection()
  if ((selection as Selection)?.rangeCount > 0) {
    selection?.removeAllRanges()
  }
  selection?.addRange(range)
  document.execCommand('copy')
  cb && cb('复制成功')
  return true
}
