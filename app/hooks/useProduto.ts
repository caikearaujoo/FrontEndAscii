"use client"

import { useState, useEffect } from "react"
import { getProdutoById, type Produto } from "../services/produtoService"

export function useProduto(id: string) {
  const [produto, setProduto] = useState<Produto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProdutoById(id)
        setProduto(data)
      } catch (err: any) {
        setError(err.response?.data?.message || "Não foi possível carregar o produto.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduto()
    }
  }, [id])

  return { produto, loading, error }
}
