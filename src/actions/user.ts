"use server"

import { createClient } from "@/lib/supabase/server"
import { User } from "@/types/database"

export const getUser = async () => {
    try {
        const supabase = await createClient()

        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error


        if (session?.user) {

            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if (userError) throw userError
            return userData as User
        }

    } catch (error) {
        console.error('Error fetching user:', error)
        return null
    }
}
