import api from "./api";

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  createdAt: string;
  updatedAt?: string;
  imagemUrl: string | null;
}

export const getProdutos = async (): Promise<Produto[]> => {
  // Adiciona um "cache buster"
  const response = await api.get<Produto[]>(
    `/produtos?_t=${new Date().getTime()}`
  );
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
