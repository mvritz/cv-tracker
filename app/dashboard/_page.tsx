"use client";

import React from "react";
import { PlusCircle, Search, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCVDialog } from "@/components/dialog/upload-cv";
import { CV } from "@/types/cv";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CVCard } from "@/components/app/cv-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCategoryDialog } from "@/components/dialog/create-category";
import { ManageCategoriesDialog } from "@/components/dialog/manage-categories";

type Category = {
  id: number;
  name: string;
  createdAt: string;
};

type CVDashboardProps = {
  cvs: CV[];
  categories: Category[];
};

const queryClient = new QueryClient();

export function PageContent({ cvs, categories }: CVDashboardProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] =
    React.useState<boolean>(false);
  const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] =
    React.useState<boolean>(false);
  const [isManageCategoriesDialogOpen, setIsManageCategoriesDialogOpen] =
    React.useState<boolean>(false);

  const filteredCVs = cvs.filter(
    (cv) =>
      cv.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedCVs = React.useMemo(() => {
    const grouped: Record<string, CV[]> = {
      uncategorized: filteredCVs.filter((cv) => !cv.categoryId),
    };

    categories.forEach((category) => {
      grouped[category.id.toString()] = filteredCVs.filter(
        (cv) => cv.categoryId === category.id.toString()
      );
    });

    return grouped;
  }, [filteredCVs, categories]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsCreateCategoryDialogOpen(true)}
              variant="outline"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Button>
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Application
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center mb-2">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="uncategorized">Uncategorized</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id.toString()}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsManageCategoriesDialogOpen(true)}
              className="ml-2 h-8 w-8"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>

          <TabsContent value="all">
            {filteredCVs.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <p className="text-muted-foreground mb-4">
                  No applications found
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsUploadDialogOpen(true)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Application
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCVs.map((cv) => (
                  <CVCard key={cv.id} cv={cv} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="uncategorized">
            {groupedCVs.uncategorized.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <p className="text-muted-foreground">
                  No uncategorized applications
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedCVs.uncategorized.map((cv) => (
                  <CVCard key={cv.id} cv={cv} />
                ))}
              </div>
            )}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id.toString()}>
              {groupedCVs[category.id.toString()].length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">
                    No applications in {category.name}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {groupedCVs[category.id.toString()].map((cv) => (
                    <CVCard key={cv.id} cv={cv} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <UploadCVDialog
          open={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
          categories={categories}
        />
        <CreateCategoryDialog
          open={isCreateCategoryDialogOpen}
          onOpenChange={setIsCreateCategoryDialogOpen}
        />
        <ManageCategoriesDialog
          open={isManageCategoriesDialogOpen}
          onOpenChange={setIsManageCategoriesDialogOpen}
          categories={categories}
        />
      </div>
    </QueryClientProvider>
  );
}
