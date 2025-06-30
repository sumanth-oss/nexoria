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
    // Main container: full height, responsive padding, dark gradient background
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black p-4 sm:p-6 lg:p-8 text-gray-100 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto w-full flex-1">
        {' '}
        {/* Responsive grid columns, takes full width and grows vertically */}
        {/* Details Card - Takes full column on small, half on medium, 2/5 on large */}
        <div className="col-span-full md:col-span-1 lg:col-span-2 bg-gray-900 border border-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col">
          {' '}
          {/* Responsive padding, flex column to push button to bottom */}
          <h2 className="font-bold text-2xl sm:text-3xl text-white mb-4">
            {' '}
            {/* Responsive text size */}
            {roadMapDetail?.roadmapTitle}
          </h2>
          <div className="space-y-4 flex-1">
            {' '}
            {/* flex-1 to push button down */}
            <div>
              <h3 className="font-semibold text-amber-400 mb-2 text-lg">
                Description
              </h3>{' '}
              {/* Consistent text size */}
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {' '}
                {/* Responsive text size */}
                {roadMapDetail?.description}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400 mb-2 text-lg">
                Duration
              </h3>{' '}
              {/* Consistent text size */}
              <p className="text-gray-300 text-sm sm:text-base">
                {roadMapDetail?.duration}
              </p>{' '}
              {/* Responsive text size */}
            </div>
          </div>
          <Button
            onClick={() => setOpenRoadMapDialog(true)}
            className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 font-semibold
                                hover:from-amber-600 hover:to-orange-600 border-2 border-amber-500
                                hover:border-orange-600 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base" // Responsive text size
          >
            Create Another RoadMap
          </Button>
        </div>
        {/* Map Container - Takes full column on small, half on medium, 3/5 on large */}
        <div className="col-span-full md:col-span-1 lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-4 flex flex-col">
          {' '}
          {/* Responsive padding, flex column for inner content */}
          {roadMapDetail?.initialNodes ? (
            <div className="w-full h-[60vh] sm:h-[70vh] md:h-full min-h-[400px]">
              {' '}
              {/* Responsive height for canvas container, min-height to prevent it from collapsing */}
              <RoadMapCanvas
                initialNodes={roadMapDetail?.initialNodes}
                initialEdges={roadMapDetail?.initialEdges}
              />
            </div>
          ) : (
            <div className="w-full h-[60vh] sm:h-[70vh] md:h-full min-h-[400px] flex items-center justify-center">
              {' '}
              {/* Same responsive height for loader */}
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Generating roadmap...</p>
              </div>
            </div>
          )}
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
