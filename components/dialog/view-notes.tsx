"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CV } from "@/types/cv";

interface ViewNotesDialogProps {
  cv: CV;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewNotesDialog({
  cv,
  open,
  onOpenChange,
}: ViewNotesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Notes for {cv.company} - {cv.position}
          </DialogTitle>
          <DialogDescription className="whitespace-pre-wrap pt-4">
            {cv.notes}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
