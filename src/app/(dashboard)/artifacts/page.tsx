import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { ArtifactCard } from "@/components/artifacts/artifact-card"
import { Artifact } from "@/types/database"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getUser } from "@/actions/user"

export const metadata: Metadata = {
    title: "Artifacts",
    description: "Manage your research artifacts",
}

export default async function ArtifactsPage() {

    const supabase = await createClient()
    // Get the current user
    const user = await getUser()


    // Fetch artifacts for the current user's projects
    const { data: artifacts, error } = await supabase
        .from('artifacts')
        .select('*')
        .order('updated_at', { ascending: false })

    if (error) {
        throw new Error('Failed to fetch artifacts')
    }

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
                {artifacts.map((artifact) => (
                    <ArtifactCard key={artifact.id} artifact={artifact} />
                ))}
            </div>
        </div>
    )
} 