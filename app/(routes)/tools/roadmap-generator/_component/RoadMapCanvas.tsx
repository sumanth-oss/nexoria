// RoadMapCanvas.tsx
import React, { useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import TurboNode from './TurboNode';

const nodeTypes = {
  turbo: TurboNode,
};

function RoadMapCanvas({ initialNodes, initialEdges }: any) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (initialNodes && initialEdges) {
      // Minimal spacing adjustment since AI will generate better positions
      const spacedNodes = initialNodes.map((node: any) => ({
        ...node,
        position: {
          x: node.position.x,
          y: node.position.y,
        },
        draggable: false, // Make nodes non-draggable
      }));

      setNodes(spacedNodes);
      setEdges(initialEdges);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      className="rounded-xl overflow-hidden bg-amber-100"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          style: {
            stroke: '#39194f',
            strokeWidth: 2,
          },
          type: 'smoothstep',
        }}
        className="bg-white"
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        panOnScroll={false}
      >
        <Controls
          className="!bg-white !border-[#e9d5ff] !shadow-lg"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap
          className="!bg-white !border-[#e9d5ff] !shadow-lg"
          nodeColor={(node) => '#39194f'}
          maskColor="rgba(57, 25, 79, 0.1)"
          pannable={false}
          zoomable={false}
        />
        {/* @ts-ignore */}
        <Background variant="dots" gap={20} size={5} color="#fde68a" />
      </ReactFlow>
    </div>
  );
}

export default RoadMapCanvas;
