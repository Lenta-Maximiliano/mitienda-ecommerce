import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../features/products/productsApi";
import ProductCard from "../features/products/components/ProductCard";

/** Home
 *
 * Página principal de la aplicación.
 *
 * Responsabilidades:
 * - Mostrar información introductoria (hero)
 * - Obtener productos desde la API
 * - Mostrar una selección de productos destacados
 */
export default function Home() {
  
  /** Fetch de productos con RTK Query
   *
   * data: lista de productos (fallback a array vacío)
   * isLoading: estado de carga
   * error: error de la request
   */
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  // Selecciona los primeros 4 productos como destacados
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--color-soft)]">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[display] font-bold text-[var(--color-primary)] leading-tight">
              Bienvenido a <span className="text-[var(--color-accent)]">MiTienda</span>
            </h1>

            <p className="mt-4 text-[var(--color-muted)] max-w-xl">
              Explora una selección de productos, agrégalos a tu carrito y finaliza tu compra.
              Proyecto de práctica construido con React, Redux Toolkit, Tailwind y Firebase.
            </p>
          </div>

          {/* Bloque visual / promocional */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                Oferta destacada
              </h3>
              <p className="text-[var(--color-muted)] mt-2">
                Podés mostrar aquí un producto destacado o una promoción especial.
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section>
          <div className="flex items-center justify-between mb-4">

            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
              Destacados
            </h2>

            {/* Navegación a listado completo */}
            <Link 
              to="/products" 
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              Ver todos
            </Link>
          </div>

          {/* Estados de la request */}
          {isLoading ? (
            <p className="text-[var(--color-muted)]">Cargando productos...</p>
          ) : error ? (
            <p className="text-red-600">Error al cargar productos</p>
          ) : (
            
            // Grid de productos destacados
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}