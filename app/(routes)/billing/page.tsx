// app/billing/page.jsx
'use client';

import { PricingTable } from '@clerk/nextjs';
import React from 'react';
import { dark } from '@clerk/themes'; // Import the dark theme

function Billing() {
  return (
    <div className="flex flex-col items-center py-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-gray-900 min-h-screen text-white">
      <h2 className="font-bold text-3xl text-center mb-2">Choose your plan</h2>
      <p className="text-lg text-center text-gray-300 mb-8">
        Select a subscription bundle to get access
      </p>
      <div className="mt-6 w-full max-w-5xl">
        {' '}
        
        <PricingTable
          appearance={{
            baseTheme: dark, 

            variables: {
              colorPrimary: 'hsl(260 90% 70%)', // Your vibrant purple
              colorText: 'hsl(210 40% 98%)', // Light text color
              colorTextOnPrimaryBackground: 'hsl(0 0% 100%)', // White text on primary buttons
              colorBackground: 'hsl(240 10% 3.9%)', // Deep dark background, matching your app's --background
              colorInputBackground: 'hsl(240 8% 12%)', // Darker input fields/secondary backgrounds
              colorInputText: 'hsl(210 40% 98%)', // Input text color
              colorShimmer: 'hsl(240 8% 20%)', // Subtle shimmer for loading states
              // You can add more specific variables here if needed
            },
            elements: {
              // Main card container for each plan
              card: {
                backgroundColor: 'hsl(240 10% 5%)', // Very dark background like your sidebar
                border: '1px solid hsl(240 5% 15%)', // Subtle border
                boxShadow: '0 0 80px rgba(168,85,247,0.1) inset', // Inner glow from your theme
                borderRadius: '0.75rem', // Match your desired border-radius
              },
              // The header of each pricing card (e.g., "Basic Plan")
              pricingCardHeader: {
                backgroundColor: 'hsl(240 8% 12%)', // Slightly lighter dark for headers
                borderBottom: '1px solid hsl(240 5% 15%)',
                borderRadius: '0.75rem 0.75rem 0 0', // Rounded top corners
              },
              // The current plan indicator (e.g., "CURRENT PLAN")
              currentPlanBadge: {
                backgroundColor: 'hsl(39 100% 50%)', // Amber for highlights
                color: 'hsl(0 0% 0%)', // Black text on amber
                fontWeight: 'bold',
                borderRadius: '9999px', // Fully rounded (pill shape)
              },
              // The "Select" or "Continue" button for each plan
              pricingCardActions: {
                backgroundColor: 'transparent', // Ensure no background on the actions block
              },
              button: {
                // Apply gradient to the main action button
                background:
                  'linear-gradient(to right, hsl(270 100% 50%), hsl(39 100% 50%), hsl(27 100% 50%))', // Purple -> Amber -> Orange
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  opacity: 0.9,
                  transform: 'scale(1.01)', // Slight scale effect on hover
                  transition: 'transform 0.2s ease-in-out',
                },
                borderRadius: '0.5rem', // Match your buttons
                padding: '0.75rem 1.5rem', // Adjust padding as needed
              },
              // Text for features or plan details
              pricingCardFeatures: {
                color: 'hsl(210 10% 80%)', // Lighter gray for feature text
              },
              // Price text (e.g., "$10")
              pricingCardPrice: {
                color: 'hsl(210 40% 98%)', // White text for price
              },
              // Price period (e.g., "/month")
              pricingCardPeriod: {
                color: 'hsl(210 10% 80%)', // Lighter gray for period
              },
              // Feature list items (the `li` elements)
              pricingCardFeaturesList: {
                listStyle: 'none', // Remove default list styling
                paddingLeft: '0',
              },
              // Individual feature item
              pricingCardFeature: {
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem', // Space between icon and text
                marginBottom: '0.5rem',
              },
              // Feature icons (the checkmarks, etc.)
              pricingCardIcon: {
                color: 'hsl(39 100% 50%)', // Amber for icons
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Billing;
