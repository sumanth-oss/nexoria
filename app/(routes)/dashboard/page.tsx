import React from 'react';
import WelcomeBanner from './_components/WelcomeBanner';
import AiTools from './_components/AiTools';
import History from './_components/History';

function Dashboard() {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-950 to-black min-h-screen text-gray-100">
      <WelcomeBanner />
      <AiTools />
      <History />
    </div>
  );
}

export default Dashboard;
