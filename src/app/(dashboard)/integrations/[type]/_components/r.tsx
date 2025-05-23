import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"

const RIntegration = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Code2 className="h-6 w-6" />
                        <CardTitle>R Environment</CardTitle>
                    </div>
                    <CardDescription>
                        Configure your R environment and package management
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This integration allows you to manage your R environment and packages.
                        Features include package management, data analysis, and visualization.
                    </p>
                    <Button>Configure R</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default RIntegration 