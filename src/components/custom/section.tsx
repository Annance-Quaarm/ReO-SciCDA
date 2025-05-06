import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className, id }: SectionProps) {
    return (
        <section
            id={id}
            className={cn("py-16 md:py-24 w-full", className)}
        >
            <div className="container mx-auto px-4 md:px-6">
                {children}
            </div>
        </section>
    );
}

export function SectionTitle({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h2 className={cn("text-3xl md:text-4xl font-bold tracking-tight mb-4", className)}>
            {children}
        </h2>
    );
}

export function SectionDescription({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p className={cn("text-lg text-muted-foreground mb-8 max-w-3xl", className)}>
            {children}
        </p>
    );
} 