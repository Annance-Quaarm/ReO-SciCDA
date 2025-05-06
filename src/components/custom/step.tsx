import React from "react";
import { cn } from "@/lib/utils";

interface StepProps {
    number: number;
    title: string;
    description: string;
    className?: string;
}

export function Step({ number, title, description, className }: StepProps) {
    return (
        <div className={cn("flex items-start gap-4", className)}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium">
                {number}
            </div>
            <div className="space-y-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
} 