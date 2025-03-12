import { db } from "@/db/connection";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { auth } = await createClient();
    const userId = (await auth.getUser()).data.user?.id;

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const allCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId));
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = (await request.json()) as { name: string };

    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const { auth } = await createClient();
    const userId = (await auth.getUser()).data.user?.id;

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const [newCategory] = await db
      .insert(categories)
      .values({ name, userId })
      .returning();

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
