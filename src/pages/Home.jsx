import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../features/products/services/productsApi";
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

  /** Producto promocional
   * Se selecciona de forma aleatoria para simular
   * comportamiento dinámico de eCommerce real
   */
  const randomProduct =
    products.length > 0
      ? products[Math.floor(Math.random() * products.length)]
      : null;

  return (
    <div className="min-h-screen bg-[var(--color-soft)]">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          
          {/* Texto principal */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[display] font-bold text-[var(--color-primary)] leading-tight">
              Bienvenido a <span className="text-[var(--color-accent)]">MiTienda</span>
            </h1>

            <p className="mt-4 text-[var(--color-muted)] max-w-xl">
              Explora una selección de productos, agrégalos a tu carrito y finaliza tu compra.
              Proyecto de práctica construido con React, Redux Toolkit, Tailwind y Firebase.
            </p>
          </div>

          {/* Bloque visual / beneficios */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-md">

              <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
                ¿Por qué elegir MiTienda?
              </h3>

              <ul className="flex flex-col gap-4 text-sm text-[var(--color-muted)]">

                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] text-lg">🚚</span>
                  <div>
                    <p className="font-medium text-[var(--color-primary)]">
                      Envíos rápidos
                    </p>
                    <p>Recibí tus productos en pocos días.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] text-lg">💳</span>
                  <div>
                    <p className="font-medium text-[var(--color-primary)]">
                      Pagos seguros
                    </p>
                    <p>Procesos protegidos con plataformas confiables.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] text-lg">🔄</span>
                  <div>
                    <p className="font-medium text-[var(--color-primary)]">
                      Devoluciones simples
                    </p>
                    <p>Comprá con tranquilidad, podés cambiar tu producto.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-accent)] text-lg">⭐</span>
                  <div>
                    <p className="font-medium text-[var(--color-primary)]">
                      Productos seleccionados
                    </p>
                    <p>Seleccionamos los mejores productos para vos.</p>
                  </div>
                </li>

              </ul>
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