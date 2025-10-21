"use client"

import { useState, useEffect, useCallback } from "react"
import { getProdutos, type Produto } from "../services/produtoService"

export function useFetchProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProdutos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProdutos()
      setProdutos(data)
    } catch (err: any) {
      setError(err.response?.data?.message || "Não foi possível carregar os produtos. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProdutos()
  }, [fetchProdutos])

  return { produtos, loading, error, refetch: fetchProdutos }
}
