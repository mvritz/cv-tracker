import { db } from "@/db/connection";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cvs } from "@/db/schema";

export async function POST(request: NextRequest) {
  const {
    documentUrl,
    status,
    notes,
    company,
    categoryId,
    appliedDate,
    positionName,
    website,
  } = (await request.json()) as {
    documentUrl: string;
    userId?: string;
    positionName: string;
    status: string;
    notes?: string;
    company: string;
    categoryId?: number | null;
    appliedDate: string;
    website?: string;
  };

  if (!documentUrl || !status || !company || !appliedDate || !positionName) {
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

    await db.insert(cvs).values({
      name: positionName,
      documentPath: documentUrl,
      userId: userId,
      status: status,
      description: notes,
      companyName: company,
      categoryId: categoryId ?? null,
      appliedAt: new Date(appliedDate).toISOString(),
      website: website ?? null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload CV" }, { status: 500 });
  }
}
