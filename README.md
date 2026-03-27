# 🛍️ MiTienda - eCommerce con React

## Preview
(Agregar screenshots o GIFs para mostrar la app en acción)

---

## Descripción

**MiTienda** es una aplicación eCommerce moderna desarrollada con **React**, **Redux Toolkit**, **Tailwind CSS** y **Firebase**.  
Permite a los usuarios explorar productos, agregarlos al carrito, autenticarse y realizar un checkout simulado.  
Los productos se obtienen dinámicamente desde la **[FakeStore API](https://fakestoreapi.com/)** para simular un entorno real de comercio electrónico.

---

## Tabla de Contenidos

- [Enlaces](#enlaces)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Aprendizajes](#aprendizajes)
- [Ejemplo de Código](#ejemplo-de-código)
- [Futuras Mejoras](#futuras-mejoras)
- [Autor](#autor)
- [¿Cómo Ejecutar Localmente?](#cómo-ejecutar-localmente)

---

## Enlaces

- **URL del Sitio en Vivo**: [Ver sitio aquí](https://mitienda-ecommerce01.netlify.app/)

---

## Tecnologías Utilizadas

- **React** – Librería principal para la interfaz de usuario  
- **Redux Toolkit + RTK Query** – Manejo del estado global (carrito y autenticación)  
- **Tailwind CSS** – Estilos rápidos y consistentes con una paleta personalizada  
- **Firebase (Auth + Firestore)** – Autenticación y base de datos Firestore  
- **FakeStore API** – Fuente de datos para los productos del catálogo
- **Vite** – Entorno de desarrollo rápido y moderno  

---

## Características

- **Exploración de productos** con datos obtenidos dinámicamente desde la FakeStore API.  
- **Carrito de compras** con control de cantidad, eliminación de productos y persistencia del estado.  
- **Autenticación de usuarios** con Firebase (registro, login y logout).  
- **Checkout simulado** con resumen de compra y validación de usuario autenticado.  
- **Diseño completamente responsive** optimizado para mobile, tablet y desktop.  
- **Interfaz limpia y moderna** con Tailwind CSS y una paleta de colores personalizada.
- **Barra de búsqueda** con debounce y filtrado local

---

## Arquitectura

```bash 
src/
├── components/
│   └── layout/
│       ├── Footer.jsx
│       ├── NavBar.jsx
│       └── NavLinks.jsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── AuthControlsDesktop.jsx
│   │   │   ├── AuthControlsMobile.jsx
│   │   │   └── AuthForm.jsx
│   │   │ 
│   │   ├── hooks/
│   │   │   └── useAuthListener.js 
│   │   │
│   │   ├── services/
│   │   │   └── authService.js  # Firebase auth (login, logout, register)
│   │   │
│   │   └── store/
│   │       └── authSlice.js    # Estado global de usuario
│   │
│   ├── cart/
│   │   ├── components/
│   │   │   └── CartButton.jsx
│   │   │ 
│   │   ├── hooks/
│   │   │   └── useCartWatcher.js
│   │   │
│   │   ├── services/
│   │   │   └── cartService.js  # Firestore (guardar, obtener, eliminar carrito)
│   │   │
│   │   └── store/
│   │       └── cartSlice.js    # Estado global del carrito        
│   │
│   └── products/
│       ├── components/
│       │   ├── ProductCard.jsx
│       │   └── SearchBar.jsx
│       │ 
│       └── services/
│           └── productsApi.js  # RTK Query (FakeStore API)
│   
├── firebase/
│   └── firebaseConfig.js       # Configuración de Firebase
│
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   └── ProductsPage.jsx
│
├── store/
│   └── store.js 
│
├── App.jsx
├── main.jsx
└── index.css
```
---

## Decisiones Técnicas

- Se utilizó **Redux Toolkit** en lugar de Context API para manejar estados complejos como carrito y autenticación.
- Se implementó **RTK Query** para optimizar el fetching de datos y cache.
- Se eligió **Tailwind CSS** por su rapidez de desarrollo y consistencia visual.
- Se implementó **debounce en la búsqueda** para mejorar la performance.
- La navegación se maneja con **React Router**, utilizando rutas dinámicas.

---

## Aprendizajes

En este proyecto reforcé los siguientes conceptos:

- **Gestión global del estado con Redux Toolkit**: manejo del carrito, usuario autenticado y sincronización con Firebase mediante `slices` y `async thunks` bien estructurados.
- **Integración con Firebase**: implementación de autenticación, persistencia de datos (Firestore) y reglas de seguridad; comprensión del flujo frontend ↔ backend.
- **Componentización en React**: creación de componentes reutilizables como `NavBar`, `ProductCard`, `Checkout`, `ItemListContainer`, manteniendo separación de responsabilidades y escalabilidad.
- **Estilos con Tailwind CSS**: uso de utilidades y variables CSS para una paleta consistente y un diseño responsivo en mobile, tablet y desktop.
- **Buenas prácticas con Git**: trabajo con ramas (`dev`, `main`) y commits descriptivos para un historial claro y colaborativo.
- **Manejo de errores y depuración**: resolución de conflictos entre estado local y remoto (evitando bucles infinitos y condiciones de carrera) y mejora del logging para debugging.

---

## Ejemplo de Código
Aquí tienes un ejemplo de cómo modularicé un componente en React:

```jsx

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

```
---

## Futuras mejoras
 
- Mejorar la página de inicio con productos destacados o promociones.
- Implementar búsqueda y filtrado avanzado por categoría y precio. 
- Agregar sección de perfil del usuario con historial de compras.  
- Integrar pasarela de pago real (ej. MercadoPago o Stripe).  

---

## Autor
- **Perfil en Frontend Mentor**: [Lenta, Maximiliano Carlos](https://www.frontendmentor.io/profile/Lenta-Maximiliano)
- **Perfil en GitHub**: [Lenta-Maximiliano](https://github.com/Lenta-Maximiliano)
- **LinkedIn**: [Lenta, Maximiliano Carlos](https://linkedin.com/in/Lenta-Maximiliano)

---

## Cómo Ejecutar Localmente

1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/Lenta-Maximiliano/mitienda-ecommerce.git

2. **Navega a la carpeta del proyecto:**
    ```bash
    cd mitienda-ecommerce

3. **Instala las dependencias:**
    ```bash
    npm install

4. **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev


💡 Proyecto desarrollado como práctica personal para consolidar habilidades en React, Redux Toolkit y Firebase.