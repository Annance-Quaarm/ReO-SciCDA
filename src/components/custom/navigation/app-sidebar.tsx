"use client"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  ChevronDown,
  FileText,
  Film,
  Folder,
  FolderIcon,
  Home,
  Image,
  Layers,
  LayoutGrid,
  LayoutList,
  ListVideo,
  LucideIcon,
  Mail,
  PlayCircle,
  Puzzle,
  Settings,
  Sparkles,
  Tv,
  UserIcon,
  Users,
  VideoIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { JSX, useState } from 'react';
import NavHeader from './nav-header';
import { NavUser } from './nav-user';
import { ProgressBarLink } from '@/components/custom/progress-bar';
import { getCookie } from 'cookies-next';
import { User as AuthUser } from '@/types/database';
import { User } from '@supabase/auth-js';

interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
  children?: NavigationItem[];
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// interface User {
//   name: string;
//   email: string;
//   avatar: string;
// }

interface NavigationItemProps extends NavigationItem {
  key?: string;
  isActive?: boolean;
}

export const researcherNavigationSections: NavigationSection[] = [
  {
    title: 'Research Workspace',
    items: [
      { title: 'Dashboard', url: '/dashboard', icon: Home },
      { title: 'My Projects', url: '/projects', icon: Folder },
      { title: 'My Artifacts', url: '/artifacts', icon: Layers },
      {
        title: 'FAIRification',
        url: '',
        icon: Sparkles,
        children: [
          { title: 'FAIR Assistant', url: '/fairify', icon: Sparkles },
          { title: 'Metadata Editor', url: '/metadata', icon: FileText },
        ],
      },
      { title: 'Integrations', url: '/integrations', icon: Puzzle },
      { title: 'Invitations', url: '/invitations', icon: Mail },
    ],
  },
  {
    title: 'Profile & Collaboration',
    items: [
      { title: 'Profile', url: '/profile', icon: UserIcon },
      { title: 'Team', url: '/team', icon: Users },
    ],
  },
];

// const navigationSections: NavigationSection[] = [
//   {
//     title: 'Content Management',
//     items: [
//       { title: 'Dashboard', url: '/', icon: Home },
//       { title: 'Actor', url: '/actors', icon: Users },
//       {
//         title: 'Content',
//         url: '', // Empty URL since this is just a dropdown container
//         icon: PlayCircle,
//         children: [
//           { title: 'Movies', url: '/movies', icon: Film },
//           { title: 'Series', url: '/series', icon: Film },
//         ],
//       },
//       { title: 'Genre', url: '/genre', icon: Film },
//       { title: 'Pages', url: '/pages', icon: FileText },
//       { title: 'Rows', url: '/rows', icon: LayoutGrid },
//       { title: 'Seasons', url: '/seasons', icon: Tv },
//       { title: 'Episodes', url: '/season-episodes', icon: ListVideo },
//     ],
//   },
//   {
//     title: 'Media Library',
//     items: [
//       { title: 'Videos', url: '/videos', icon: VideoIcon },
//       { title: 'Images', url: '/images', icon: Image },
//       { title: 'Files', url: '/files', icon: FolderIcon },
//     ],
//   },
//   {
//     title: 'Analytics',
//     items: [
//       { title: 'Overview', url: '/analytics', icon: BarChart3 },
//       { title: 'User Stats', url: '/analytics/users', icon: Users },
//       { title: 'Content Stats', url: '/analytics/content', icon: FileText },
//     ],
//   },
//   {
//     title: 'Administration',
//     items: [
//       { title: 'Settings', url: '/settings', icon: Settings },
//       { title: 'User Management', url: '/users', icon: Users },
//     ],
//   },
// ];

const NavigationItem: React.FC<NavigationItemProps> = ({
  title,
  url,
  icon: Icon,
  isActive,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (children) {
    const isChildActive = children.some(
      (child) => child.url && pathname.startsWith(child.url),
    );

    return (
      <SidebarMenuItem>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full">
            <div
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-md transition-colors',
                isChildActive
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400',
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'w-4 h-4',
                    isChildActive
                      ? 'text-primary'
                      : 'text-gray-500 dark:text-gray-400',
                  )}
                />
                <span
                  className={cn(
                    'text-sm font-medium',
                    isChildActive && 'font-semibold text-primary',
                  )}
                >
                  {title}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-gray-500 transition-transform duration-200',
                  isOpen && 'transform rotate-180',
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-6 mt-1 space-y-1">
              {children.map((child) => (
                <NavigationItem
                  key={child.title}
                  {...child}
                  isActive={pathname.startsWith(child.url)}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <ProgressBarLink
          href={url}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
            isActive
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400',
          )}
        >
          <Icon
            className={cn(
              'w-4 h-4',
              isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400',
            )}
          />
          <span
            className={cn(
              'text-sm font-medium',
              isActive && 'font-semibold text-primary',
            )}
          >
            {title}
          </span>
        </ProgressBarLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const NavigationSection: React.FC<{ section: NavigationSection }> = ({
  section,
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const anyItemActive = section.items.some((item) =>
    item.url === '/' ? pathname === '/' : pathname.startsWith(item.url),
  );

  return (
    <SidebarGroup>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-3 py-2 cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.title}
            </span>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-gray-500 transition-transform duration-200',
                isOpen && 'transform rotate-180',
              )}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {section.items.map((item) => (
                <NavigationItem
                  key={item.title}
                  {...item}
                  isActive={
                    item.url === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.url)
                  }
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
};

export function AppSidebar({
  user,
}: {
  user: User;
}): JSX.Element {

  return (
    <Sidebar variant="inset">
      <NavHeader />
      <SidebarContent className="space-y-2">
        {researcherNavigationSections.map((section) => (
          <NavigationSection key={section.title} section={section} />
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
