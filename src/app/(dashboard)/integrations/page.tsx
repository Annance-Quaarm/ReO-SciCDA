import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/server"
import { ToolWithIntegration } from "@/types/database"
import { ToolIcon } from "./_components/tool-icon"
import { getUser } from "@/actions/user"

export const metadata: Metadata = {
    title: "Integrations",
    description: "Manage your tool integrations",
}

type IntegrationIcon = LucideIcon | (() => ReactNode)


function renderIcon(icon: IntegrationIcon) {
    if (typeof icon === 'function') {
        return icon({})
    }
    const IconComponent = icon as LucideIcon
    return <IconComponent className="h-6 w-6" />
}



const toolIconTypes: Record<string, string> = {
    ipfs: 'image',
    jupyter: 'lucide',
    github: 'lucide',
    gitlab: 'lucide',
    python: 'lucide',
    r: 'lucide',
    solana: 'image',
    dataverse: 'lucide',
    zenodo: 'lucide',
    overleaf: 'lucide',
    'protocols.io': 'lucide'
}

export default async function IntegrationsPage() {

    const user = await getUser()
    const supabase = await createClient()

    const { data } = await supabase
        .from('user_tool_integrations')
        .select('*')
        .order('status');



    const toolsWithIcons = (data as ToolWithIntegration[])?.map((tool) => ({
        ...tool,
        iconType: toolIconTypes[tool.id] || null,
        iconName: tool.id,
        isIntegrated: tool.user_id === user?.id,

    }))
    console.log("🚀 ~ toolsWithIcons ~ toolsWithIcons:", toolsWithIcons)

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {toolsWithIcons.map((integration) => (
                    <Card key={integration.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <ToolIcon type={integration.iconType || ""} name={integration.iconName} />
                                    <CardTitle>{integration.name}</CardTitle>
                                </div>
                                {integration.isIntegrated && <Badge className="bg-green-600/30 text-green-600 px-2 rounded-3xl">connected</Badge>}
                            </div>
                            <CardDescription>{integration.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-2">
                                <Badge variant="outline">{integration.category}</Badge>
                                <div className="flex flex-wrap gap-2">
                                    {integration.features.map((feature) => (
                                        <Badge key={feature} variant="secondary" className="text-xs">
                                            {feature}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            {integration.status === "available" ? (
                                <Link href={`/integrations/${integration.id}`} className={cn(buttonVariants({ variant: "default", className: "w-full" }))}>
                                    {integration.isIntegrated ? "Manage" : "Connect"}
                                </Link>
                            ) : (
                                <Button className="w-full" variant="outline" disabled>
                                    Coming Soon
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
} 