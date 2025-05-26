import { Metadata } from 'next';
import { ProjectList } from './_components/project-list';
import { NewProjectModal } from './_components/add-project';
import { Project, ProjectVisibility } from '@/types/database';
import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/actions/user';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Manage your research projects',
};

// This would typically come from your database
const dummyProjects: Project[] = [
    {
        id: '1',
        user_id: 'user1',
        title: 'Machine Learning Research',
        description: 'Research project on advanced ML algorithms',
        visibility: 'public' as ProjectVisibility,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        user_id: 'user1',
        title: 'Data Analysis Pipeline',
        description: 'Automated data processing and analysis workflow',
        visibility: 'private' as ProjectVisibility,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '3',
        user_id: 'user1',
        title: 'Blockchain Integration',
        description: 'Research on blockchain technology integration',
        visibility: 'unlisted' as ProjectVisibility,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export default async function ProjectsPage() {
    const supabase = await createClient();

    const user = await getUser();

    const { data } = await supabase.from('projects').select('*').eq('user_id', user?.id);

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                <NewProjectModal />
            </div>
            <ProjectList projects={data || []} />
        </div>
    );
}
