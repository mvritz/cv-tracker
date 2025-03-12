import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CVStatus } from "@/types/cv";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/chart/pie-chart"), {
  ssr: false,
});

type ChartDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
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

export function ChartDialog({ open, onOpenChange, data }: ChartDialogProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Application Statistics</DialogTitle>
        </DialogHeader>
        <div className="flex gap-8 py-4">
          <div className="flex-1 h-[400px]">
            <Chart data={data} />
          </div>
          <ScrollArea className="w-[200px] h-[400px]">
            <div className="space-y-4">
              <div className="font-medium">Total Applications: {total}</div>
              <div className="space-y-2">
                {data.map((item) => (
                  <div key={item.name} className="flex flex-col gap-1">
                    <Badge className={statusColors[item.name as CVStatus]}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Badge>
                    <div className="text-sm text-muted-foreground pl-1">
                      {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
