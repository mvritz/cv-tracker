import { db } from "@/db/connection";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cvs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: NextRequest) {
  const {
    id,
    company,
    position,
    status,
    appliedDate,
    notes,
    categoryId,
    website,
  } = (await request.json()) as {
    id: string;
    company: string;
    position: string;
    status:
      | "planned"
      | "pending"
      | "declined"
      | "interview"
      | "practical interview"
      | "accepted";
    appliedDate: string;
    notes?: string;
    categoryId?: number | null;
    website?: string;
  };

  if (!id || !company || !position || !status || !appliedDate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const { auth } = await createClient();
    const userId = (await auth.getUser()).data.user?.id;

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const [existingCV] = await db
      .select()
      .from(cvs)
      .where(eq(cvs.id, parseInt(id)))
      .limit(1);

    if (!existingCV || existingCV.userId !== userId) {
      return NextResponse.json(
        { error: "CV not found or unauthorized" },
        { status: 404 }
      );
    }

    await db
      .update(cvs)
      .set({
        companyName: company,
        name: position,
        status,
        appliedAt: new Date(appliedDate).toISOString(),
        description: notes ?? null,
        categoryId: categoryId || null,
        website: website || null,
      })
      .where(eq(cvs.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update CV" }, { status: 500 });
  }
}
