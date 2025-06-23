import { PricingTable } from '@clerk/nextjs';
import React from 'react';

function Billing() {
  return (
    <div>
      <h2 className="font-bold text-3xl text-center">Choose your plan</h2>
      <p className="text-lg text-center">
        Select a subsripton bundle to get access
      </p>
      <div className="mt-6">
        <PricingTable />
      </div>
    </div>
  );
}

export default Billing;
