"use client"

// Versão simplificada do hook use-toast
import { useState } from "react"

type ToastProps = {
  title: string
  description?: string
  type?: "default" | "success" | "error" | "warning"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    setToasts((prev) => [...prev, props])

    // Remover o toast após 3 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== props))
    }, 3000)
  }

  return { toast, toasts }
}
