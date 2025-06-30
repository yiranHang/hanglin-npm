// Vue Composables (需要在安装了 Vue 的环境中使用)

/**
 * 使用本地存储 (非响应式版本)
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer = {
    read: (value: string) => JSON.parse(value),
    write: (value: T) => JSON.stringify(value)
  }
) {
  let currentValue = defaultValue

  // 初始化
  try {
    const item = localStorage.getItem(key)
    if (item) {
      currentValue = serializer.read(item)
    }
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
  }

  const getValue = () => currentValue

  const setValue = (newValue: T) => {
    currentValue = newValue
    try {
      localStorage.setItem(key, serializer.write(newValue))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return {
    getValue,
    setValue
  }
}

/**
 * 使用计数器
 */
export function useCounter(initialValue: number = 0) {
  let count = initialValue

  const increment = (step: number = 1) => {
    count += step
    return count
  }

  const decrement = (step: number = 1) => {
    count -= step
    return count
  }

  const reset = () => {
    count = initialValue
    return count
  }

  const getValue = () => count

  return {
    getValue,
    increment,
    decrement,
    reset
  }
}

/**
 * 使用切换状态
 */
export function useToggle(initialValue: boolean = false) {
  let state = initialValue

  const toggle = () => {
    state = !state
    return state
  }

  const setTrue = () => {
    state = true
    return state
  }

  const setFalse = () => {
    state = false
    return state
  }

  const getValue = () => state

  return {
    getValue,
    toggle,
    setTrue,
    setFalse
  }
}

/**
 * 使用定时器
 */
export function useInterval(callback: () => void, delay: number | null) {
  let intervalId: ReturnType<typeof setInterval> | null = null

  const start = () => {
    if (delay !== null && !intervalId) {
      intervalId = setInterval(callback, delay)
    }
  }

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    start,
    stop
  }
}

/**
 * 使用鼠标位置
 */
export function useMouse() {
  let x = 0
  let y = 0
  let isListening = false

  const update = (event: MouseEvent) => {
    x = event.clientX
    y = event.clientY
  }

  const start = () => {
    if (!isListening) {
      window.addEventListener('mousemove', update)
      isListening = true
    }
  }

  const stop = () => {
    if (isListening) {
      window.removeEventListener('mousemove', update)
      isListening = false
    }
  }

  const getPosition = () => ({ x, y })

  return {
    getPosition,
    start,
    stop
  }
}
