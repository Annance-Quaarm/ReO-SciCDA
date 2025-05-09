import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Gitlab, Code2, Database, FileText, Beaker, TestTube, BookOpen, Terminal, LucideIcon } from "lucide-react"
import Image from "next/image"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Integrations",
    description: "Manage your tool integrations",
}

type IntegrationIcon = LucideIcon | (() => ReactNode)

interface Integration {
    id: string
    name: string
    description: string
    category: string
    icon: IntegrationIcon
    status: "available" | "coming_soon"
    features: string[]
}

function renderIcon(icon: IntegrationIcon) {
    if (typeof icon === 'function') {
        return icon({})
    }
    const IconComponent = icon as LucideIcon
    return <IconComponent className="h-6 w-6" />
}

// Mock data for integrations
const integrations: Integration[] = [
    {
        id: "ipfs",
        name: "IPFS",
        description: "Distributed file system for storing and accessing files, websites, applications, and data",
        category: "Blockchain",
        icon: () => (
            <Image
                src="/assets/ipfs.svg"
                alt="IPFS Logo"
                width={24}
                height={24}
                className="h-6 w-6"
            />
        ),
        status: "available",
        features: ["Content Addressing", "Decentralized Storage", "Data Persistence"],
    },
    {
        id: "jupyter",
        name: "Jupyter Notebooks",
        description: "Interactive computing environment for data analysis and visualization",
        category: "Data Analysis",
        icon: BookOpen,
        status: "available",
        features: ["Notebook Integration", "Data Visualization", "Code Execution"],
    },
    {
        id: "github",
        name: "GitHub",
        description: "Version control and collaboration platform for code and documentation",
        category: "Code Management",
        icon: Github,
        status: "available",
        features: ["Repository Sync", "Issue Tracking", "Pull Requests"],
    },
    {
        id: "gitlab",
        name: "GitLab",
        description: "DevOps platform with integrated version control and CI/CD",
        category: "Code Management",
        icon: Gitlab,
        status: "available",
        features: ["Repository Sync", "CI/CD Pipelines", "Issue Tracking"],
    },
    {
        id: "python",
        name: "Python Environment",
        description: "Python package management and environment configuration",
        category: "Development",
        icon: Terminal,
        status: "available",
        features: ["Package Management", "Environment Sync", "Dependency Tracking"],
    },
    {
        id: "r",
        name: "R Environment",
        description: "Statistical computing and graphics environment",
        category: "Data Analysis",
        icon: Code2,
        status: "available",
        features: ["Package Management", "Data Analysis", "Visualization"],
    },
    {
        id: "solana",
        name: "Solana",
        description: "High-performance blockchain platform for decentralized applications and marketplaces",
        category: "Blockchain",
        icon: () => (
            <Image
                src="/assets/solana.svg"
                alt="Solana Logo"
                width={24}
                height={24}
                className="h-6 w-6"
            />
        ),
        status: "coming_soon",
        features: ["Smart Contracts", "NFT Support", "Token Management"],
    },
    {
        id: "dataverse",
        name: "Dataverse",
        description: "Data repository for sharing and preserving research data",
        category: "Data Management",
        icon: Database,
        status: "coming_soon",
        features: ["Data Publishing", "Version Control", "Metadata Management"],
    },
    {
        id: "overleaf",
        name: "Overleaf",
        description: "Collaborative LaTeX editor for scientific documentation",
        category: "Documentation",
        icon: FileText,
        status: "coming_soon",
        features: ["LaTeX Editing", "Collaboration", "Templates"],
    },
    {
        id: "zenodo",
        name: "Zenodo",
        description: "Open repository for research outputs and datasets",
        category: "Data Management",
        icon: Database,
        status: "coming_soon",
        features: ["Data Publishing", "DOI Assignment", "Version Control"],
    },
    {
        id: "protocols.io",
        name: "Protocols.io",
        description: "Platform for sharing and discovering research protocols",
        category: "Protocols",
        icon: Beaker,
        status: "coming_soon",
        features: ["Protocol Sharing", "Version Control", "Collaboration"],
    },
]

export default function IntegrationsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integration) => (
                    <Card key={integration.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                {renderIcon(integration.icon)}
                                <CardTitle>{integration.name}</CardTitle>
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
                                <Button className="w-full">Connect</Button>
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