// 验证器函数

/**
 * 验证邮箱地址
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号码 (中国大陆)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证身份证号码 (中国大陆)
 */
export function isValidIdCard(idCard: string): boolean {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

/**
 * 验证 URL
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
 * 验证 IP 地址 (IPv4)
 */
export function isValidIPv4(ip: string): boolean {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ip)
}

/**
 * 验证密码强度
 * @param password 密码
 * @param minLength 最小长度，默认 8
 * @param requireSpecial 是否需要特殊字符，默认 true
 */
export function isStrongPassword(password: string, minLength: number = 8, requireSpecial: boolean = true): boolean {
  if (password.length < minLength) return false

  const hasLowerCase = /[a-z]/.test(password)
  const hasUpperCase = /[A-Z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const basicRequirements = hasLowerCase && hasUpperCase && hasNumbers

  return requireSpecial ? basicRequirements && hasSpecialChar : basicRequirements
}

/**
 * 验证银行卡号 (Luhn 算法)
 */
export function isValidBankCard(cardNumber: string): boolean {
  // 移除所有非数字字符
  const digits = cardNumber.replace(/\D/g, '')

  if (digits.length < 13 || digits.length > 19) return false

  // Luhn 算法
  let sum = 0
  let alternate = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10)

    if (alternate) {
      digit *= 2
      if (digit > 9) {
        digit = Math.floor(digit / 10) + (digit % 10)
      }
    }

    sum += digit
    alternate = !alternate
  }

  return sum % 10 === 0
}

/**
 * 验证颜色值 (hex)
 */
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return hexRegex.test(color)
}

/**
 * 验证域名
 */
export function isValidDomain(domain: string): boolean {
  const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
  return domainRegex.test(domain)
}
