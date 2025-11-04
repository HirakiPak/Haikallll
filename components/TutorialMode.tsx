import React, { useState } from 'react';
import { TUTORIAL_STEPS } from '../data/tutorial';

const TutorialMode: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = TUTORIAL_STEPS[currentStep];

  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, TUTORIAL_STEPS.length - 1));
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-8">
        <div className="text-center">
            <p className="text-cyan-400 font-semibold">Langkah {currentStep + 1} dari {TUTORIAL_STEPS.length}</p>
            <h2 className="text-3xl font-bold mt-2 text-white">{step.title}</h2>
            <p className="mt-4 text-lg text-gray-300">{step.description}</p>
            <div className="mt-6 text-left bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                <p className="text-gray-400">{step.details}</p>
            </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
            <button 
                onClick={goToPrevStep} 
                disabled={currentStep === 0}
                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
                Sebelumnya
            </button>
            <div className="flex items-center">
              {TUTORIAL_STEPS.map((_, index) => (
                <div key={index} className={`w-3 h-3 rounded-full mx-1 ${index === currentStep ? 'bg-cyan-500' : 'bg-gray-600'}`}></div>
              ))}
            </div>
            <button 
                onClick={goToNextStep} 
                disabled={currentStep === TUTORIAL_STEPS.length - 1}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-900 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
                Berikutnya
            </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialMode;