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
      className="rounded-xl overflow-hidden bg-gray-800"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          style: {
            stroke: '#fbbf24',
            strokeWidth: 2,
          },
          type: 'smoothstep',
        }}
        className="bg-gray-900"
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        panOnScroll={false}
        // Ensure nodes are focusable to allow interaction if needed
        nodesFocusable={true} // Add this if it's not implicitly true
      >
        <Controls
          className="!bg-gray-800 !border-gray-700 !shadow-lg [&>button]:!text-gray-300 [&>button:hover]:!bg-gray-700 [&>button:hover]:!text-amber-400"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap
          className="!bg-gray-800 !border-gray-700 !shadow-lg"
          nodeColor={(node) => '#fbbf24'}
          maskColor="rgba(0, 0, 0, 0.5)"
          pannable={false}
          zoomable={false}
        />
        {/* @ts-ignore */}
        <Background variant="dots" gap={20} size={2} color="#4b5563" />
      </ReactFlow>
    </div>
  );
}

export default RoadMapCanvas;
