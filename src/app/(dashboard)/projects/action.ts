"use server"

import { createClient } from "@/lib/supabase/server"
import { ProjectVisibility } from "@/types/database"
import { getUser } from "@/actions/user"
import { revalidatePath } from "next/cache"

export async function createProject(data: {
    title: string
    description?: string
    visibility: ProjectVisibility
}) {
    const user = await getUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const supabase = await createClient()

    try {
        const { data: project, error } = await supabase
            .from('projects')
            .insert({
                title: data.title,
                description: data.description,
                visibility: data.visibility,
                user_id: user.id
            })
            .select()
            .single()

        if (error) throw error

        revalidatePath('/projects')

        return project
    } catch (error) {
        console.error('Error creating project:', error)
        throw new Error('Failed to create project')
    }
}

