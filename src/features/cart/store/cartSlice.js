import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveCart, getCart } from "../services/cartService";

/** Estado inicial del carrito.
 *
 * items → productos en el carrito
 * totalQuantity → cantidad total de productos
 * totalPrice → precio total acumulado
 * loading → estado de carga para fetchCart
 * error → errores globales
 * isSyncing → indica si el carrito se está sincronizando con backend
 */
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  isSyncing: false,
};

/** Helper para recalcular totales.
 *
 * Se centraliza la lógica para evitar duplicación
 * y mantener consistencia en todos los reducers.
 *
 * - totalQuantity → suma de cantidades
 * - totalPrice → suma de precios totales
 */
const recalculateTotals = (items) => {
  const totalQuantity = items.reduce((acc, it) => acc + (it.quantity || 0), 0);

  const totalPrice = items.reduce((acc, it) => acc + (it.totalPrice ?? (it.price * (it.quantity ?? 0))), 0);
  
  return { totalQuantity, totalPrice };
};

/** Thunk para obtener el carrito desde backend.
 *
 * Recibe userId y:
 * - llama a getCart()
 * - retorna los items del carrito
 * - maneja errores con rejectWithValue
 */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const cartData = await getCart(userId);
      return cartData.items ?? [];
    } catch (err) {
      return rejectWithValue(err.message || "Error fetching cart");
    }
  }
);

/** Thunk para guardar el carrito en backend.
 *
 * Recibe:
 * - userId
 * - items actuales del carrito
 *
 */
export const persistCart = createAsyncThunk(
  "cart/persistCart",
  async ({ userId, items }, { rejectWithValue }) => {
    try {
      await saveCart(userId, items);
      return items;
    } catch (err) {
      return rejectWithValue(err.message || "Error persisting cart");
    }
  }
);

/** Slice del carrito.
 *
 * Contiene:
 * - reducers síncronos (acciones locales)
 * - extraReducers (manejo de async thunks)
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    /** Agrega un producto al carrito.
     *
     * - Si ya existe → incrementa cantidad
     * - Si no existe → lo agrega
     */
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += product.price;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          totalPrice: product.price,
          image: product.image,
        });
      }

      // Recalcular totales
      const totals = recalculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    // Elimina un producto del carrito completamente.
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      const totals = recalculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    // Incrementa la cantidad de un producto.
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      
      if (item) {
        item.quantity += 1;
        item.totalPrice += item.price;

        const totals = recalculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
      }
    },

    // Disminuye la cantidad de un producto. (Si queda en 0 → se elimina)
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((it) => it.id === id);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice -= item.price;
      } else {
        state.items = state.items.filter((it) => it.id !== id);
      }

      const totals = recalculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    //Vacía completamente el carrito.
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.loading = false;
      state.error = null;
    },
  },

  //Manejo de acciones async (thunks)
  extraReducers: (builder) => {
    
    // fetchCart (GET)
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const fetchedItems = Array.isArray(action.payload) ? action.payload : [];

        state.items = fetchedItems;

        const totals = recalculateTotals(fetchedItems);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Error al cargar el carrito";
      })

      // persistCart (SAVE)
      .addCase(persistCart.pending, (state) => {
        state.isSyncing = true;
      })
      .addCase(persistCart.fulfilled, (state, action) => {
        state.isSyncing = false;
        
        const totals = recalculateTotals(action.payload);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
      })
      .addCase(persistCart.rejected, (state, action) => {
        state.isSyncing = false;
        state.error = action.payload || action.error?.message || "Error al guardar el carrito";;
      });
  },
});

// Export de acciones
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

//Export del reducer para el store
export default cartSlice.reducer;
