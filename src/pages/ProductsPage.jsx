import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../services/productsApi";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { data: products = [], error, isLoading } = useGetProductsQuery();
  const location = useLocation();

  const [sortOrder, setSortOrder] = useState("");

  // leemos ?search=... de la URL
  const params = new URLSearchParams(location.search);
  const rawSearch = params.get("search") ?? "";
  const searchTerm = rawSearch.trim().toLowerCase();

  // filtrado memoizado (title, category, description)
  const displayed = useMemo(() => {
    if (!searchTerm) return products;

    return products.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const category = (p.category || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();

      return (
        title.includes(searchTerm) ||
        category.includes(searchTerm) ||
        desc.includes(searchTerm)
      );
    });
  }, [products, searchTerm]);

  // orden
  const sortedProducts = useMemo(() => {
    const arr = [...displayed];

    if (sortOrder === "asc") return arr.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return arr.sort((a, b) => b.price - a.price);

    return arr;
  }, [displayed, sortOrder]);

  if (isLoading) return <p className="p-6">Cargando productos...</p>;
  if (error) return <p className="p-6">Error al cargar productos</p>;

  return (
    <div className="max-w-7xl mx-auto p-5">
      {/* selector de orden */}
      <div className="mb-4 flex gap-2 items-center">
        <label className="text-sm text-gray-600">Ordenar por:</label>
        <select
          className="border px-2 py-1 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sin ordenar</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </div>

      {/* resultados */}
      {sortedProducts.length === 0 ? (
        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-600">No se encontraron productos.</p>
        </div>
      ) : (
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}