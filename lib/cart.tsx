"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "./shop";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  totalSavings: number;
  isCartOpen: boolean;
}

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

interface CartContextValue extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function computeTotals(items: CartItem[]) {
  let itemCount = 0;
  let subtotal = 0;
  let totalSavings = 0;
  for (const item of items) {
    itemCount += item.quantity;
    subtotal += item.product.salePrice * item.quantity;
    totalSavings += item.product.savings * item.quantity;
  }
  return { itemCount, subtotal, totalSavings };
}

const STORAGE_KEY = "nexora-cart";

function persistCart(items: CartItem[]) {
  try {
    const serialized = items.map((i) => ({
      productId: i.product.id,
      quantity: i.quantity,
    }));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch {
    // sessionStorage unavailable
  }
}

// ─── Reducer ─────────────────────────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];

  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (existing) {
        newItems = state.items.map((i) =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
            : i
        );
      } else {
        newItems = [
          ...state.items,
          { product: action.product, quantity: action.quantity ?? 1 },
        ];
      }
      break;
    }
    case "REMOVE":
      newItems = state.items.filter((i) => i.product.id !== action.productId);
      break;
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        newItems = state.items.filter(
          (i) => i.product.id !== action.productId
        );
      } else {
        newItems = state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i
        );
      }
      break;
    case "CLEAR":
      newItems = [];
      break;
    case "HYDRATE":
      newItems = action.items;
      break;
    case "OPEN_CART":
      return { ...state, isCartOpen: true };
    case "CLOSE_CART":
      return { ...state, isCartOpen: false };
    default:
      return state;
  }

  persistCart(newItems);
  return { items: newItems, ...computeTotals(newItems) };
}

// ─── Context ─────────────────────────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  totalSavings: 0,
  isCartOpen: false,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed: { productId: string; quantity: number }[] =
        JSON.parse(stored);
      // Dynamic import to avoid circular dependencies
      import("./shop").then(({ products }) => {
        const items: CartItem[] = [];
        for (const entry of parsed) {
          const product = products.find((p) => p.id === entry.productId);
          if (product) {
            items.push({ product, quantity: entry.quantity });
          }
        }
        if (items.length > 0) {
          dispatch({ type: "HYDRATE", items });
        }
      });
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity = 1) =>
      dispatch({ type: "ADD", product, quantity }),
    []
  );

  const removeFromCart = useCallback(
    (productId: string) => dispatch({ type: "REMOVE", productId }),
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", productId, quantity }),
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  const isInCart = useCallback(
    (productId: string) => state.items.some((i) => i.product.id === productId),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
