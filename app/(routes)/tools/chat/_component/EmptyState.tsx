// app/tools/_component/EmptyState.tsx (or similar path)
import React from 'react';

const questionList = [
  'What skills do I need for a data analyst role?',
  'How do I switch career to AIML Engineer?', // Corrected typo
  'Can you help me prepare for a job interview?', // Added another example question
  'What are the latest trends in the tech job market?',
];

function EmptyState({ selctedQuestion }: any) {
  return (
    // Adjusted padding, min-h, and overall width handling
    <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] px-4 sm:px-6 py-8 sm:py-12 bg-gray-950 rounded-xl">
      <div className="text-center mb-8 sm:mb-12">
        <p className="text-gray-300 text-base sm:text-lg max-w-md mx-auto">
          Get personalized guidance for your career journey
        </p>
      </div>
      {/* Responsive gap and max-width for buttons */}
      <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-xl">
        {questionList.map((ques, index) => (
          <button
            key={index}
            onClick={() => selctedQuestion(ques)}
            className="group px-4 py-3 sm:px-6 sm:py-4 text-left rounded-xl bg-gray-900
                       border-2 border-gray-800
                       hover:border-amber-500 hover:bg-gradient-to-r from-amber-500 to-orange-500
                       transition-all duration-200 ease-in-out
                       shadow-sm hover:shadow-md text-sm sm:text-base" // Responsive padding and text size
          >
            <span
              className="text-gray-100 group-hover:text-gray-950
                         font-medium transition-colors duration-200"
            >
              {ques}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;
