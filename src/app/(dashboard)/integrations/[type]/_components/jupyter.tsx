import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const JupyterIntegration = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Jupyter Notebooks Integration</CardTitle>
                    <CardDescription>
                        Connect and manage your Jupyter Notebooks integration
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This integration allows you to connect and manage your Jupyter Notebooks.
                        Features include notebook integration, data visualization, and code execution.
                    </p>
                    <Button>Connect Jupyter</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default JupyterIntegration 