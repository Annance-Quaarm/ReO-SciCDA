'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { GithubIcon, GitlabIcon, BookOpenIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface IntegrationButtonsProps {
    projectId: string
}

export function IntegrationButtons({ projectId }: IntegrationButtonsProps) {
    const [loading, setLoading] = useState<string | null>(null)

    const handleIntegration = async (platform: string) => {
        setLoading(platform)
        try {
            // This would typically make an API call to initiate the integration
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
            console.log(`Initiating ${platform} integration for project ${projectId}`)
        } catch (error) {
            console.error(`Error integrating with ${platform}:`, error)
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2"
                        onClick={() => handleIntegration('github')}
                        disabled={loading === 'github'}
                    >
                        <GithubIcon className="h-8 w-8" />
                        <span>GitHub</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>GitHub Integration</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>Connect your project with GitHub to:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Import repositories</li>
                            <li>Track commits and changes</li>
                            <li>Manage issues and pull requests</li>
                        </ul>
                        <Button className="w-full" onClick={() => handleIntegration('github')}>
                            Connect GitHub
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2"
                        onClick={() => handleIntegration('gitlab')}
                        disabled={loading === 'gitlab'}
                    >
                        <GitlabIcon className="h-8 w-8" />
                        <span>GitLab</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>GitLab Integration</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>Connect your project with GitLab to:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Import repositories</li>
                            <li>Track commits and changes</li>
                            <li>Manage issues and merge requests</li>
                        </ul>
                        <Button className="w-full" onClick={() => handleIntegration('gitlab')}>
                            Connect GitLab
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2"
                        onClick={() => handleIntegration('jupyter')}
                        disabled={loading === 'jupyter'}
                    >
                        <BookOpenIcon className="h-8 w-8" />
                        <span>Jupyter Notebook</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Jupyter Notebook Integration</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>Connect your project with Jupyter Notebook to:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Import notebooks</li>
                            <li>Track notebook versions</li>
                            <li>Share and collaborate on notebooks</li>
                        </ul>
                        <Button className="w-full" onClick={() => handleIntegration('jupyter')}>
                            Connect Jupyter
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
} 