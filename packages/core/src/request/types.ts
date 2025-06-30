import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export interface HttpClientConfig {
  /** 基础URL */
  baseURL?: string
  /** 请求超时时间 */
  timeout?: number
  /** 是否允许跨域携带凭证 */
  withCredentials?: boolean
  /** Token 配置 */
  tokenConfig?: {
    /** Token 的键名，默认为 'token' */
    key?: string
    /** 获取 Token 的函数 */
    getToken?: () => string | null
    /** Token 前缀，如 'Bearer ' */
    prefix?: string
  }
  /** URL 映射配置 */
  urlMapping?: Record<string, string>
  /** 登录页面 URL */
  loginUrl?: string
  /** 全屏加载配置 */
  loadingConfig?: {
    /** 显示全屏加载的函数 */
    showLoading?: () => void
    /** 隐藏全屏加载的函数 */
    hideLoading?: () => void
  }
  /** 消息提示配置 */
  messageConfig?: {
    /** 显示错误消息的函数 */
    showError?: (message: string) => void
    /** 显示成功消息的函数 */
    showSuccess?: (message: string) => void
  }
  /** 路由配置 */
  routerConfig?: {
    /** 路由跳转函数 */
    push?: (path: string) => void
    /** 路由替换函数 */
    replace?: (path: string) => void
  }
  /** 错误日志配置 */
  errorLogConfig?: {
    /** 添加错误日志的函数 */
    addErrorLog?: (error: any) => void
  }
  /** 用户状态配置 */
  userConfig?: {
    /** 用户登出函数 */
    logout?: () => void
  }
  /** 成功状态码 */
  successCode?: number
  /** 登录过期状态码 */
  overdueCode?: number
}

// 内部使用的完整配置类型，确保所有必需的函数都存在
export interface InternalHttpClientConfig {
  baseURL: string
  timeout: number
  withCredentials: boolean
  tokenConfig: {
    key: string
    getToken: () => string | null
    prefix: string
  }
  urlMapping: Record<string, string>
  loginUrl: string
  loadingConfig: {
    showLoading: () => void
    hideLoading: () => void
  }
  messageConfig: {
    showError: (message: string) => void
    showSuccess: (message: string) => void
  }
  routerConfig: {
    push: (path: string) => void
    replace: (path: string) => void
  }
  errorLogConfig: {
    addErrorLog: (error: any) => void
  }
  userConfig: {
    logout: () => void
  }
  successCode: number
  overdueCode: number
}

export interface PlusAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
  cancel?: boolean
}

export type HttpMethod = 'get' | 'post' | 'delete' | 'put' | 'download'

export type AxiosRequestConfigProp<D = any> = AxiosRequestConfig<D> & {
  method: HttpMethod
}

export interface ErrorInfo {
  error: any
  vm: any
  info: string
  url: string
  hasRead: boolean
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FILE_FORM_DATA = 'multipart/form-data;charset=UTF-8',
  // 传输数据为二进制类型，如：图片、MP3、文件
  Multi_FILE_FORM_DATA = 'multipart/form-data'
}

export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000
}
