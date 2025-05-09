import { Artifact } from "@/types/database"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileIcon, GitBranchIcon, HistoryIcon, MoreHorizontalIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ArtifactCardProps {
    artifact: Artifact
}

export function ArtifactCard({ artifact }: ArtifactCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-medium">
                        {artifact.title || "Untitled Artifact"}
                    </CardTitle>
                    <CardDescription>
                        {artifact.description || "No description provided"}
                    </CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <FileIcon className="h-4 w-4" />
                    <span>{artifact.type || "other"}</span>
                </div>
                {artifact.ipfs_hash && (
                    <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                        <GitBranchIcon className="h-4 w-4" />
                        <span className="truncate">{artifact.ipfs_hash}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-2">
                    <Badge variant="secondary">v{artifact.version}</Badge>
                    {artifact.current && <Badge>Current</Badge>}
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <HistoryIcon className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
} 