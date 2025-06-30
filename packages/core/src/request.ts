// Request 模块导出
export { HttpClient } from './request/http-client'
export { AxiosCanceler } from './request/axios-cancel'
export { checkStatus } from './request/check-status'
export { isArray, isValidURL, defaultMessage } from './request/utils'
export * from './request/types'

import { HttpClient } from './request/http-client'
import type { HttpClientConfig } from './request/types'

// 创建默认实例的工厂函数
export function createHttpClient(config?: HttpClientConfig) {
  return new HttpClient(config)
}
