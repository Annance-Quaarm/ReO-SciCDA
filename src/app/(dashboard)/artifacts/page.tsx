import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { ArtifactCard } from "@/components/artifacts/artifact-card"
import { Artifact } from "@/types/database"

export const metadata: Metadata = {
    title: "Artifacts",
    description: "Manage your research artifacts",
}

// Mock data for demonstration
const mockArtifacts: Artifact[] = [
    {
        id: "1",
        project_id: "1",
        type: "dataset",
        title: "Climate Change Survey Data 2024",
        description: "Raw survey data collected from 1000 participants across 5 regions",
        ipfs_hash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        version: 1,
        current: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        project_id: "1",
        type: "notebook",
        title: "Data Analysis Jupyter Notebook",
        description: "Python notebook containing data processing and visualization code",
        ipfs_hash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        version: 2,
        current: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        project_id: "1",
        type: "protocol",
        title: "Experimental Protocol v1.2",
        description: "Detailed protocol for conducting the climate change experiments",
        version: 3,
        current: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
]

export default function ArtifactsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Artifacts</h2>
                <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Artifact
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockArtifacts.map((artifact) => (
                    <ArtifactCard key={artifact.id} artifact={artifact} />
                ))}
            </div>
        </div>
    )
} 