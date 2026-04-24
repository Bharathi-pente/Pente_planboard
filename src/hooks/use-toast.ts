import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

let toastCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3000) => {
      const id = `toast-${toastCounter++}`
      const newToast: Toast = { id, message, type, duration }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
      }

      return id
    },
    []
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = useCallback(
    (message: string, duration?: number) => toast(message, 'success', duration),
    [toast]
  )

  const error = useCallback(
    (message: string, duration?: number) => toast(message, 'error', duration),
    [toast]
  )

  const warning = useCallback(
    (message: string, duration?: number) => toast(message, 'warning', duration),
    [toast]
  )

  const info = useCallback(
    (message: string, duration?: number) => toast(message, 'info', duration),
    [toast]
  )

  return {
    toasts,
    toast,
    dismiss,
    success,
    error,
    warning,
    info,
  }
}
