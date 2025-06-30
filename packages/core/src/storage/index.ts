// localStorage 工具函数

/**
 * 安全地获取 localStorage 中的值
 */
export function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.warn('Failed to get item from localStorage:', error)
    return null
  }
}

/**
 * 安全地设置 localStorage 中的值
 */
export function setItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.warn('Failed to set item to localStorage:', error)
    return false
  }
}

/**
 * 安全地删除 localStorage 中的值
 */
export function removeItem(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.warn('Failed to remove item from localStorage:', error)
    return false
  }
}

/**
 * 获取并解析 JSON 数据
 */
export function getJSON<T>(key: string): T | null {
  try {
    const value = getItem(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    console.warn('Failed to parse JSON from localStorage:', error)
    return null
  }
}

/**
 * 设置 JSON 数据
 */
export function setJSON<T>(key: string, value: T): boolean {
  try {
    return setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('Failed to stringify JSON to localStorage:', error)
    return false
  }
}

/**
 * 清空所有 localStorage
 */
export function clear(): boolean {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.warn('Failed to clear localStorage:', error)
    return false
  }
}
