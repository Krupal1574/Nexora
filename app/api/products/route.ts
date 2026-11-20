import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/shop";

const planPriceMap: Record<string, number> = {
  "application-guarantee": 1200,
  "interview-coaching": 1500,
  "ultimate-support": 2200,
  "all-in-one": 3000,
};

export async function GET() {
    try {
        let products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!products || products.length === 0) {
            return NextResponse.json({
                success: true,
                products: fallbackProducts.map((p) => ({
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    description: p.description,
                    price: p.salePrice.toString(),
                    originalPrice: p.originalPrice.toString(),
                    discount: p.discountPercent,
                    image: `/images/products/${p.slug}.png`,
                    category: p.category,
                    status: "ACTIVE",
                    stock: 99,
                    featured: true,
                })),
            });
        }

        // Apply updated plan rates
        products = products.map((prod: any) => {
            const overridePrice = planPriceMap[prod.slug];
            if (overridePrice !== undefined) {
                return {
                    ...prod,
                    price: overridePrice,
                    originalPrice: overridePrice,
                    discount: 0,
                };
            }
            return prod;
        });

        return NextResponse.json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Products API error, using static catalog:", error);

        return NextResponse.json({
            success: true,
            products: fallbackProducts.map((p) => ({
                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.description,
                price: p.salePrice.toString(),
                originalPrice: p.originalPrice.toString(),
                discount: p.discountPercent,
                image: `/images/products/${p.slug}.png`,
                category: p.category,
                status: "ACTIVE",
                stock: 99,
                featured: true,
            })),
        });
    }
}
