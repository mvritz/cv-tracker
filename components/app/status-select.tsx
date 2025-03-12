"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CVStatus } from "@/types/cv";
import { cn } from "@/lib/utils";

interface StatusSelectProps {
  value: CVStatus;
  onChange: (value: CVStatus) => void;
  disabled?: boolean;
}

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

const statusOptions: CVStatus[] = [
  "planned",
  "pending",
  "interview",
  "practical interview",
  "accepted",
  "declined",
];

export function StatusSelect({ value, onChange, disabled }: StatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={cn(
          "inline-flex w-fit items-center gap-1 cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <Badge className={cn(statusColors[value], "cursor-pointer")}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
        <ChevronDown
          className={cn(
            "h-3 w-3 opacity-50 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </div>
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1 w-48 py-1 bg-popover rounded-md shadow-lg border z-50">
          {statusOptions.map((status) => (
            <div
              key={status}
              className={cn(
                "px-3 py-1.5 cursor-pointer hover:bg-accent",
                status === value && "bg-accent"
              )}
              onClick={() => {
                onChange(status);
                setIsOpen(false);
              }}
            >
              <Badge className={statusColors[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
