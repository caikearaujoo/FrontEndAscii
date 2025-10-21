import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ToastProvider } from "./contexts/ToastContext"
import Toast from "./components/Toast"

export const metadata: Metadata = {
  title: "Gerenciamento de Produtos",
  description: "Sistema de gerenciamento de produtos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Produtos</h1>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
          </div>
          <Toast />
        </ToastProvider>
      </body>
    </html>
  )
}
