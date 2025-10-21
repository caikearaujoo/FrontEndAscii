"use client"

import Link from "next/link"
import { formatPrice } from "../utils/formatters"
import type { Produto } from "../services/produtoService"

interface ProductTableProps {
  products: Produto[]
  onEdit: (product: Produto) => void
  onDelete: (product: Produto) => void
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Criado em
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/produto/${product.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  {product.nome}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-semibold text-green-600">{formatPrice(product.preco)}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.categoria}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(product.createdAt).toLocaleDateString("pt-BR")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onEdit(product)} className="text-blue-600 hover:text-blue-900 mr-4">
                  Editar
                </button>
                <button onClick={() => onDelete(product)} className="text-red-600 hover:text-red-900">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
