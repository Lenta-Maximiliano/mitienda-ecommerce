import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addToCart, increaseQuantity, decreaseQuantity } from "../features/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const MySwal = withReactContent(Swal);

  const handleAddToCart = (product) => {
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
        if (result.isConfirmed) navigate("/auth/login");
      });
      return;
    }

    dispatch(addToCart(product));
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

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center justify-between text-center"
    >
      {/* Imagen + título (enlace al detalle) */}
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
        <h3 className="text-lg font-semibold text-[var(--color-primary)] line-clamp-2">
          {product.title}
        </h3>
      </Link>

      {/* Precio */}
      <p className="text-xl font-bold text-[var(--color-accent)] mt-2 mb-3">
        ${product.price}
      </p>

      {/* Botones */}
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