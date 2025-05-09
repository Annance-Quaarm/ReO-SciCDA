"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { Database } from "@/types/database"

const formSchema = z.object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    affiliation: z.string().min(2, "Affiliation must be at least 2 characters"),
    did: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ProfileFormProps {
    user: User
    userData: Database['users']
}

export function ProfileForm({ user, userData }: ProfileFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: userData.full_name || "",
            affiliation: userData.affiliation || "",
            did: userData.did || "",
        },
    })

    useEffect(() => {
        if (userData) {
            form.reset({
                full_name: userData.full_name || "",
                affiliation: userData.affiliation || "",
                did: userData.did || "",
            })
        }
    }, [userData, form])

    async function onSubmit(data: FormValues) {
        const supabase = createClient()

        try {
            const { error } = await supabase
                .from("users")
                .update({
                    full_name: data.full_name,
                    affiliation: data.affiliation,
                    did: data.did,
                })
                .eq("id", user.id)

            if (error) throw error

            toast.success("Profile updated successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to update profile")
        }
    }

    return (
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
                <Button type="submit" className="w-full">
                    Update Profile
                </Button>
            </form>
        </Form>
    )
} 