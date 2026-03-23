import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/** API de productos utilizando RTK Query.
 *
 * Responsabilidades:
 * - Definir endpoints para obtener datos de productos desde la API
 * - Gestionar automáticamente cache, estados de loading y errores
 * - Exponer hooks listos para usar en componentes React
 *
 */
export const productsApi = createApi({

  /**  Clave donde se almacenará el estado de esta API dentro del store.
   * Ej: state.productsApi
   */
  reducerPath: "productsApi",

  /** Configuración base para todas las requests.
   *
   * fetchBaseQuery es un wrapper de fetch que simplifica llamadas HTTP.
   * baseUrl se concatena automáticamente con cada endpoint definido.
   */
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://fakestoreapi.com/",
  }),
  
  /** Definición de endpoints.
   *
   * builder permite crear queries (GET) y mutations (POST, PUT, DELETE).
   */
  endpoints: (builder) => ({

    /** Obtiene la lista completa de productos.
     *
     * Uso:
     * const { data, isLoading, error } = useGetProductsQuery();
     */
    getProducts: builder.query({
      query: () => "products",
    }),

    /** Obtiene un producto específico por ID.
     *
     * Uso:
     * const { data, isLoading } = useGetProductByIdQuery(id);
     */
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

/** Hooks generados automáticamente por RTK Query.
 *
 * Permiten consumir los endpoints directamente en componentes React,
 * manejando internamente:
 * - loading
 * - error
 * - data
 * - cache
 */
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;