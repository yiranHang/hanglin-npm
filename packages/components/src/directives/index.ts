// Vue 指令工厂函数

/**
 * 创建点击外部指令
 */
export function createClickOutsideDirective() {
  return {
    name: 'click-outside',
    handler: (el: HTMLElement, callback: () => void) => {
      const handleClick = (event: Event) => {
        if (!el.contains(event.target as Node)) {
          callback()
        }
      }

      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
      }
    }
  }
}

/**
 * 创建防抖指令
 */
export function createDebounceDirective() {
  return {
    name: 'debounce',
    handler: (el: HTMLElement, callback: () => void, delay: number = 300) => {
      let timeoutId: ReturnType<typeof setTimeout> | null = null

      const handleEvent = () => {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(callback, delay)
      }

      el.addEventListener('click', handleEvent)

      return () => {
        el.removeEventListener('click', handleEvent)
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
      }
    }
  }
}

/**
 * 创建节流指令
 */
export function createThrottleDirective() {
  return {
    name: 'throttle',
    handler: (el: HTMLElement, callback: () => void, delay: number = 300) => {
      let isThrottled = false

      const handleEvent = () => {
        if (!isThrottled) {
          callback()
          isThrottled = true
          setTimeout(() => {
            isThrottled = false
          }, delay)
        }
      }

      el.addEventListener('click', handleEvent)

      return () => {
        el.removeEventListener('click', handleEvent)
      }
    }
  }
}

/**
 * 创建复制到剪贴板指令
 */
export function createCopyDirective() {
  return {
    name: 'copy',
    handler: (el: HTMLElement, text: string) => {
      const handleClick = async () => {
        try {
          await navigator.clipboard.writeText(text)
          // 可以添加成功提示
          console.log('复制成功')
        } catch (err) {
          console.error('复制失败:', err)
        }
      }

      el.addEventListener('click', handleClick)

      return () => {
        el.removeEventListener('click', handleClick)
      }
    }
  }
}

/**
 * 创建长按指令
 */
export function createLongPressDirective() {
  return {
    name: 'long-press',
    handler: (el: HTMLElement, callback: () => void, duration: number = 500) => {
      let pressTimer: ReturnType<typeof setTimeout> | null = null

      const start = () => {
        pressTimer = setTimeout(callback, duration)
      }

      const cancel = () => {
        if (pressTimer) {
          clearTimeout(pressTimer)
          pressTimer = null
        }
      }

      el.addEventListener('mousedown', start)
      el.addEventListener('mouseup', cancel)
      el.addEventListener('mouseleave', cancel)
      el.addEventListener('touchstart', start)
      el.addEventListener('touchend', cancel)
      el.addEventListener('touchcancel', cancel)

      return () => {
        el.removeEventListener('mousedown', start)
        el.removeEventListener('mouseup', cancel)
        el.removeEventListener('mouseleave', cancel)
        el.removeEventListener('touchstart', start)
        el.removeEventListener('touchend', cancel)
        el.removeEventListener('touchcancel', cancel)
        cancel()
      }
    }
  }
}

/**
 * 创建焦点陷阱指令
 */
export function createFocusTrapDirective() {
  return {
    name: 'focus-trap',
    handler: (el: HTMLElement) => {
      const focusableElements = el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      el.addEventListener('keydown', handleKeyDown)

      // 初始焦点
      if (firstElement) {
        firstElement.focus()
      }

      return () => {
        el.removeEventListener('keydown', handleKeyDown)
      }
    }
  }
}
