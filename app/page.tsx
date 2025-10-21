"use client";

import { useState } from "react";
import { useFetchProdutos } from "./hooks/useFetchProdutos";
import {
  deleteProduto,
  createProduto,
  updateProduto,
  type Produto,
} from "./services/produtoService";
import { useToast } from "./contexts/ToastContext";
import ProductTable from "./components/ProductTable";
import ProductCard from "./components/ProductCard";
import ProductFormModal from "./components/ProductFormModal";
import ConfirmModal from "./components/ConfirmModal";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";

export default function HomePage() {
  const { produtos, loading, error, refetch } = useFetchProdutos();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [productToDelete, setProductToDelete] = useState<Produto | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const filteredProducts = produtos.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Produto) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product: Produto) => {
    setProductToDelete(product);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduto(productToDelete.id);
      showToast("Produto deletado com sucesso!", "success");
      refetch();
      setIsConfirmOpen(false);
      setProductToDelete(null);
    } catch (err) {
      showToast("Erro ao deletar produto. Tente novamente.", "error");
    }
  };

  const handleFormSubmit = async (
    formData: Omit<Produto, "id" | "createdAt" | "updatedAt">
  ) => {
    setIsSubmitting(true);
    try {
      if (selectedProduct) {
        await updateProduto(selectedProduct.id, formData);
        showToast("Produto atualizado com sucesso!", "success");
      } else {
        await createProduto(formData);
        showToast("Produto criado com sucesso!", "success");
      }
      refetch();
      setIsFormOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      showToast("Erro ao salvar produto. Tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-medium mb-2">
          Erro ao carregar produtos
        </p>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar produtos por nome..."
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() =>
              setViewMode(viewMode === "table" ? "cards" : "table")
            }
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Alternar visualização"
          >
            {viewMode === "table" ? "Cards" : "Tabela"}
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Novo Produto
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg">
            {searchTerm
              ? "Nenhum produto encontrado com esse nome."
              : "Nenhum produto cadastrado."}
          </p>
          {!searchTerm && (
            <button
              onClick={handleCreate}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Criar Primeiro Produto
            </button>
          )}
        </div>
      ) : viewMode === "table" ? (
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleFormSubmit}
        product={selectedProduct}
        isLoading={isSubmitting}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja deletar o produto "${productToDelete?.nome}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  );
}
