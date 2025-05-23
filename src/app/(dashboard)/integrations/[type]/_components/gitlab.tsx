import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gitlab } from "lucide-react"

const GitLabIntegration = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Gitlab className="h-6 w-6" />
                        <CardTitle>GitLab Integration</CardTitle>
                    </div>
                    <CardDescription>
                        Connect and manage your GitLab integration
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This integration allows you to connect and manage your GitLab projects.
                        Features include repository sync, CI/CD pipelines, and issue tracking.
                    </p>
                    <Button>Connect GitLab</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default GitLabIntegration 