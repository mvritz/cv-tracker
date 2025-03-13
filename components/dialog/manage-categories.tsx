import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

type Category = {
  id: number;
  name: string;
  createdAt: string;
};

type ManageCategoriesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
};

export function ManageCategoriesDialog({
  open,
  onOpenChange,
  categories,
}: ManageCategoriesDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    []
  );

  React.useEffect(() => {
    if (!open) {
      setSelectedCategories([]);
    }
  }, [open]);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((cat) => cat.id));
    }
  };

  const handleDelete = async () => {
    if (selectedCategories.length === 0) return;

    setIsDeleting(true);
    const failedCategories: { id: number; name: string; error: string }[] = [];

    try {
      for (const categoryId of selectedCategories) {
        try {
          const response = await fetch(`/api/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const data = await response.json();
            const category = categories.find((c) => c.id === categoryId);
            failedCategories.push({
              id: categoryId,
              name: category?.name || String(categoryId),
              error: data.error || "Unknown error",
            });
          }
        } catch (error) {
          const category = categories.find((c) => c.id === categoryId);
          failedCategories.push({
            id: categoryId,
            name: category?.name || String(categoryId),
            error: "Failed to delete",
          });
        }
      }

      if (failedCategories.length === 0) {
        toast.success(
          `Successfully deleted ${selectedCategories.length} ${
            selectedCategories.length === 1 ? "category" : "categories"
          }`
        );
        onOpenChange(false);
        router.refresh();
      } else {
        const inUseCategories = failedCategories.filter(
          (c) =>
            c.error.toLowerCase().includes("in use") ||
            c.error.toLowerCase().includes("being used")
        );

        if (inUseCategories.length > 0) {
          toast.error(
            `Cannot delete ${inUseCategories.length === 1 ? "category" : "categories"}: ${inUseCategories
              .map((c) => c.name)
              .join(
                ", "
              )} as ${inUseCategories.length === 1 ? "it is" : "they are"} being used by applications`
          );
        } else {
          toast.error(
            `Failed to delete ${failedCategories.length === 1 ? "category" : "categories"}: ${failedCategories
              .map((c) => c.name)
              .join(", ")}`
          );
        }
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast.error("Failed to delete categories");
    } finally {
      setIsDeleting(false);
      setSelectedCategories([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
          <DialogDescription>
            Select categories to delete them
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center pb-4">
            <Checkbox
              id="select-all"
              checked={
                categories.length > 0 &&
                selectedCategories.length === categories.length
              }
              onCheckedChange={handleSelectAll}
            />
            <label
              htmlFor="select-all"
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Select All
            </label>
          </div>

          <ScrollArea className="h-[250px] sm:h-[300px] pr-4">
            <div className="space-y-2">
              {categories.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No categories found
                </p>
              ) : (
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2 rounded-lg border p-2 sm:p-3 transition-colors hover:bg-muted/50"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleSelectCategory(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="flex-1 text-sm font-medium leading-none"
                    >
                      {category.name}
                    </label>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={selectedCategories.length === 0 || isDeleting}
            className="w-full"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete{" "}
            {selectedCategories.length > 0
              ? `(${selectedCategories.length})`
              : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
