import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export const metadata: Metadata = {
    title: "Team",
    description: "Manage your team members",
}

export default function TeamPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Team</h2>
                <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Invite Member
                </Button>
            </div>
            <div className="grid gap-4">
                {/* Team member list will go here */}
            </div>
        </div>
    )
} 