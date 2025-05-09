'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
        console.log("🚀 ~ signup ~ error:", error)
        throw new Error(error.message)
    }

    redirect('/dashboard')

}