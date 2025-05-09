"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { User } from "@supabase/auth-js"

const formSchema = z.object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    affiliation: z.string().min(2, "Affiliation must be at least 2 characters"),
    did: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface UserOnboardingModalProps {
    user: User
    isOpen: boolean
}

export function UserOnboardingModal({ user, isOpen }: UserOnboardingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            affiliation: "",
            did: "",
        },
    })

    useEffect(() => {
        if (user?.user_metadata?.full_name) {
            form.setValue("full_name", user.user_metadata.full_name)
        }
    }, [user, form])

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true)
        const supabase = createClient()

        try {
            const { error } = await supabase
                .from("users")
                .insert({
                    id: user.id,
                    email: user.email,
                    full_name: data.full_name,
                    affiliation: data.affiliation,
                    did: data.did,
                    role: "researcher",
                })

            if (error) throw error

            toast.success("Profile updated successfully")
            window.location.reload()
        } catch (error) {
            console.error(error)
            toast.error("Failed to update profile")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Complete Your Profile</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="affiliation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Affiliation</FormLabel>
                                    <FormControl>
                                        <Input placeholder="University of Example" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="did"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>DID (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="did:example:123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Profile"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
} 