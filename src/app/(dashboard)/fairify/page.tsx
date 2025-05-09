import { Metadata } from "next"

export const metadata: Metadata = {
    title: "FAIR Assistant",
    description: "Get help making your research artifacts FAIR",
}

export default function FairifyPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">FAIR Assistant</h2>
            </div>
            <div className="grid gap-4">
                {/* FAIR Assistant interface will go here */}
            </div>
        </div>
    )
} 