"use client"

import { useToast } from "../contexts/ToastContext"

export default function Toast() {
  const { toast, hideToast } = useToast()

  if (!toast) return null

  const bgColor = toast.type === "success" ? "bg-green-500" : "bg-red-500"

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
        <span>{toast.message}</span>
        <button
          onClick={hideToast}
          className="text-white hover:text-gray-200 font-bold"
          aria-label="Fechar notificação"
        >
          ×
        </button>
      </div>
    </div>
  )
}
