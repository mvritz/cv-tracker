"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Download, X, FileText, Maximize } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CV } from "@/types/cv";
import { PDFViewer } from "@/components/app/pdf-viewer";

interface ViewCVDialogProps {
  cv: CV;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewCVDialog({ cv, open, onOpenChange }: ViewCVDialogProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const statusColors: Record<string, string> = {
    planned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    declined: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    interview:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "practical interview":
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    accepted:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  const handleDownload = () => {
    window.open(cv.fileUrl, "_blank");
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">
              {cv.company} - {cv.position}
            </h2>
            <Badge className={`${statusColors[cv.status]}`}>
              {cv.status.charAt(0).toUpperCase() + cv.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 h-[calc(100vh-73px)]">
          {pdfError ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Unable to display PDF</p>
              <p className="text-sm text-muted-foreground mb-4">
                There was an error loading this document.
              </p>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          ) : (
            <PDFViewer
              fileUrl={cv.fileUrl}
              onError={() => setPdfError(true)}
              className="h-full"
              onFullscreenChange={setIsFullscreen}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-col sm:flex-row items-start justify-between space-y-2 sm:space-y-0 pr-6">
          <div>
            <DialogTitle className="text-lg sm:text-xl">
              {cv.company} - {cv.position}
            </DialogTitle>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge className={`${statusColors[cv.status]}`}>
                {cv.status.charAt(0).toUpperCase() + cv.status.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Applied on {format(new Date(cv.appliedDate), "MMM d, yyyy")}
              </span>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1 sm:flex-none"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(true)}
              className="flex-1 sm:flex-none"
            >
              <Maximize className="h-4 w-4 mr-2" />
              Fullscreen
            </Button>
          </div>
        </DialogHeader>

        {cv.notes && (
          <div className="border-y py-3 my-2">
            <h4 className="text-sm font-medium mb-1">Notes</h4>
            <p className="text-sm text-muted-foreground">{cv.notes}</p>
          </div>
        )}

        <div className="flex-1 min-h-[300px] sm:min-h-[400px] overflow-hidden rounded border">
          {pdfError ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Unable to display PDF</p>
              <p className="text-sm text-muted-foreground mb-4">
                There was an error loading this document.
              </p>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          ) : (
            <PDFViewer
              fileUrl={cv.fileUrl}
              onError={() => setPdfError(true)}
              className="h-full"
              onFullscreenChange={setIsFullscreen}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
