import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/custom/navigation/app-sidebar';
import { ProgressBar } from '@/components/custom/progress-bar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'
import { Separator } from '@/components/ui/separator';
import { DynamicBreadcrumbs } from './_components/breadcrumbs';
import { UserOnboardingModal } from '@/components/custom/user-onboarding-modal';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    const showOnboarding = !userData

    return (
        <ProgressBar className="fixed top-0 h-1 bg-primary">
            <SidebarProvider>
                <AppSidebar
                    user={user}
                />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <DynamicBreadcrumbs />
                        </div>
                    </header>
                    {children}
                </SidebarInset>
                {showOnboarding && <UserOnboardingModal user={user} isOpen={true} />}
            </SidebarProvider>
        </ProgressBar>
    )
}

export default DashboardLayout