// app/profile/[[...rest]]/page.jsx
'use client'; // <-- Ensure this is at the top for Client Components
import { UserProfile } from '@clerk/nextjs';
import React from 'react';

function Profile() {
  return (
    <div className="flex justify-center py-8">
      {' '}
      {/* Optional: Add some styling for centering */}
      <UserProfile path="/profile" routing="path" />
    </div>
  );
}

export default Profile;
