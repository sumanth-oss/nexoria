import React from 'react';

const questionList = [
  'What skills do I need for a data analyst role?',
  'How do i switch career to AIML Engineer',
];

function EmptyState({ selctedQuestion }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12 bg-gray-950 rounded-xl">
      {' '}
      {/* Dark background for EmptyState */}
      <div className="text-center mb-12">
        <p className="text-gray-300 text-lg max-w-md mx-auto">
          Get personalized guidance for your career journey
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-2xl">
        {questionList.map((ques, index) => (
          <button
            key={index}
            onClick={() => selctedQuestion(ques)}
            className="group px-6 py-4 text-left rounded-xl bg-gray-900 // Dark background for buttons
                       border-2 border-gray-800 // Darker 
                       hover:border-amber-500 hover:bg-gradient-to-r from-amber-500 to-orange-500 // Amber/Orange hover
                       transition-all duration-200 ease-in-out
                       shadow-sm hover:shadow-md"
          >
            <span
              className="text-gray-100 group-hover:text-gray-950 // Text becomes dark on amber/orange hover
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
