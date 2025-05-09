import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Metadata Editor",
    description: "Edit metadata for your research artifacts",
}

export default function MetadataPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Metadata Editor</h2>
            </div>
            <div className="grid gap-4">
                {/* Metadata editor interface will go here */}
            </div>
        </div>
    )
} 