// RoadMapGenerator.tsx
'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RoadMapCanvas from '../_component/RoadMapCanvas';
import RoadMapGeneratorDialog from '@/app/(routes)/dashboard/_components/RoadMapGeneratorDialog';

function RoadMapGenerator() {
  const { roadMapId } = useParams();
  const [roadMapDetail, setRoadMapDetails] = useState<any>();
  const [openRoadMapDialog, setOpenRoadMapDialog] = useState(false);

  useEffect(() => {
    roadMapId && GetRoadMapDetails();
  }, [roadMapId]);

  const GetRoadMapDetails = async () => {
    const result = await axios.get('/api/history?recordId=' + roadMapId);

    setRoadMapDetails(result.data?.content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black p-6 text-gray-100">
      {' '}
      {/* Dark gradient background, light text */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {/* Details Card - Takes 2 columns */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
          {' '}
          {/* Dark card background, darker border */}
          <h2 className="font-bold text-3xl text-white mb-4">
            {' '}
            {/* White title */}
            {roadMapDetail?.roadmapTitle}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-amber-400 mb-2">Description</h3>{' '}
              {/* Amber heading */}
              <p className="text-gray-300 leading-relaxed">
                {' '}
                {/* Lighter gray text */}
                {roadMapDetail?.description}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400 mb-2">Duration</h3>{' '}
              {/* Amber heading */}
              <p className="text-gray-300">{roadMapDetail?.duration}</p>{' '}
              {/* Lighter gray text */}
            </div>
          </div>
          <Button
            onClick={() => setOpenRoadMapDialog(true)}
            className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 font-semibold
                       hover:from-amber-600 hover:to-orange-600 border-2 border-amber-500
                       hover:border-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Create Another RoadMap
          </Button>
        </div>

        {/* Map Container - Takes 3 columns */}
        <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-4">
          {' '}
          {/* Dark card background, darker border */}
          <div className="w-full h-[80vh]">
            <RoadMapCanvas
              initialNodes={roadMapDetail?.initialNodes}
              initialEdges={roadMapDetail?.initialEdges}
            />
          </div>
        </div>
      </div>
      <RoadMapGeneratorDialog
        openRoadMapDialog={openRoadMapDialog}
        setOpenRoadMapDialog={setOpenRoadMapDialog}
      />
    </div>
  );
}

export default RoadMapGenerator;
