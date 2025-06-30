import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

function AppHeader() {
  return (
    <div
      className="
        p-4 shadow-sm flex items-center justify-between w-full
        bg-gray-950 // Dark background matching the sidebar's base
        border-b border-gray-800 // Bottom border like the sidebar's right 
        text-gray-100 // Text color for consistency
        [box-shadow:0_0_80px_rgba(168,85,247,0.1)_inset] 
      "
    >
      <SidebarTrigger />
      {/* You can add more header content here, e.g., a title or user menu */}
    </div>
  );
}

export default AppHeader;
