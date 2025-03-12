"use client";

import { FileText, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import type { CV, CVStatus } from "@/types/cv";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserSettingsDialog } from "@/components/dialog/user-settings";
import { ChartDialog } from "@/components/dialog/chart-dialog";
import React from "react";
import { signOutAction } from "@/app/actions";

const Chart = dynamic(() => import("@/components/chart/pie-chart"), {
  ssr: false,
});

type PageHeaderProps = {
  title: string;
  description?: string;
  user?: { email: string };
  cvs?: CV[];
};

const statusColors: Record<CVStatus, string> = {
  planned: "#3b82f6",
  pending: "#eab308",
  declined: "#ef4444",
  interview: "#a855f7",
  "practical interview": "#6366f1",
  accepted: "#22c55e",
};

export function PageHeader({ title, description, user, cvs }: PageHeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isChartReady, setIsChartReady] = useState(false);

  const stats = cvs
    ? {
        accepted: cvs.filter((cv) => cv.status === "accepted").length,
        pending: cvs.filter((cv) => cv.status === "pending").length,
        declined: cvs.filter((cv) => cv.status === "declined").length,
        planned: cvs.filter((cv) => cv.status === "planned").length,
        interview: cvs.filter((cv) => cv.status === "interview").length,
        "practical interview": cvs.filter(
          (cv) => cv.status === "practical interview"
        ).length,
      }
    : null;

  const pieData = stats
    ? Object.entries(stats).map(([key, value]) => ({
        name: key,
        value,
        fill: statusColors[key as CVStatus],
      }))
    : [];

  React.useEffect(() => {
    setIsChartReady(true);
  }, []);

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold tracking-tight">CV-Tracker</h1>
          </div>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {stats && pieData.some((d) => d.value > 0) && isChartReady && (
          <div
            className="h-12 w-12 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsChartOpen(true)}
          >
            <Chart data={pieData} />
          </div>
        )}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOutAction()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <UserSettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        user={user}
      />

      <ChartDialog
        open={isChartOpen}
        onOpenChange={setIsChartOpen}
        data={pieData}
      />
    </div>
  );
}
