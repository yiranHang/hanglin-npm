/**
 * 判断是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return Array.isArray(val)
}

/**
 * 判断是否为有效的 URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 默认消息处理函数
 */
export const defaultMessage = {
  error: (message: string) => console.error(message),
  success: (message: string) => console.log(message)
}
