"use client";

import { CartProvider as Provider } from "@/lib/cart";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
