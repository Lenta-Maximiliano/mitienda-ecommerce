import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveCart, getCart } from "../../services/cartService";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  isSyncing: false,
};

// helper para recalcular totales de forma centralizada
const recalculateTotals = (items) => {
  const totalQuantity = items.reduce((acc, it) => acc + (it.quantity || 0), 0);
  const totalPrice = items.reduce((acc, it) => acc + (it.totalPrice ?? (it.price * (it.quantity ?? 0))), 0);
  return { totalQuantity, totalPrice };
};

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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

      const totals = recalculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      const totals = recalculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

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

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // fetchCart
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

      // persistCart 
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

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
