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
    <Sidebar
      className="
        border-r border-gray-800
        text-gray-100
        [box-shadow:0_0_80px_rgba(168,85,247,0.2)_inset]
        // The actual dark background will now come from bg-sidebar defined in globals.css
        // You can remove bg-gray-950 from here if you want it purely controlled by --sidebar-background
      "
    >
      <SidebarHeader>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="
                w-9 h-9 rounded-lg flex items-center justify-center
                bg-gradient-to-br from-purple-500 via-purple-700 to-black // Using the new purple-500
                shadow-lg
              "
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <Link href="/">
              <h2
                className="
                text-3xl font-extrabold
                bg-gradient-to-r from-purple-500 via-amber-500 to-orange-500 // Using the new accent colors
                bg-clip-text text-transparent
              "
              >
                Nexoria
              </h2>
            </Link>
          </div>
          <p className="text-sm text-gray-400 ml-11 tracking-wide">
            AI Career Guidance
          </p>
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
                      className={`
                        relative flex items-center gap-3 px-5 py-3 rounded-xl text-base font-medium
                        transition-all duration-300 ease-in-out group w-full
                        ${
                          path.includes(item.url)
                            ? 'bg-purple-900 text-white shadow-xl'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white' // Changed to hover:text-white
                        }
                        ${
                          path.includes(item.url)
                            ? 'before:absolute before:inset-0 before:rounded-xl before:bg-white/5 before:backdrop-blur-sm before:z-[-1]'
                            : ''
                        }
                      `}
                    >
                      <item.icon
                        className={`h-6 w-6 transition-colors duration-300
                          ${
                            path.includes(item.url)
                              ? 'text-amber-500 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' // Uses the new amber-500
                              : 'text-gray-500 group-hover:text-white'
                          }
                        `}
                      />
                      <span>{item.title}</span>
                      {path.includes(item.url) && (
                        <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> // Uses the new orange-500
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 mt-3">
              <Link
                href="/tools/roadmap-generator"
                className="
                  flex items-center gap-3 px-4 py-2 text-sm font-semibold
                  bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg // Using the new orange-500
                  shadow-lg transition-all duration-300 ease-in-out
                  hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,165,0,0.5)]
                  transform-gpu
                "
              >
                <Sparkles className="w-5 h-5 text-amber-100" />
                <span>Generate Roadmap</span>
              </Link>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 border-t border-gray-800 bg-gray-900 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="
                w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full // Using shades of the new accent colors
                flex items-center justify-center shadow-lg
              "
            >
              <span className="text-sm font-bold text-black">S</span>
            </div>
            <div className="text-xs">
              <p className="font-medium text-gray-200">Sumanth</p>
              <p className="text-gray-400">Developer</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Powered by{' '}
            <span
              className="
                bg-gradient-to-r from-purple-400 via-amber-400 to-orange-400 // Using shades of the new accent colors
                bg-clip-text text-transparent font-semibold
              "
            >
              Gemini
            </span>{' '}
            • v1.0
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
