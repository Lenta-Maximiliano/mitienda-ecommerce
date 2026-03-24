import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/products/productsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/store/cartSlice";

/** ProductDetail
 *
 * Página de detalle de producto.
 *
 * Responsabilidades:
 * - Obtener el ID desde la URL
 * - Fetch del producto con RTK Query
 * - Mostrar estados de loading / error
 * - Permitir interacción con el carrito
 */
export default function ProductDetail() {

  // Obtiene el parámetro dinámico de la URL (/products/:id)
  const { id } = useParams();

  // Normaliza el ID a número (la URL lo trae como string)
  const productId = Number(id);

  // Busca si el producto ya está en el carrito
  const cartItem = useSelector((state) =>
    id ? state.cart.items.find((item) => item.id === productId) : null
  );

  /** Fetch del producto con RTK Query
   *
   * skip evita ejecutar la query si no hay ID válido
   */
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId, {
    skip: !id,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Usuario autenticado
  const user = useSelector((state) => state.auth.user);

  // Estados de la UI
  if (isLoading) return <p className="text-center py-10">Cargando producto...</p>;
  
  if (error) return <p className="text-center text-red-500">Error al cargar el producto</p>;
  
  if (!product) return <p className="text-center py-10">Producto no encontrado</p>;

  // Agregar producto al carrito
  const handleAddToCart = (product) => {

    // Validación de autenticación
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/");
      return;
    }
    dispatch(addToCart(product));
  };

  // Aumentar cantidad
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product.id));
  };

  // Disminuir cantidad
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-8 mt-6">
      
      {/* Imagen del producto */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-sm object-contain rounded-2xl shadow-md"
        />
      </div>

      {/* Imagen del producto */}
      <div className="flex-1 flex flex-col justify-center gap-4">
        <h2 className="text-3xl font-semibold text-[var(--color-primary)]">
          {product.title}
        </h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        <h3 className="text-2xl font-bold text-[var(--color-accent)]">
          ${product.price}
        </h3>

        {/* Lógica condicional según si está en el carrito */}
        {cartItem ? (
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleDecreaseQuantity}
              className="w-10 h-10 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80"
            >
              -
            </button>
            <span className="text-lg font-medium">{cartItem.quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="w-10 h-10 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-[var(--color-primary)] text-white font-medium py-3 px-6 rounded-xl hover:bg-opacity-90 transition hover:cursor-pointer"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}