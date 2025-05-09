"use client";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const routeMap: Record<string, string> = {
    genre: "Genre",
    actor: "Actor",
    content: "Content",
    media: "Media",
    pages: "Pages",
    rows: "Rows",
    "page-rows": "Page Rows",
    "row-content": "Row Content",
    seasons: "Seasons",
    "season-episodes": "Season Episodes",
};

export function DynamicBreadcrumbs() {
    const pathname = usePathname();

    const breadcrumbs = useMemo(() => {
        const segments = pathname.split("/").filter(Boolean);

        return segments
            .map((segment, index) => {
                const path = `/${segments.slice(0, index + 1).join("/")}`;
                const isLast = index === segments.length - 1;
                const title =
                    routeMap[segment] ||
                    segment.charAt(0).toUpperCase() + segment.slice(1);

                return [
                    <BreadcrumbItem key={path}>
                        {isLast ? (
                            <BreadcrumbPage>{title}</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink href={path}>{title}</BreadcrumbLink>
                        )}
                    </BreadcrumbItem>,
                    !isLast && <BreadcrumbSeparator key={`${path}-separator`} />,
                ];
            })
            .flat()
            .filter(Boolean);
    }, [pathname]);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem key="dashboard">
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.length > 0 && (
                    <BreadcrumbSeparator key="dashboard-separator" />
                )}
                {breadcrumbs}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

