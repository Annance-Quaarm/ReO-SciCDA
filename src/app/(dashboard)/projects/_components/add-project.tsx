'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectVisibility } from '@/types/database'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusIcon } from 'lucide-react'
import { createProject } from '../action'
import { toast } from 'sonner'

export function NewProjectModal() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const projectData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            visibility: formData.get('visibility') as ProjectVisibility,
        }

        try {
            const newProject = await createProject(projectData)
            setOpen(false)
            toast.success('Project created successfully')
            router.push(`/dashboard/projects/${newProject.id}`)
        } catch (error) {
            console.error('Error creating project:', error)
            toast.error('Failed to create project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title">Title</label>
                        <Input
                            id="title"
                            name="title"
                            required
                            placeholder="Enter project title"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description">Description</label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Enter project description"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="visibility">Visibility</label>
                        <Select name="visibility" defaultValue="private">
                            <SelectTrigger>
                                <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                                <SelectItem value="unlisted">Unlisted</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Project'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 