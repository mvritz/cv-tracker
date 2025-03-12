import { db } from "@/db/connection";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cvs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
  const { id } = (await request.json()) as {
    id: string;
  };

  if (!id) {
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

    await db.delete(cvs).where(eq(cvs.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete CV" }, { status: 500 });
  }
}
