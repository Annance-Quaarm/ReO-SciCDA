import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <span className="text-primary">ReO:SciCDA</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                        How It Works
                    </Link>
                    <Link href="#team" className="text-sm font-medium hover:text-primary transition-colors">
                        Team
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="https://github.com/Annance-Quaarm/ReO-SciCDA" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="#demo">
                            See Demo
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
} 