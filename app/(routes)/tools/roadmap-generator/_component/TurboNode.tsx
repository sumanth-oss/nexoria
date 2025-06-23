// TurboNode.tsx
import { Handle, Position } from '@xyflow/react';
import Link from 'next/link';
import React from 'react';

function TurboNode({ data }: any) {
  return (
    <div className="rounded-xl border-2 border-[#e9d5ff] bg-amber-300 shadow-lg hover:shadow-xl transition-all duration-200 w-72 group hover:border-[#39194f]">
      <div className="p-4">
        <h3 className="font-bold text-lg text-[#23003c] mb-3 group-hover:text-[#39194f] transition-colors">
          {data.title}
        </h3>

        <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {data.description}
        </p>

        {data?.link && (
          <Link
            className="inline-flex items-center text-[#39194f] hover:text-[#23003c] font-medium text-sm border border-[#39194f] hover:border-[#23003c] bg-white hover:bg-[#e9d5ff] px-3 py-2 rounded-lg transition-all duration-200"
            href={data.link}
            target="_blank"
          >
            Learn More
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        )}

        <Handle
          type="target"
          position={Position.Top}
          className="!bg-[#39194f] !border-2 !border-white !w-3 !h-3"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-[#39194f] !border-2 !border-white !w-3 !h-3"
        />
      </div>
    </div>
  );
}

export default TurboNode;
