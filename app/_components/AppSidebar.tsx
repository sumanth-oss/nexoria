import React from 'react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Calendar,
  Home,
  Inbox,
  Layers,
  Search,
  Settings,
  UserCircle,
  CreditCard,
  Brain,
  History,
  Sparkles,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Layers,
  },
  {
    title: 'AI Tools',
    url: '/tools',
    icon: Brain,
  },
  {
    title: 'My History',
    url: '/history',
    icon: History,
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: CreditCard,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: UserCircle,
  },
];

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar className="border-r border-[#e9d5ff] bg-gradient-to-b from-white to-[#fefcff]">
      <SidebarHeader>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#39194f] to-[#23003c] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#39194f] to-[#23003c] bg-clip-text text-transparent">
              Nexoria
            </h2>
          </div>
          <p className="text-sm text-gray-500 ml-10">AI Career Guidance</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group w-full
                        ${
                          path.includes(item.url)
                            ? 'bg-gradient-to-r from-[#39194f] to-[#23003c] text-white shadow-lg'
                            : 'text-gray-600 hover:bg-[#e9d5ff] hover:text-[#39194f]'
                        }`}
                    >
                      <item.icon
                        className={`h-5 w-5 transition-colors ${
                          path.includes(item.url)
                            ? 'text-white'
                            : 'text-gray-400 group-hover:text-[#39194f]'
                        }`}
                      />
                      <span>{item.title}</span>
                      {path.includes(item.url) && (
                        <div className="ml-auto w-2 h-2 bg-amber-300 rounded-full"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 mt-3">
              <Link
                href="/tools/roadmap-generator"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#39194f] bg-[#e9d5ff] rounded-lg hover:bg-[#d8b4fe] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Roadmap</span>
              </Link>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 border-t border-[#e9d5ff]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <div className="text-xs">
              <p className="font-medium text-gray-700">Sumanth</p>
              <p className="text-gray-500">Developer</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Powered by Gemini • v1.0
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
