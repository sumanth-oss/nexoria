// app/profile/[[...rest]]/page.jsx
'use client';

import { UserProfile } from '@clerk/nextjs';
import React from 'react';
import { dark } from '@clerk/themes'; // Import the dark theme

function Profile() {
  return (
    <div className="flex justify-center py-8 bg-gray-900 min-h-screen text-white">
      {' '}
      {/* Added background to match theme */}
      <UserProfile
        path="/profile"
        routing="path"
        appearance={{
          baseTheme: dark, // Start with Clerk's dark theme

          variables: {
            colorPrimary: 'hsl(260 90% 70%)', // A purple tone that might work with your existing gradients
            colorText: 'hsl(210 20% 98%)', // Lighter text color for contrast
            colorTextOnPrimaryBackground: 'hsl(210 20% 98%)', // Text on primary buttons
            colorBackground: 'hsl(222.2 84% 4.9%)', // Darker background to match your app
            colorInputBackground: 'hsl(217.2 32.6% 17.5%)', // Darker input fields
            colorInputText: 'hsl(210 20% 98%)', // Input text color

            // You can add more specific variables here to match your gradients
            // Example:
            // colorDanger: 'hsl(0 80% 60%)', // For error states
            // colorSuccess: 'hsl(142 70% 50%)', // For success states
            // borderRadius: '0.75rem', // Match your rounded-xl if desired
          },
          elements: {
            // Target specific elements using Tailwind classes
            // These classes are applied directly to Clerk's internal elements.
            // You might need to inspect Clerk's components in your browser's dev tools
            // to find the exact class names for deeper customization.

            // Example: Make the card background match your sidebar
            card: {
              backgroundColor: 'hsl(222.2 84% 4.9%)', // Deep background
              border: '1px solid hsl(215 27.9% 16.9%)', // Subtle border
              boxShadow: '0 0 80px rgba(168,85,247,0.2) inset', // Your desired inner shadow
              borderRadius: '0.75rem', // Apply your preferred border-radius
            },
            // Style primary buttons (e.g., "Continue", "Save")
            formButtonPrimary: {
              background:
                'linear-gradient(to right, hsl(260 90% 70%), hsl(30 90% 50%), hsl(30 90% 50%))', // Purple to Amber gradient
              color: 'white',
              '&:hover': {
                opacity: 0.9,
              },
            },
            // Style secondary buttons (e.g., "Cancel")
            formButtonReset: {
              backgroundColor: 'hsl(217.2 32.6% 17.5%)',
              color: 'hsl(210 20% 98%)',
              '&:hover': {
                backgroundColor: 'hsl(217.2 32.6% 25%)',
              },
            },
            // Style input fields
            formFieldInput: {
              backgroundColor: 'hsl(217.2 32.6% 17.5%)',
              borderColor: 'hsl(215 27.9% 16.9%)',
              color: 'hsl(210 20% 98%)',
              '&:focus': {
                borderColor: 'hsl(260 90% 70%)', // Highlight with your theme color on focus
              },
            },
            // Labels for form fields
            formFieldLabel: {
              color: 'hsl(210 20% 98%)',
            },
            // Links
            footerActionLink: {
              color: 'hsl(260 90% 70%)',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            // The active tab in the sidebar of UserProfile
            navbarButtonActive: {
              backgroundColor: 'hsl(260 90% 70%)', // Active tab background
              color: 'white',
              borderRadius: '0.5rem',
            },
            navbarButtonInactive: {
              color: 'hsl(210 20% 98%)', // Inactive tab text
              '&:hover': {
                backgroundColor: 'hsl(217.2 32.6% 17.5%)',
              },
            },
            // Section where social login buttons are
            socialButtonsBlockButton: {
              backgroundColor: 'hsl(217.2 32.6% 17.5%)',
              borderColor: 'hsl(215 27.9% 16.9%)',
              color: 'hsl(210 20% 98%)',
              '&:hover': {
                backgroundColor: 'hsl(217.2 32.6% 25%)',
              },
            },
            // Headers within sections (e.g., "Personal Information")
            headerTitle: {
              color: 'hsl(210 20% 98%)',
            },
            // Subtitles/descriptions
            headerSubtitle: {
              color: 'hsl(210 10% 80%)',
            },
          },
        }}
      />
    </div>
  );
}

export default Profile;
