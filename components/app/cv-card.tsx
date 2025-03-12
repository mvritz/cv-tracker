"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  FileText,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  ChevronDown,
  Link,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CV, CVStatus } from "@/types/cv";
import { ViewCVDialog } from "@/components/dialog/view-cv";
import { EditCVDialog } from "@/components/dialog/edit-cv";
import { DeleteCVDialog } from "@/components/dialog/delete-cv";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { StatusSelect } from "./status-select";
import { ViewNotesDialog } from "@/components/dialog/view-notes";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CVCardProps = {
  cv: CV;
};

const statusColors: Record<CVStatus, string> = {
  planned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  declined: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  interview:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "practical interview":
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  accepted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

export function CVCard({ cv }: CVCardProps) {
  const router = useRouter();
  const [isViewDialogOpen, setIsViewDialogOpen] =
    React.useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] =
    React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [isViewNotesOpen, setIsViewNotesOpen] = useState(false);

  const handleStatusChange = async (newStatus: CVStatus) => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/cv/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cv.id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast.success("Status updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/cv/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cv.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete CV");
      }

      toast.success("CV deleted successfully");
      setIsDeleteDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete CV");
    }
  };

  return (
    <>
      <Card className="flex flex-col h-[280px]">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold leading-none tracking-tight truncate">
                {cv.company}
              </h3>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground truncate flex-1">
                {cv.position}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {cv.website && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={cv.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 p-0 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Link className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{cv.website}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 flex-shrink-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => setIsViewDialogOpen(true)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View CV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-col space-y-3">
            <StatusSelect
              value={cv.status}
              onChange={(value) => handleStatusChange(value)}
              disabled={isUpdating}
            />
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">
                Applied on {format(new Date(cv.appliedDate), "MMM d, yyyy")}
              </p>
              {cv.notes && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {cv.notes}
                  </p>
                  {cv.notes?.length > 150 && (
                    <Button
                      variant="link"
                      className="px-0 h-6 font-normal text-sm"
                      onClick={() => setIsViewNotesOpen(true)}
                    >
                      Show more
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsViewDialogOpen(true)}
          >
            <FileText className="mr-2 h-4 w-4" />
            View CV
          </Button>
        </CardFooter>
      </Card>
      <ViewCVDialog
        cv={cv}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
      <EditCVDialog
        cv={cv}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
      <DeleteCVDialog
        cv={cv}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
      <ViewNotesDialog
        cv={cv}
        open={isViewNotesOpen}
        onOpenChange={setIsViewNotesOpen}
      />
    </>
  );
}
