"use client"

import Link from "next/link"
import { formatPrice } from "../utils/formatters"
import type { Produto } from "../services/produtoService"

interface ProductCardProps {
  product: Produto
  onEdit: (product: Produto) => void
  onDelete: (product: Produto) => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <Link href={`/produto/${product.id}`} className="block mb-3">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">{product.nome}</h3>
      </Link>
      <div className="space-y-2 mb-4">
        <p className="text-2xl font-bold text-green-600">{formatPrice(product.preco)}</p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Categoria:</span> {product.categoria}
        </p>
        <p className="text-xs text-gray-500">Criado em: {new Date(product.createdAt).toLocaleDateString("pt-BR")}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex-1 px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          Deletar
        </button>
      </div>
    </div>
  )
}
