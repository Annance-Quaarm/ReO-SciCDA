'use client'

import { Project } from '@/types/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ProjectListProps {
    projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
    const router = useRouter()

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <Card
                    key={project.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(`/projects/${project.id}`)}
                >
                    <CardHeader>
                        <CardTitle>{project.title || 'Untitled Project'}</CardTitle>
                        <CardDescription>
                            {project.description || 'No description provided'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Visibility: {project.visibility}</span>
                            <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
} 