import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../features/products/services/productsApi";
import ProductCard from "../features/products/components/ProductCard";

/** Página de listado de productos.
 *
 * Responsabilidades:
 * - Obtener productos desde la API (RTK Query)
 * - Leer parámetros de búsqueda desde la URL (?search=...)
 * - Filtrar productos en base al término de búsqueda
 * - Ordenar productos por precio (asc/desc)
 * - Renderizar lista de productos o estados alternativos (loading, error, vacío)
 *
 * Este componente NO maneja lógica de negocio compleja ni persistencia.
 * Se enfoca en transformar y presentar datos.
 */
export default function ProductsPage() {

  /** Hook de RTK Query para obtener productos.
   *
   * data: lista de productos (default [])
   * error: error de la request
   * isLoading: estado de carga
   */
  const { data: products = [], error, isLoading } = useGetProductsQuery();

  /** Hook de React Router para acceder a la URL actual.
   * Se utiliza para leer query params (ej: ?search=...)
   */
  const location = useLocation();

  /** Estado local para controlar el orden de los productos.
   * "" → sin ordenar
   * "asc" → menor a mayor
   * "desc" → mayor a menor
   */
  const [sortOrder, setSortOrder] = useState("");

  /** Parseo de query params desde la URL.
   *
   * Ejemplo:
   * /products?search=camiseta
   */
  const params = new URLSearchParams(location.search);

  /** Obtiene el valor del parámetro "search".
   * Se normaliza:
   * - trim(): elimina espacios
   * - toLowerCase(): comparación case-insensitive
   */
  const rawSearch = params.get("search") ?? "";
  const searchTerm = rawSearch.trim().toLowerCase();

   /** Filtrado memoizado de productos.
   *
   * Se ejecuta SOLO cuando cambian:
   * - products
   * - searchTerm
   *
   * Se filtra por:
   * - title
   * - category
   * - description
   *
   * Se aplican valores por defecto para evitar errores (undefined).
   */
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

  /** Ordenamiento memoizado de productos.
   *
   * Se ejecuta SOLO cuando cambian:
   * - displayed (productos filtrados)
   * - sortOrder
   *
   * Se clona el array para evitar mutaciones directas.
   */
  const sortedProducts = useMemo(() => {
    const arr = [...displayed];

    if (sortOrder === "asc") return arr.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return arr.sort((a, b) => b.price - a.price);

    return arr;
  }, [displayed, sortOrder]);

  /** Estados de UI:
   * - loading
   * - error
   */
  if (isLoading) return <p className="p-6">Cargando productos...</p>;
  if (error) return <p className="p-6">Error al cargar productos</p>;

  return (
    <div className="max-w-7xl mx-auto p-5">
      
      {/* Selector de ordenamiento */}
      <div className="mb-4 flex gap-2 items-center">
        <label
          htmlFor="sort-products"
          className="text-sm text-gray-600"
        >
          Ordenar por:
        </label>

        <select
          id="sort-products"
          name="sort"
          className="border px-2 py-1 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sin ordenar</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </div>

      {/* Renderizado de resultados */}
      {sortedProducts.length === 0 ? (
        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-600">
            No se encontraron productos.
          </p>
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