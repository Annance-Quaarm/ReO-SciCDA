import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TeamMemberProps {
    name: string;
    role: string;
    image?: string;
    className?: string;
}

export function TeamCard({ name, role, image, className }: TeamMemberProps) {
    return (
        <div className={cn("flex flex-col items-center text-center p-4", className)}>
            <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>
                    {name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
        </div>
    );
} 