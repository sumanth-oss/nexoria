'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import axios from 'axios';
import AppHeader from '../_components/AppHeader';
import { AppSidebar } from '../_components/AppSidebar';

function DashboardProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-gray-950 text-gray-100 min-h-screen">
        <AppHeader />
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default DashboardProvider;
