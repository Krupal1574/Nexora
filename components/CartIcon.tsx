"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartIcon() {
  const { 
    items, itemCount, subtotal, totalSavings, 
    updateQuantity, removeFromCart, clearCart,
    isCartOpen, openCart, closeCart
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isCartOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={openCart}
        className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#77736D] hover:text-[#F26A21] hover:bg-[#F26A21]/10 transition-all duration-200"
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-br from-[#F26A21] to-[#8FB8D8] text-[#F5F1E8] text-[10px] font-bold shadow-[0_0_8px_#F26A2166] animate-[scaleIn_0.2s_ease]">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-[60] bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] z-[70] bg-[#FFFFFF] border-l border-[#F26A21]/15 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#FFFFFF]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F26A21]/10 border border-[#F26A21]/20 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-[#F26A21]" />
              </div>
              <div>
                <h2
                  className="text-[#171717] font-bold text-lg"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Your Cart
                </h2>
                <p className="text-[#64748B] text-xs">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#77736D] hover:text-[#171717] hover:bg-[#FFFFFF] transition-all"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center mb-4">
                  <ShoppingCart className="w-7 h-7 text-[#4A5568]" />
                </div>
                <p className="text-[#77736D] font-medium mb-2">
                  Your cart is empty
                </p>
                <p className="text-[#64748B] text-sm mb-6">
                  Browse our services and add a plan to get started.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="btn-primary text-sm"
                >
                  Browse Plans <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const Icon = product.icon;
                return (
                  <div
                    key={product.id}
                    className="rounded-xl bg-[#FFFFFF]/80 border border-[#E5E5E5]/60 p-4 transition-all hover:border-[#F26A21]/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#F26A21]/10 border border-[#F26A21]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#F26A21]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#171717] font-semibold text-sm truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#F26A21] font-bold text-sm">
                            ${product.salePrice.toLocaleString()}
                          </span>
                          <span className="text-[#64748B] text-xs line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#64748B] hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E5E5]/50">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F5F1E8] border border-[#E5E5E5] text-[#77736D] hover:border-[#F26A21]/40 hover:text-[#171717] transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-[#171717] text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F5F1E8] border border-[#E5E5E5] text-[#77736D] hover:border-[#F26A21]/40 hover:text-[#171717] transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[#171717] font-bold text-sm">
                        ${(product.salePrice * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="border-t border-[#FFFFFF] p-6 space-y-4">
              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#77736D]">Subtotal</span>
                  <span className="text-[#171717] font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#77736D]">You Save</span>
                  <span className="text-emerald-400 font-medium">
                    −${totalSavings.toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-[#E5E5E5]/60 my-2" />
                <div className="flex justify-between">
                  <span
                    className="text-[#171717] font-bold"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-[#F26A21] font-bold text-lg"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <Link
                href="/contact?checkout=true"
                onClick={closeCart}
                className="btn-primary w-full justify-center text-sm py-3.5"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={clearCart}
                className="w-full text-center text-[#64748B] text-xs hover:text-red-400 transition-colors py-1"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
