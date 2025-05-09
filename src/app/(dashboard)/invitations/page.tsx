import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Invitations",
    description: "Manage your project invitations",
}

export default function InvitationsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Invitations</h2>
            </div>
            <div className="grid gap-4">
                {/* Invitation list will go here */}
            </div>
        </div>
    )
} 