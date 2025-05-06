import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
}

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
    return (
        <Card className={cn("transition-all hover:shadow-md", className)}>
            <CardHeader className="space-y-1">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-2">
                    {icon}
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    );
} 