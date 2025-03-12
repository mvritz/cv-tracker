import { PageHeader } from "@/components/app/page-header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PageContent } from "./_page";
import { db } from "@/db/connection";
import { cvs, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { CV } from "@/types/cv";

export default async function AppPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const [dbCvs, dbCategories] = await Promise.all([
    db
      .select()
      .from(cvs)
      .where(eq(cvs.userId, user.id))
      .orderBy(desc(cvs.createdAt)),
    db.select().from(categories).where(eq(categories.userId, user.id)),
  ]);

  const transformedCvs: CV[] = dbCvs.map((cv) => ({
    id: cv.id.toString(),
    company: cv.companyName || "",
    position: cv.name || "",
    status: cv.status as CV["status"],
    appliedDate: cv.appliedAt || new Date().toISOString(),
    notes: cv.description || undefined,
    fileUrl: cv.documentPath || "",
    website: cv.website || undefined,
    categoryId: cv.categoryId?.toString(),
  }));

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="CV Management"
        description="Track and manage your job applications in one place"
        user={{ email: user.email || "" }}
        cvs={transformedCvs}
      />
      <PageContent cvs={transformedCvs} categories={dbCategories} />
    </div>
  );
}
