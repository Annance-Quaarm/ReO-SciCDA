'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { AuthError } from '@supabase/supabase-js'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    try {
        await supabase.auth.signInWithPassword(data)


    } catch (error) {
        if (error instanceof AuthError) {
            throw new Error(error.message)
        }
        throw new Error('An unexpected error occurred')
    }
    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    try {
        await supabase.auth.signUp(data)
    } catch (error) {
        if (error instanceof AuthError) {
            throw new Error(error.message)
        }
        throw new Error('An unexpected error occurred')
    }

    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
}