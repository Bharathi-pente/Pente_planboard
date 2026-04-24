import { useState, useCallback } from 'react'

interface ModalState {
  isOpen: boolean
  data?: any
}

export function useModal<T = any>() {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    data: undefined,
  })

  const open = useCallback((data?: T) => {
    setState({ isOpen: true, data })
  }, [])

  const close = useCallback(() => {
    setState({ isOpen: false, data: undefined })
  }, [])

  const toggle = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
  }, [])

  return {
    isOpen: state.isOpen,
    data: state.data as T | undefined,
    open,
    close,
    toggle,
  }
}
