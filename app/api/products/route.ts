import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Products API error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch products",
            },
            { status: 500 }
        );
    }
}
