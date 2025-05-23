import { notFound } from "next/navigation"
import IPFSIntegration from "./_components/ipfs"
import JupyterIntegration from "./_components/jupyter"
import GitHubIntegration from "./_components/github"
import GitLabIntegration from "./_components/gitlab"
import PythonIntegration from "./_components/python"
import RIntegration from "./_components/r"
import { use } from "react"

const integrationComponents: Record<string, React.ComponentType> = {
    ipfs: IPFSIntegration,
    jupyter: JupyterIntegration,
    github: GitHubIntegration,
    gitlab: GitLabIntegration,
    python: PythonIntegration,
    r: RIntegration,
}

export default function IntegrationPage({ params }: { params: Promise<{ type: string }> }) {

    const { type } = use(params)

    const IntegrationComponent = integrationComponents[type]

    if (!IntegrationComponent) {
        notFound()
    }

    return <IntegrationComponent />
}