import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = React.memo(({
  message = 'Loading...',
  subMessage,
  size = 'md',
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`animate-spin rounded-full border-b-2 border-amber-500 ${sizeClasses[size]} mb-4`}
      />
      <p className="text-gray-400">{message}</p>
      {subMessage && (
        <p className="text-gray-500 text-sm mt-2">{subMessage}</p>
      )}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

