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
    console.log(result.data);
    setRoadMapDetails(result.data?.content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9d5ff] to-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {/* Details Card - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white border border-[#e9d5ff] p-6 rounded-2xl shadow-lg">
          <h2 className="font-bold text-3xl text-[#23003c] mb-4">
            {roadMapDetail?.roadmapTitle}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#39194f] mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {roadMapDetail?.description}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#39194f] mb-2">Duration</h3>
              <p className="text-gray-700">{roadMapDetail?.duration}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpenRoadMapDialog(true)}
            className="mt-6 w-full bg-[#39194f] hover:bg-[#23003c] text-white py-3 rounded-xl transition-colors duration-200"
          >
            Create Another RoadMap
          </Button>
        </div>

        {/* Map Container - Takes 3 columns */}
        <div className="lg:col-span-3 bg-white border border-[#e9d5ff] rounded-2xl shadow-lg p-4">
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
