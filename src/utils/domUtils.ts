/* eslint-disable @typescript-eslint/no-explicit-any */
import { upperFirst } from 'lodash-es'

export interface ViewportOffsetResult {
  left: number
  top: number
  right: number
  bottom: number
  rightIncludeBody: number
  bottomIncludeBody: number
}

export interface StyleObj {
  [key: string]: any
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}

function trim(string: string): string {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/* istanbul ignore next */
export function hasClass(el: Element, cls: string): boolean {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/* istanbul ignore next */
export function addClass(el: Element, cls: string): boolean {
  if (!el) return false
  let curClass: string = el.className
  const classes: Array<string> = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName: string = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
  return true
}

/* istanbul ignore next */
export function removeClass(el: Element, cls: string): boolean {
  if (!el || !cls) return false
  const classes: string[] = cls.split(' ')
  let curClass: string = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName: string = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
  return true
}
/**
 * Get the left and top offset of the current element
 * left: the distance between the leftmost element and the left side of the document
 * top: the distance from the top of the element to the top of the document
 * right: the distance from the far right of the element to the right of the document
 * bottom: the distance from the bottom of the element to the bottom of the document
 * rightIncludeBody: the distance between the leftmost element and the right side of the document
 * bottomIncludeBody: the distance from the bottom of the element to the bottom of the document
 *
 * @description:
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc: HTMLElement = document.documentElement

  const docScrollLeft: number = doc.scrollLeft
  const docScrollTop: number = doc.scrollTop
  const docClientLeft: number = doc.clientLeft
  const docClientTop: number = doc.clientTop

  const pageXOffset: number = window.pageXOffset
  const pageYOffset: number = window.pageYOffset

  const box: number | DOMRect = getBoundingClientRect(element)

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect

  const scrollLeft: number = (pageXOffset || docScrollLeft) - (docClientLeft || 0)
  const scrollTop: number = (pageYOffset || docScrollTop) - (docClientTop || 0)
  const offsetLeft: number = retLeft + pageXOffset
  const offsetTop: number = rectTop + pageYOffset

  const left: number = offsetLeft - scrollLeft
  const top: number = offsetTop - scrollTop

  const clientWidth: number = window.document.documentElement.clientWidth
  const clientHeight: number = window.document.documentElement.clientHeight
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  }
}

export function hackCss(attr: string, value: string) {
  const prefix: string[] = ['webkit', 'Moz', 'ms', 'OT']

  const styleObj: StyleObj = {}
  prefix.forEach((item) => {
    styleObj[`${item}${upperFirst(attr)}`] = value
  })
  return {
    ...styleObj,
    [attr]: value,
  }
}

/* istanbul ignore next */
export function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
export function off(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: () => void,
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
export function once(el: HTMLElement, event: string, fn: EventListener): void {
  const listener = function (this: any, ...args: Array<any>) {
    if (fn) {
      fn.apply(this, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}
