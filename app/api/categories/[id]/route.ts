import { db } from "@/db/connection";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { categories, cvs } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { auth } = await createClient();
    const userId = (await auth.getUser()).data.user?.id;

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const existingCVs = await db
      .select()
      .from(cvs)
      .where(
        and(eq(cvs.categoryId, parseInt(params.id)), eq(cvs.userId, userId))
      );

    if (existingCVs.length > 0) {
      return NextResponse.json(
        { error: "Category is being used by applications" },
        { status: 400 }
      );
    }

    await db
      .delete(categories)
      .where(
        and(
          eq(categories.id, parseInt(params.id)),
          eq(categories.userId, userId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const [updatedCategory] = await db
      .update(categories)
      .set({ name })
      .where(
        and(
          eq(categories.id, parseInt(params.id)),
          eq(categories.userId, userId)
        )
      )
      .returning();

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}
