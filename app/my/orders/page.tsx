"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShoppingBag, Package, Clock, CheckCircle, XCircle,
  Truck, RefreshCw, AlertCircle, ChevronDown, ChevronUp,
} from "lucide-react";

type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
};

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  subtotal: string;
  shippingCost: string;
  tax: string;
  total: string;
  currency: string;
  customerName: string | null;
  customerEmail: string;
  notes: string | null;
  createdAt: string;
  items: OrderItem[];
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING:    { label: "Pending",    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",   icon: Clock },
  CONFIRMED:  { label: "Confirmed",  color: "text-blue-400 bg-blue-400/10 border-blue-400/20",         icon: CheckCircle },
  PROCESSING: { label: "Processing", color: "text-purple-400 bg-purple-400/10 border-purple-400/20",   icon: RefreshCw },
  SHIPPED:    { label: "Shipped",    color: "text-[#00F2FE] bg-[#00F2FE]/10 border-[#00F2FE]/20",      icon: Truck },
  DELIVERED:  { label: "Delivered",  color: "text-green-400 bg-green-400/10 border-green-400/20",      icon: CheckCircle },
  CANCELLED:  { label: "Cancelled",  color: "text-red-400 bg-red-400/10 border-red-400/20",            icon: XCircle },
  REFUNDED:   { label: "Refunded",   color: "text-orange-400 bg-orange-400/10 border-orange-400/20",   icon: RefreshCw },
};

function formatCurrency(amount: string, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency?.toUpperCase() || "USD",
    }).format(parseFloat(amount));
  } catch {
    return `$${parseFloat(amount).toFixed(2)}`;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-[#121923] border border-[#203548] rounded-2xl overflow-hidden hover:border-[#00F2FE]/20 transition-all duration-300">
      {/* Header */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs text-[#64748B] mb-1">Order #</p>
            <p className="text-white font-mono font-semibold text-sm">{order.orderNumber}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cfg.color}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {cfg.label}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-[#64748B] text-xs mb-0.5">Date</p>
            <p className="text-[#94A3B8]">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs mb-0.5">Items</p>
            <p className="text-[#94A3B8]">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs mb-0.5">Total</p>
            <p className="text-white font-semibold">{formatCurrency(order.total, order.currency)}</p>
          </div>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-3 border-t border-[#203548] text-sm text-[#64748B] hover:text-[#94A3B8] hover:bg-[#0B0F19]/40 transition-colors"
      >
        <span>{expanded ? "Hide" : "Show"} order details</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-[#203548] bg-[#0B0F19]/30 px-5 sm:px-6 py-5 space-y-4">
          {/* Items */}
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Items</p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <Package className="w-4 h-4 text-[#64748B] shrink-0" />
                    <span className="text-[#94A3B8] truncate">{item.productName}</span>
                    <span className="text-[#475569] shrink-0">×{item.quantity}</span>
                  </div>
                  <span className="text-white font-medium shrink-0 ml-3">
                    {formatCurrency(item.totalPrice, order.currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="border-t border-[#203548] pt-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal, order.currency)}</span>
              </div>
              {parseFloat(order.shippingCost) > 0 && (
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Shipping</span>
                  <span>{formatCurrency(order.shippingCost, order.currency)}</span>
                </div>
              )}
              {parseFloat(order.tax) > 0 && (
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Tax</span>
                  <span>{formatCurrency(order.tax, order.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-semibold border-t border-[#203548] pt-2 mt-2">
                <span>Total</span>
                <span>{formatCurrency(order.total, order.currency)}</span>
              </div>
            </div>
          </div>

          {order.notes && (
            <div className="border-t border-[#203548] pt-4">
              <p className="text-xs text-[#64748B] mb-1">Notes</p>
              <p className="text-sm text-[#94A3B8]">{order.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MyOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/my/orders");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/user/orders")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load orders");
        return r.json();
      })
      .then(setOrders)
      .catch(() => setError("Could not load your orders. Please try again."))
      .finally(() => setLoading(false));
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="flex items-center gap-3 text-[#94A3B8]">
            <div className="w-5 h-5 border-2 border-[#00F2FE]/30 border-t-[#00F2FE] rounded-full animate-spin" />
            Loading...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#00F2FE]" />
              </div>
              <h1 className="text-3xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                My Orders
              </h1>
            </div>
            <p className="text-[#94A3B8] text-sm ml-1">
              View and track your order history.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && !error && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#121923] border border-[#203548] rounded-2xl p-6 animate-pulse">
                  <div className="flex justify-between mb-4">
                    <div className="h-4 w-28 bg-[#203548] rounded" />
                    <div className="h-6 w-20 bg-[#203548] rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-3 bg-[#203548] rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Orders list */}
          {!loading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && orders.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-[#121923] border border-[#203548] flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-9 h-9 text-[#203548]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
              <p className="text-[#64748B] text-sm mb-8 max-w-xs mx-auto">
                When you place an order it will appear here so you can track its status.
              </p>
              <a
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F2FE] text-black font-bold rounded-xl hover:bg-[#00D2C4] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Browse the Shop
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
