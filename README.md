# 🛍️ MiTienda - eCommerce con React

**MiTienda** es una aplicación eCommerce moderna desarrollada con **React**, **Redux Toolkit**, **Tailwind CSS** y **Firebase**.  
Permite a los usuarios explorar productos, agregarlos al carrito, autenticarse y realizar un checkout simulado.  
Los productos se obtienen dinámicamente desde la **[FakeStore API](https://fakestoreapi.com/)** para simular un entorno real de comercio electrónico.

---

## Tabla de Contenidos
- [Enlaces](#enlaces)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Características](#características)
- [Aprendizajes](#aprendizajes)
- [Autor](#autor)
- [¿Cómo Ejecutar Localmente?](#cómo-ejecutar-localmente)

---

## Enlaces
- **URL del Sitio en Vivo**: [Ver sitio aquí](https://mitienda-ecommerce01.netlify.app/)

---

## Tecnologías Utilizadas

- ⚛️ **React** – Librería principal para la interfaz de usuario  
- 🧩 **Redux Toolkit** – Manejo del estado global (carrito y autenticación)  
- 🎨 **Tailwind CSS** – Estilos rápidos y consistentes con una paleta personalizada  
- 🔥 **Firebase** – Autenticación y base de datos Firestore  
- 🌐 **FakeStore API** – Fuente de datos para los productos del catálogo
- 🛠️ **Vite** – Entorno de desarrollo rápido y moderno  

---

## Características

- 🛍️ **Exploración de productos** con datos obtenidos dinámicamente desde la FakeStore API.  
- 🛒 **Carrito de compras** con control de cantidad, eliminación de productos y persistencia del estado.  
- 🔑 **Autenticación de usuarios** con Firebase (registro, login y logout).  
- 💳 **Checkout simulado** con resumen de compra y validación de usuario autenticado.  
- 📱 **Diseño completamente responsive** optimizado para mobile, tablet y desktop.  
- 🌙 **Interfaz limpia y moderna** con Tailwind CSS y una paleta de colores personalizada.  

---

## Aprendizajes

En este proyecto reforcé los siguientes conceptos:

- **Gestión global del estado con Redux Toolkit**: manejo del carrito, usuario autenticado y sincronización con Firebase mediante `slices` y `async thunks` bien estructurados.
- **Integración con Firebase**: implementación de autenticación, persistencia de datos (Firestore) y reglas de seguridad; comprensión del flujo frontend ↔ backend.
- **Componentización en React**: creación de componentes reutilizables como `NavBar`, `ProductCard`, `Checkout`, `ItemListContainer`, manteniendo separación de responsabilidades y escalabilidad.
- **Estilos con Tailwind CSS**: uso de utilidades y variables CSS para una paleta consistente y un diseño responsivo en mobile, tablet y desktop.
- **Buenas prácticas con Git**: trabajo con ramas (`dev`, `main`) y commits descriptivos para un historial claro y colaborativo.
- **Manejo de errores y depuración**: resolución de conflictos entre estado local y remoto (evitando bucles infinitos y condiciones de carrera) y mejora del logging para debugging.


## Ejemplo de Código
Aquí tienes un ejemplo de cómo modularicé un componente en React:

```jsx

import { useGetProductsQuery } from "../services/productsApi";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <div>
      <div className="max-w-7xl mx-auto grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-5 p-5">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

  
```

## Futuras mejoras
 
- Mejorar la página de inicio con productos destacados o promociones.
- Implementar búsqueda y filtrado avanzado por categoría y precio. 
- Agregar sección de perfil del usuario con historial de compras.  
- Integrar pasarela de pago real (ej. MercadoPago o Stripe).  

## Autor
- **Perfil en Frontend Mentor**: [Lenta, Maximiliano Carlos](https://www.frontendmentor.io/profile/Lenta-Maximiliano)
- **Perfil en GitHub**: [Lenta-Maximiliano](https://github.com/Lenta-Maximiliano)
- **LinkedIn**: [Lenta, Maximiliano Carlos](https://linkedin.com/in/Lenta-Maximiliano)


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