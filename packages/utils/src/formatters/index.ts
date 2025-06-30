// 格式化工具函数

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 格式化数字，添加千分位分隔符
 */
export function formatNumber(num: number, separator: string = ','): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

/**
 * 格式化货币
 */
export function formatCurrency(amount: number, currency: string = '¥', decimals: number = 2): string {
  const formatted = amount.toFixed(decimals)
  return `${currency}${formatNumber(parseFloat(formatted))}`
}

/**
 * 格式化百分比
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * 格式化日期
 */
export function formatDate(date: Date | string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = new Date(date)

  if (isNaN(d.getTime())) {
    return 'Invalid Date'
  }

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化相对时间
 */
export function formatRelativeTime(date: Date | string | number): string {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

  if (diffInSeconds < 60) return '刚刚'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}天前`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}个月前`

  return `${Math.floor(diffInSeconds / 31536000)}年前`
}

/**
 * 格式化手机号码
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
  }

  return phone
}

/**
 * 格式化银行卡号
 */
export function formatBankCard(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '')
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

/**
 * 脱敏处理 - 手机号
 */
export function maskPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  if (digits.length === 11) {
    return digits.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }

  return phone
}

/**
 * 脱敏处理 - 邮箱
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@')

  if (!username || !domain) return email

  const maskedUsername = username.length > 2 ? username.slice(0, 2) + '*'.repeat(username.length - 2) : username

  return `${maskedUsername}@${domain}`
}

/**
 * 脱敏处理 - 身份证号
 */
export function maskIdCard(idCard: string): string {
  if (idCard.length < 8) return idCard

  return idCard.slice(0, 4) + '*'.repeat(idCard.length - 8) + idCard.slice(-4)
}
