import { Metadata } from "next"
import { Project } from "@/types/database"
import { IntegrationButtons } from "../_components/integration-buttons"
import { getUser } from "@/actions/user"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
    title: "Project Details",
    description: "View and manage project details",
}

// This would typically come from your database
const getProject = (id: string): Project => ({
    id,
    user_id: "user1",
    title: "Machine Learning Research",
    description: "Research project on advanced ML algorithms",
    visibility: "public",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
})

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = getUser()
    const supabase = await createClient()

    const { data } = await supabase.from("projects").select("*").eq("id", id)

    const project = ((data?.length ?? 0 > 0) ? data?.[0] : {}) as Project


    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="space-y-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{project.title}</h2>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border p-4">
                        <h3 className="font-semibold mb-2">Project Details</h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Visibility:</span> {project.visibility}</p>
                            <p><span className="font-medium">Created:</span> {new Date(project.created_at).toLocaleDateString()}</p>
                            <p><span className="font-medium">Last Updated:</span> {new Date(project.updated_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Integrations</h3>
                    <IntegrationButtons projectId={project.id} />
                </div> */}
            </div>
        </div>
    )
} 