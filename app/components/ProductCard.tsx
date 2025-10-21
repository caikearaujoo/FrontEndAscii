"use client";

import Link from "next/link";
import { formatPrice } from "../utils/formatters";
import type { Produto } from "../services/produtoService";

interface ProductCardProps {
  product: Produto;
  onEdit: (product: Produto) => void;
  onDelete: (product: Produto) => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/produto/${product.id}`} className="block group">
        {/* --- INÍCIO DO BLOCO DE IMAGEM ADICIONADO --- */}
        <div className="relative w-full aspect-video bg-gray-100">
          {product.imagemUrl ? (
            // 1. Se TEM a URL, mostra a imagem
            <img
              src={product.imagemUrl}
              alt={product.nome}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            // 2. Se a URL for 'null', mostra o placeholder
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 animate-pulse">
              <span className="text-gray-500 text-sm">Gerando imagem...</span>
              <span className="text-gray-400 text-xs">(aguarde)</span>
            </div>
          )}
        </div>
        {/* --- FIM DO BLOCO DE IMAGEM --- */}

        {/* Movi o título para dentro do Link também */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.nome}
          </h3>
        </div>
      </Link>

      {/* O resto do conteúdo fica fora do link */}
      <div className="px-4 pb-4">
        <div className="space-y-2 mb-4">
          <p className="text-2xl font-bold text-green-600">
            {formatPrice(product.preco)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Categoria:</span> {product.categoria}
          </p>
          <p className="text-xs text-gray-500">
            Criado em: {new Date(product.createdAt).toLocaleDateString("pt-BR")}
          </p>
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
    </div>
  );
}
