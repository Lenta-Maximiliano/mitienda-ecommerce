import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addToCart, increaseQuantity, decreaseQuantity } from "../../cart/cartSlice";

/** Tarjeta de producto.
 *
 * Responsabilidades:
 * - Mostrar información básica del producto (imagen, título, precio)
 * - Permitir navegación al detalle del producto
 * - Permitir agregar productos al carrito
 * - Permitir modificar la cantidad si el producto ya está en el carrito
 * - Validar autenticación antes de agregar al carrito
 *
 * Este componente interactúa con Redux (cart, auth)
 * y maneja feedback visual mediante SweetAlert2.
 */
export default function ProductCard({ product }) {

  // Hook para despachar acciones a Redux.
  const dispatch = useDispatch();

  /** Obtiene el item del carrito correspondiente a este producto.
   *
   * Si existe → el producto ya está en el carrito
   * Si no existe → aún no fue agregado
   */
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  // Hook de navegación programática.
  const navigate = useNavigate();

  /** Usuario autenticado desde el store.
   * Se usa para validar si puede agregar productos al carrito.
   */
  const user = useSelector((state) => state.auth.user);

  // Instancia de SweetAlert con soporte para React.
  const MySwal = withReactContent(Swal);

  /** Maneja la acción de agregar un producto al carrito.
   *
   * Flujo:
   * 1. Si no hay usuario → muestra alerta y opción de login
   * 2. Si hay usuario → agrega producto al carrito
   * 3. Muestra feedback tipo toast
   */
  const handleAddToCart = (product) => {

    // Validación de autenticación
    if (!user) {
      MySwal.fire({
        title: "Debes iniciar sesión",
        text: "Necesitás iniciar sesión para agregar productos al carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ir a iniciar sesión",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "var(--color-primary)",
        cancelButtonColor: "#d33",
      }).then((result) => {

        // Si el usuario acepta → redirige a login
        if (result.isConfirmed) navigate("/auth/login");
      });
      return;
    }

    // Agrega producto al carrito
    dispatch(addToCart(product));

    // Feedback visual (toast)
    MySwal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Producto agregado",
      showConfirmButton: false,
      timer: 1000,
      width: "auto",
      customClass: {
        popup: "text-xs p-2 rounded-lg shadow-sm",
        title: "text-xs font-medium",
      },
    });
  };

  // Incrementa la cantidad del producto en el carrito.
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product.id));
  };

  // Disminuye la cantidad del producto en el carrito.
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center justify-between text-center"
    >
      
      {/* 
        Imagen + título.
        Todo el bloque es un enlace hacia el detalle del producto.
      */}
      <Link
        to={`/products/${product.id}`}
        className="flex flex-col items-center w-full no-underline text-inherit"
      >
        <div className="w-full h-48 flex justify-center items-center mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain rounded-md"
          />
        </div>

        {/* Título del producto */}
        <h3 className="text-lg font-semibold text-[var(--color-primary)] line-clamp-2">
          {product.title}
        </h3>
      </Link>

      {/* Precio del producto */}
      <p className="text-xl font-bold text-[var(--color-accent)] mt-2 mb-3">
        ${product.price}
      </p>

      {/* 
        Acciones:
        - Si NO está en carrito → botón "Agregar"
        - Si YA está → controles de cantidad (+ / -)
      */}
      {!cartItem ? (
        <button
          onClick={() => handleAddToCart(product)}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl font-medium hover:bg-opacity-90 transition hover:cursor-pointer"
        >
          Agregar al carrito
        </button>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleDecreaseQuantity}
            className="w-9 h-9 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80 hover:cursor-pointer"
          >
            -
          </button>

          {/* Cantidad actual en el carrito */}
          <span className="text-lg font-medium">{cartItem.quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="w-9 h-9 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80 hover:cursor-pointer"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}