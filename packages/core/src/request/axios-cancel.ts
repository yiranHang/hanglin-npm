import type { AxiosRequestConfig } from 'axios'

export class AxiosCanceler {
  private pendingMap = new Map<string, AbortController>()

  /**
   * 生成请求的唯一标识符
   */
  private getRequestKey(config: AxiosRequestConfig): string {
    const { method = 'get', url = '', params = {}, data = {} } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  /**
   * 添加请求到待处理列表
   */
  addPending(config: AxiosRequestConfig): void {
    this.removePending(config)
    const requestKey = this.getRequestKey(config)
    const controller = new AbortController()
    config.signal = controller.signal
    this.pendingMap.set(requestKey, controller)
  }

  /**
   * 移除请求
   */
  removePending(config: AxiosRequestConfig): void {
    const requestKey = this.getRequestKey(config)
    const controller = this.pendingMap.get(requestKey)
    if (controller) {
      controller.abort()
      this.pendingMap.delete(requestKey)
    }
  }

  /**
   * 清空所有待处理的请求
   */
  removeAllPending(): void {
    this.pendingMap.forEach(controller => {
      controller.abort()
    })
    this.pendingMap.clear()
  }

  /**
   * 重置
   */
  reset(): void {
    this.pendingMap = new Map<string, AbortController>()
  }
}
