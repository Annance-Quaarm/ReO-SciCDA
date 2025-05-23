import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

const GitHubIntegration = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Github className="h-6 w-6" />
                        <CardTitle>GitHub Integration</CardTitle>
                    </div>
                    <CardDescription>
                        Connect and manage your GitHub integration
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This integration allows you to connect and manage your GitHub repositories.
                        Features include repository sync, issue tracking, and pull requests.
                    </p>
                    <Button>Connect GitHub</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default GitHubIntegration 