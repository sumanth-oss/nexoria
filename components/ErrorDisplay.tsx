import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorDisplay = React.memo(({
  message,
  onRetry,
  retryLabel = 'Try Again',
}: ErrorDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <p className="text-red-400 mb-4 text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-amber-500 text-gray-950 rounded-lg hover:bg-amber-600 transition-colors"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
});

ErrorDisplay.displayName = 'ErrorDisplay';

