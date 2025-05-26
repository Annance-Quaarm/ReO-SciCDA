'use client'

import React, { useState, useEffect, useActionState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { testPinataAuthentication, savePinataIntegration, getPinataIntegration, deletePinataIntegration } from '../action'
import { toast } from 'sonner'
import { getUser } from '@/actions/user'

const IPFSIntegration = () => {
    const [gatewayUrl, setGatewayUrl] = useState('')
    const [jwtToken, setJwtToken] = useState('')
    const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)

    const [userState, getUserAction] = useActionState(getUser, null)
    console.log("🚀 ~ IPFSIntegration ~ userState:", userState)

    useEffect(() => {
        getUserAction()
    }, [getUserAction])

    useEffect(() => {
        const loadIntegration = async () => {

            try {
                const integration = await getPinataIntegration(userState?.id as string)
                if (integration?.config) {
                    const { gatewayUrl: savedGatewayUrl, jwtToken: savedJwtToken } = integration.config as { gatewayUrl: string, jwtToken: string }
                    setGatewayUrl(savedGatewayUrl)
                    setJwtToken(savedJwtToken)
                    setConnectionStatus('success')
                } else {
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Error loading integration:', error)
                toast.error('Failed to load integration settings')
                setIsLoading(false)
            }
        }


        loadIntegration()

    }, [userState])

    const handleTestConnection = async () => {
        if (!userState?.id) {
            toast.error('You must be logged in to test the connection')
            return
        }

        setConnectionStatus('testing')
        setErrorMessage('')

        try {
            await testPinataAuthentication({ gatewayUrl, jwtToken })
            setConnectionStatus('success')
            toast.success('Successfully connected to Pinata')
        } catch (error) {
            setConnectionStatus('error')
            const message = error instanceof Error ? error.message : 'Failed to connect to Pinata'
            setErrorMessage(message)
            toast.error(message)
        }
    }

    const handleSave = async () => {
        if (!userState?.id) {
            toast.error('You must be logged in to save the configuration')
            return
        }

        setIsSaving(true)
        try {
            await savePinataIntegration(userState.id, { gatewayUrl, jwtToken })
            toast.success('Configuration saved successfully')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to save configuration'
            toast.error(message)
        } finally {
            setIsSaving(false)
        }
    }

    const handleRemove = async () => {
        if (!userState?.id) {
            toast.error('You must be logged in to remove the configuration')
            return
        }

        setIsRemoving(true)
        try {
            await deletePinataIntegration(userState.id)
            setGatewayUrl('')
            setJwtToken('')
            setConnectionStatus('idle')
            setErrorMessage('')
            toast.success('Configuration removed successfully')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to remove configuration'
            toast.error(message)
        } finally {
            setIsRemoving(false)
        }
    }

    if (!userState) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    // if (!userState) {
    //     return (
    //         <Alert variant="destructive">
    //             <AlertCircle className="h-4 w-4" />
    //             <AlertTitle>Authentication Required</AlertTitle>
    //             <AlertDescription>
    //                 Please sign in to configure your IPFS integration.
    //             </AlertDescription>
    //         </Alert>
    //     )
    // }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>IPFS Configuration</CardTitle>
                    <CardDescription>
                        Configure your Pinata gateway settings for IPFS integration
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="gateway-url">Pinata Gateway URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="gateway-url"
                                    placeholder="https://gateway.pinata.cloud"
                                    value={gatewayUrl}
                                    onChange={(e) => setGatewayUrl(e.target.value)}
                                    disabled={isSaving || isRemoving}
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => setGatewayUrl('')}
                                    disabled={!gatewayUrl || isSaving || isRemoving}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="jwt-token">Pinata JWT Token</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="jwt-token"
                                    type="password"
                                    placeholder="Enter your Pinata JWT token"
                                    value={jwtToken}
                                    onChange={(e) => setJwtToken(e.target.value)}
                                    disabled={isSaving || isRemoving}
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => setJwtToken('')}
                                    disabled={!jwtToken || isSaving || isRemoving}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>

                        {connectionStatus !== 'idle' && (
                            <Alert variant={connectionStatus === 'success' ? 'default' : 'destructive'}>
                                {connectionStatus === 'testing' && (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <AlertTitle>Testing Connection</AlertTitle>
                                        <AlertDescription>
                                            Verifying connection to Pinata...
                                        </AlertDescription>
                                    </>
                                )}
                                {connectionStatus === 'success' && (
                                    <>
                                        <CheckCircle2 className="h-4 w-4" />
                                        <AlertTitle>Connection Successful</AlertTitle>
                                        <AlertDescription>
                                            Successfully connected to Pinata gateway
                                        </AlertDescription>
                                    </>
                                )}
                                {connectionStatus === 'error' && (
                                    <>
                                        <XCircle className="h-4 w-4" />
                                        <AlertTitle>Connection Failed</AlertTitle>
                                        <AlertDescription>
                                            {errorMessage}
                                        </AlertDescription>
                                    </>
                                )}
                            </Alert>
                        )}

                        <div className="flex gap-2">
                            <Button
                                onClick={handleTestConnection}
                                disabled={!gatewayUrl || !jwtToken || connectionStatus === 'testing' || isSaving || isRemoving}
                            >
                                {connectionStatus === 'testing' ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Testing...
                                    </>
                                ) : (
                                    'Test Connection'
                                )}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleSave}
                                disabled={!gatewayUrl || !jwtToken || isSaving || isRemoving}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Configuration'
                                )}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleRemove}
                                disabled={(!gatewayUrl && !jwtToken) || isSaving || isRemoving}
                            >
                                {isRemoving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Removing...
                                    </>
                                ) : (
                                    'Remove Configuration'
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default IPFSIntegration