// 通用 Hooks

/**
 * 使用事件监听器
 */
export function useEventListener<T extends keyof WindowEventMap>(
  target: Window | HTMLElement,
  event: T,
  handler: (event: WindowEventMap[T]) => void,
  options?: boolean | AddEventListenerOptions
) {
  let isListening = false

  const add = () => {
    if (!isListening) {
      target.addEventListener(event, handler as EventListener, options)
      isListening = true
    }
  }

  const remove = () => {
    if (isListening) {
      target.removeEventListener(event, handler as EventListener, options)
      isListening = false
    }
  }

  return {
    add,
    remove
  }
}

/**
 * 使用异步状态
 */
export function useAsyncState<T>(promise: () => Promise<T>, initialState?: T) {
  let data: T | undefined = initialState
  let error: Error | null = null
  let loading = false

  const execute = async (): Promise<T | undefined> => {
    loading = true
    error = null

    try {
      data = await promise()
      return data
    } catch (err) {
      error = err instanceof Error ? err : new Error(String(err))
      throw error
    } finally {
      loading = false
    }
  }

  const getState = () => ({
    data,
    error,
    loading
  })

  return {
    execute,
    getState
  }
}

/**
 * 使用防抖值
 */
export function useDebouncedValue<T>(getValue: () => T, delay: number = 300) {
  let debouncedValue: T = getValue()
  let timeoutId: number | null = null

  const updateValue = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      debouncedValue = getValue()
    }, delay)
  }

  const getDebouncedValue = () => debouncedValue

  return {
    updateValue,
    getDebouncedValue
  }
}

/**
 * 使用网络状态
 */
export function useNetworkStatus() {
  let isOnline = navigator.onLine

  const updateOnlineStatus = () => {
    isOnline = navigator.onLine
  }

  const startListening = () => {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  }

  const stopListening = () => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  }

  const getStatus = () => ({
    isOnline,
    isOffline: !isOnline
  })

  return {
    getStatus,
    startListening,
    stopListening
  }
}

/**
 * 使用窗口大小
 */
export function useWindowSize() {
  let width = window.innerWidth
  let height = window.innerHeight

  const updateSize = () => {
    width = window.innerWidth
    height = window.innerHeight
  }

  const startListening = () => {
    window.addEventListener('resize', updateSize)
  }

  const stopListening = () => {
    window.removeEventListener('resize', updateSize)
  }

  const getSize = () => ({
    width,
    height
  })

  return {
    getSize,
    startListening,
    stopListening
  }
}

/**
 * 使用媒体查询
 */
export function useMediaQuery(query: string) {
  const mediaQuery = window.matchMedia(query)
  let matches = mediaQuery.matches

  const updateMatches = (event: MediaQueryListEvent) => {
    matches = event.matches
  }

  const startListening = () => {
    mediaQuery.addEventListener('change', updateMatches)
  }

  const stopListening = () => {
    mediaQuery.removeEventListener('change', updateMatches)
  }

  const getMatches = () => matches

  return {
    getMatches,
    startListening,
    stopListening
  }
}
