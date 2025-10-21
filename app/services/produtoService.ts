// src/services/produtoService.ts

// 1. REMOVA a importação do 'axios' puro
// import axios from "axios";

// 2. IMPORTE a sua instância 'api' configurada do arquivo api.ts
// (Ajuste o caminho se for diferente, ex: '../api' ou './api')
import api from "./api";

// 3. REMOVA a criação da instância duplicada
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
// });

// A interface não muda
export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  createdAt: string;
  updatedAt?: string;
}

// O resto do seu código já usava 'api',
// então agora ele vai usar a instância importada e correta.
export const getProdutos = async (): Promise<Produto[]> => {
  const response = await api.get<Produto[]>("/produtos");
  return response.data;
};

export const getProdutoById = async (id: string): Promise<Produto> => {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
};

export const createProduto = async (
  produto: Omit<Produto, "id" | "createdAt" | "updatedAt">
): Promise<Produto> => {
  const response = await api.post<Produto>("/produtos", produto);
  return response.data;
};

export const updateProduto = async (
  id: string,
  produto: Omit<Produto, "id" | "createdAt" | "updatedAt">
): Promise<Produto> => {
  const response = await api.put<Produto>(`/produtos/${id}`, produto);
  return response.data;
};

export const deleteProduto = async (id: string): Promise<void> => {
  await api.delete(`/produtos/${id}`);
};

// 4. REMOVA esta exportação
// O 'api.ts' é quem exporta a instância, este arquivo só a consome.
// export default api;
