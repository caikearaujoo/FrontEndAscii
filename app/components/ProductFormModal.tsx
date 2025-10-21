"use client"

import type React from "react"
import { useState, useEffect } from "react"
import LoadingSpinner from "./LoadingSpinner"
import type { Produto } from "../services/produtoService"

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Produto, "id" | "createdAt" | "updatedAt">) => void
  product?: Produto | null
  isLoading: boolean
}

export default function ProductFormModal({ isOpen, onClose, onSubmit, product, isLoading }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    categoria: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (product) {
      setFormData({
        nome: product.nome || "",
        preco: product.preco?.toString() || "",
        categoria: product.categoria || "",
      })
    } else {
      setFormData({ nome: "", preco: "", categoria: "" })
    }
    setErrors({})
  }, [product, isOpen])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    }

    if (!formData.preco) {
      newErrors.preco = "Preço é obrigatório"
    } else if (Number.parseFloat(formData.preco) <= 0) {
      newErrors.preco = "Preço deve ser maior que zero"
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = "Categoria é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        nome: formData.nome,
        preco: Number.parseFloat(formData.preco),
        categoria: formData.categoria,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" role="dialog" aria-modal="true">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{product ? "Editar Produto" : "Novo Produto"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.nome ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
          </div>

          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
              Preço (R$) *
            </label>
            <input
              type="number"
              id="preco"
              name="preco"
              step="0.01"
              value={formData.preco}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.preco ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.preco && <p className="mt-1 text-sm text-red-600">{errors.preco}</p>}
          </div>

          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.categoria ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.categoria && <p className="mt-1 text-sm text-red-600">{errors.categoria}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : product ? "Atualizar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
