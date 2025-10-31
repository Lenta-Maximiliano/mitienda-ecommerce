import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cart/cartSlice";

export default function Checkout() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      {items.length === 0 ? (
        <p className="text-lg text-[var(--color-muted)]">
          Tu carrito está vacío 🛒
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-28 h-28 object-contain rounded-md mb-4 sm:mb-0 sm:mr-6"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-primary)]">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-muted)] mt-1 text-sm sm:text-base">
                      Precio unitario: ${item.price.toFixed(2)}
                    </p>
                    <p className="text-[var(--color-accent)] font-bold mt-1 text-sm sm:text-base">
                      Total: ${item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80 transition"
                    >
                      -
                    </button>
                    <span className="text-base sm:text-lg font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-2 sm:ml-4 bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-lg font-semibold hover:bg-red-200 transition text-sm sm:text-base"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-4">
              Resumen
            </h2>
            <div className="flex justify-between text-base md:text-lg text-[var(--color-muted)] mb-2">
              <span>Productos:</span>
              <span>{items.length}</span>
            </div>
            <div className="flex justify-between text-base md:text-lg font-semibold text-[var(--color-accent)] mb-6">
              <span>Total a pagar:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition mb-3 text-sm md:text-base">
              Confirmar compra
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition text-sm md:text-base"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
//   clearCart,
// } from "../features/cart/cartSlice";

// export default function Checkout() {
//   const { items, totalPrice } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
//         Checkout
//       </h1>

//       {items.length === 0 ? (
//         <p className="text-[var(--color-muted)] text-lg">
//           Tu carrito está vacío 🛒
//         </p>
//       ) : (
//         <>
//           <ul className="list-none p-0">
//             {items.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center border-b border-gray-300 pb-2 mb-4"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-20 h-20 object-cover mr-4 rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-[var(--color-primary)]">
//                     {item.title}
//                   </h3>
//                   <p className="text-[var(--color-muted)]">
//                     Precio unitario: ${item.price.toFixed(2)}
//                   </p>
//                   <p className="text-[var(--color-accent)] font-bold">
//                     Total: ${item.totalPrice.toFixed(2)}
//                   </p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => dispatch(decreaseQuantity(item.id))}
//                       className="w-8 h-8 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80 transition"
//                     >
//                       -
//                     </button>
//                     <span className="text-lg font-medium">{item.quantity}</span>
//                     <button
//                       onClick={() => dispatch(increaseQuantity(item.id))}
//                       className="w-8 h-8 bg-[var(--color-soft)] text-[var(--color-primary)] rounded-full font-bold hover:opacity-80 transition"
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={() => dispatch(removeFromCart(item.id))}
//                       className="ml-3 bg-transparent border-none cursor-pointer text-red-600 hover:text-red-800 transition"
//                     >
//                       ❌
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
//             Total a pagar: ${totalPrice.toFixed(2)}
//           </h2>

//           <div className="flex gap-2">
//             <button className="flex-1 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition font-semibold">
//               Confirmar compra
//             </button>
//             <button
//               onClick={() => dispatch(clearCart())}
//               className="flex-1 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition font-semibold"
//             >
//               Vaciar carrito
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
