"use server"

import { createPinataClient } from "@/lib/pinata/config"
import { createClient } from '@/lib/supabase/server'
import { Integration, IntegrationType } from '@/types/database'
import { PinataSDK } from "pinata"

export const savePinataIntegration = async (userId: string, config: { gatewayUrl: string, jwtToken: string }) => {
    const supabase = await createClient()

    try {
        const { data, error } = await supabase
            .from('integrations')
            .upsert({
                user_id: userId,
                type: 'blockchain' as IntegrationType,
                provider: 'Pinata',
                name: 'Pinata IPFS',
                status: 'active',
                config: {
                    gatewayUrl: config.gatewayUrl,
                    jwtToken: config.jwtToken
                }
            })
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error saving Pinata integration:', error)
        throw error
    }
}

export const getPinataIntegration = async (userId: string) => {
    const supabase = await createClient()

    try {
        const { data } = await supabase
            .from('integrations')
            .select('*')
            .eq('user_id', userId)
            .eq('type', 'blockchain')
            .eq('provider', 'Pinata')
            .single()

        console.log("🚀 ~ getPinataIntegration ~ data:", data)

        return data
    } catch (error) {
        console.error('Error fetching Pinata integration:', error)
        throw error
    }
}

export const deletePinataIntegration = async (userId: string) => {
    const supabase = await createClient()

    try {
        const { error } = await supabase
            .from('integrations')
            .delete()
            .eq('user_id', userId)
            .eq('type', 'blockchain')
            .eq('provider', 'Pinata')

        if (error) throw error
        return true
    } catch (error) {
        console.error('Error deleting Pinata integration:', error)
        throw error
    }
}

export const testPinataAuthentication = async (config: Integration['config']) => {

    try {


        const { gatewayUrl, jwtToken } = config as { gatewayUrl: string, jwtToken: string }

        const pinata = createPinataClient(jwtToken, gatewayUrl)
        const auth = await pinata.testAuthentication()
        return auth
    } catch (error) {
        console.error('Error testing Pinata authentication:', error)
        throw error
    }
}