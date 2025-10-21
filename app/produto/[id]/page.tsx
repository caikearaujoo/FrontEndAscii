"use client"

import { useParams, useRouter } from "next/navigation"
import { useProduto } from "../../hooks/useProduto"
import { formatPrice } from "../../utils/formatters"
import LoadingSpinner from "../../components/LoadingSpinner"
import Link from "next/link"

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { produto, loading, error } = useProduto(id)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !produto) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-medium mb-2">Produto não encontrado</p>
        <p className="text-red-600 text-sm mb-4">{error || "O produto solicitado não existe."}</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar para Lista
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => router.back()} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2">
        ← Voltar
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{produto.nome}</h1>

        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-600 mb-1">Preço</p>
            <p className="text-3xl font-bold text-green-600">{formatPrice(produto.preco)}</p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-600 mb-1">Categoria</p>
            <p className="text-lg text-gray-900">{produto.categoria}</p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-600 mb-1">ID do Produto</p>
            <p className="text-lg text-gray-900 font-mono">{produto.id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Data de Criação</p>
            <p className="text-lg text-gray-900">
              {new Date(produto.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {produto.updatedAt && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Última Atualização</p>
              <p className="text-lg text-gray-900">
                {new Date(produto.updatedAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
