import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import qs from 'qs'
import { AxiosCanceler } from './axios-cancel'
import { checkStatus } from './check-status'
import { isArray, isValidURL, defaultMessage } from './utils'
import {
  type HttpClientConfig,
  type InternalHttpClientConfig,
  type PlusAxiosRequestConfig,
  type AxiosRequestConfigProp,
  type ErrorInfo,
  ContentTypeEnum,
  ResultEnum
} from './types'

export class HttpClient {
  private service: AxiosInstance
  private config: InternalHttpClientConfig
  private axiosCanceler = new AxiosCanceler()

  constructor(config: HttpClientConfig = {}) {
    // 设置默认配置
    this.config = {
      baseURL: config.baseURL || '',
      timeout: config.timeout || ResultEnum.TIMEOUT,
      withCredentials: config.withCredentials ?? true,
      tokenConfig: {
        key: config.tokenConfig?.key || 'token',
        getToken: config.tokenConfig?.getToken || (() => null),
        prefix: config.tokenConfig?.prefix || ''
      },
      urlMapping: config.urlMapping || {},
      loginUrl: config.loginUrl || '/login',
      loadingConfig: {
        showLoading: config.loadingConfig?.showLoading || (() => {}),
        hideLoading: config.loadingConfig?.hideLoading || (() => {})
      },
      messageConfig: {
        showError: config.messageConfig?.showError || defaultMessage.error,
        showSuccess: config.messageConfig?.showSuccess || defaultMessage.success
      },
      routerConfig: {
        push: config.routerConfig?.push || (() => {}),
        replace: config.routerConfig?.replace || (() => {})
      },
      errorLogConfig: {
        addErrorLog: config.errorLogConfig?.addErrorLog || (() => {})
      },
      userConfig: {
        logout: config.userConfig?.logout || (() => {})
      },
      successCode: config.successCode || ResultEnum.SUCCESS,
      overdueCode: config.overdueCode || ResultEnum.OVERDUE
    }

    // 创建 axios 实例
    this.service = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      withCredentials: this.config.withCredentials
    })

    this.setupInterceptors()
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.service.interceptors.request.use(
      (config: PlusAxiosRequestConfig) => {
        // 处理请求取消
        config.cancel ??= true
        config.cancel && this.axiosCanceler.addPending(config)

        // 处理全屏加载
        config.loading ??= true
        config.loading && this.config.loadingConfig.showLoading()

        // 处理 URL 映射
        config.headers?.mapping && this.processMappingUrl(config) && delete config.headers?.mapping

        // 处理 ContentType
        config.params?._type && config.method?.toLowerCase() === 'post' && this.processParamsType(config)
        config.params?._type === 'multi' && this.processArray(config)
        config.params && delete config.params._type

        // 处理 Token
        this.processToken(config)

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse & { config: PlusAxiosRequestConfig }) => {
        const { data, config } = response

        // 关闭加载
        config.loading && this.config.loadingConfig.hideLoading()
        // 取消请求
        this.axiosCanceler.removePending(config)

        // 处理登录过期
        if (data.code === this.config.overdueCode) {
          this.config.messageConfig.showError(data.message || '登录已过期')
          this.config.userConfig.logout()
          this.config.routerConfig.replace(this.config.loginUrl)
          return Promise.reject(data)
        }

        // 处理错误响应
        if (data.code && data.code !== this.config.successCode) {
          this.config.messageConfig.showError(data.message || '请求失败')
          return Promise.reject(data)
        }

        return data
      },
      async (error: AxiosError) => {
        const { response, config } = error

        this.config.loadingConfig.hideLoading()
        this.axiosCanceler.removePending(config as PlusAxiosRequestConfig)

        // 处理特定错误
        if (error.message === '身份异常') {
          this.config.messageConfig.showError('身份异常')
          return Promise.reject(error)
        }

        if (error.message.indexOf('timeout') !== -1) {
          this.config.messageConfig.showError('请求超时！请您稍后重试')
        } else if (error.message.indexOf('Network Error') !== -1) {
          this.config.messageConfig.showError('网络错误！请您稍后重试')
        }

        // 处理 HTTP 状态码错误
        if (response) {
          checkStatus(response.status, this.config.messageConfig)
        }

        // 处理离线状态
        if (!window.navigator.onLine) {
          this.config.routerConfig.replace('/500')
        }

        // 添加错误日志
        const errorInfo = this.processError(error)
        errorInfo && this.config.errorLogConfig.addErrorLog(errorInfo)

        return Promise.reject(error)
      }
    )
  }

  /**
   * 处理 Token
   */
  private processToken(config: InternalAxiosRequestConfig): void {
    const { key, getToken, prefix } = this.config.tokenConfig
    const token = getToken()
    if (token && key) {
      config.headers[key] = prefix ? `${prefix}${token}` : token
    }
  }

  /**
   * 处理 URL 映射
   */
  private processMappingUrl(config: InternalAxiosRequestConfig): boolean {
    const keys = Object.keys(this.config.urlMapping)
    let url = config.url || ''
    let prefix = ''
    let index = url.indexOf('/')

    if (index === 0) {
      const u = url.slice(1)
      index = u.indexOf('/')
      prefix = u.slice(0, index)
      index += 1
    } else {
      prefix = url.slice(0, index)
    }

    url = url.slice(index)
    for (const key of keys) {
      if (prefix === key) {
        config.url = this.config.urlMapping[key] + url
        config.baseURL = ''
        break
      }
    }
    return true
  }

  /**
   * 处理参数类型
   */
  private processParamsType(config: InternalAxiosRequestConfig): void {
    if (config.params?._type) {
      const type = config.params._type
      if (type === 'form') {
        config.headers['Content-Type'] = ContentTypeEnum.FORM_URLENCODED
        config.data = qs.stringify(config.data)
      } else if (type === 'file') {
        config.headers['Content-Type'] = ContentTypeEnum.FILE_FORM_DATA
      } else if (type === 'json') {
        config.headers['Content-Type'] = ContentTypeEnum.JSON
      } else if (type === 'info') {
        config.headers['Content-Type'] = ContentTypeEnum.Multi_FILE_FORM_DATA
      }
    } else {
      config.headers['Content-Type'] = ContentTypeEnum.JSON
      config.data = qs.stringify(config.data)
    }
  }

  /**
   * 处理数组参数
   */
  private processArray(config: InternalAxiosRequestConfig): void {
    let url = String(config.url)
    if (url.indexOf('?') !== -1) url += '&'
    else url += '?'

    const keys = Object.keys(config.params)
    for (const key of keys) {
      const value = config.params[key]
      if (value !== undefined && value !== null) {
        if (isArray(value)) {
          value.forEach((item: any) => {
            url += `${key}=${item}&`
          })
        } else {
          url += `${key}=${value}&`
        }
      }
    }

    config.params = {}
    config.url = url.slice(0, -1)
  }

  /**
   * 处理错误信息
   */
  private processError(error: AxiosError): ErrorInfo | null {
    try {
      const e = JSON.parse(JSON.stringify(error))
      if (Object.keys(e).includes('baseURL')) {
        const {
          config: { baseURL, url, params, method, data }
        } = JSON.parse(e)
        const requestURL = isValidURL(baseURL) ? baseURL + url : url
        let { message } = error
        message = message + '，token 不存在或者失效了'
        let stack = '您发送的请求为 ' + method.toUpperCase() + '，您请求的地址为 ' + requestURL
        if (params) stack = stack + '，请求携带的 params 为 ' + JSON.stringify(params)
        if (data) stack = stack + '，请求携带的 data 为 ' + JSON.stringify(data)

        return {
          error: {
            ...error,
            message,
            stack
          },
          vm: null,
          info: 'axios 请求错误',
          url: window.location.href,
          hasRead: false
        }
      }
    } catch {
      // 忽略解析错误
    }
    return null
  } /**
   * 更新配置
   */
  updateConfig(config: Partial<HttpClientConfig>): void {
    // 合并配置，确保类型安全
    if (config.baseURL !== undefined) {
      this.config.baseURL = config.baseURL
      this.service.defaults.baseURL = config.baseURL
    }
    if (config.timeout !== undefined) {
      this.config.timeout = config.timeout
      this.service.defaults.timeout = config.timeout
    }
    if (config.withCredentials !== undefined) {
      this.config.withCredentials = config.withCredentials
      this.service.defaults.withCredentials = config.withCredentials
    }
    if (config.tokenConfig) {
      if (config.tokenConfig.key !== undefined) {
        this.config.tokenConfig.key = config.tokenConfig.key
      }
      if (config.tokenConfig.getToken !== undefined) {
        this.config.tokenConfig.getToken = config.tokenConfig.getToken
      }
      if (config.tokenConfig.prefix !== undefined) {
        this.config.tokenConfig.prefix = config.tokenConfig.prefix
      }
    }
    if (config.urlMapping !== undefined) {
      this.config.urlMapping = config.urlMapping
    }
    if (config.loginUrl !== undefined) {
      this.config.loginUrl = config.loginUrl
    }
    if (config.loadingConfig) {
      if (config.loadingConfig.showLoading !== undefined) {
        this.config.loadingConfig.showLoading = config.loadingConfig.showLoading
      }
      if (config.loadingConfig.hideLoading !== undefined) {
        this.config.loadingConfig.hideLoading = config.loadingConfig.hideLoading
      }
    }
    if (config.messageConfig) {
      if (config.messageConfig.showError !== undefined) {
        this.config.messageConfig.showError = config.messageConfig.showError
      }
      if (config.messageConfig.showSuccess !== undefined) {
        this.config.messageConfig.showSuccess = config.messageConfig.showSuccess
      }
    }
    if (config.routerConfig) {
      if (config.routerConfig.push !== undefined) {
        this.config.routerConfig.push = config.routerConfig.push
      }
      if (config.routerConfig.replace !== undefined) {
        this.config.routerConfig.replace = config.routerConfig.replace
      }
    }
    if (config.errorLogConfig) {
      if (config.errorLogConfig.addErrorLog !== undefined) {
        this.config.errorLogConfig.addErrorLog = config.errorLogConfig.addErrorLog
      }
    }
    if (config.userConfig) {
      if (config.userConfig.logout !== undefined) {
        this.config.userConfig.logout = config.userConfig.logout
      }
    }
    if (config.successCode !== undefined) {
      this.config.successCode = config.successCode
    }
    if (config.overdueCode !== undefined) {
      this.config.overdueCode = config.overdueCode
    }
  }

  // HTTP 方法封装
  get<T>(url: string, params?: object, config = {}): Promise<T> {
    return this.service.get(url, { params, ...config })
  }

  post<T>(url: string, params?: object | string, config = {}): Promise<T> {
    return this.service.post(url, params, config)
  }

  put<T>(url: string, params?: object | string, config = {}): Promise<T> {
    return this.service.put(url, params, config)
  }

  delete<T>(url: string, params?: any, config = {}): Promise<T> {
    return this.service.delete(url, { params, ...config })
  }

  download(url: string, params?: object, config = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ...config, responseType: 'blob' })
  }

  request<T, R = any>(config: AxiosRequestConfigProp<R>): Promise<T> {
    return this.service(config) as unknown as Promise<T>
  }

  /**
   * 获取 axios 实例
   */
  getInstance(): AxiosInstance {
    return this.service
  }

  /**
   * 取消所有请求
   */
  cancelAllRequests(): void {
    this.axiosCanceler.removeAllPending()
  }
}
