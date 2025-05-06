import React from "react";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t py-8 md:py-12 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">ReO:SciCDA</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            FAIR Publishing for the Next Generation of Science
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="https://github.com/reo-scicda"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hackathon</h3>
                        <p className="text-sm text-muted-foreground">
                            Created during the IPFS & Filecoin Hackathon 2024
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {currentYear} ReO:SciCDA. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
} 