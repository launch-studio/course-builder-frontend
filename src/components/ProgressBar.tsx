import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                    Прогресс создания
                </h3>
                <span className="text-white/60 text-sm">
                    Шаг {currentStep} из {totalSteps}
                </span>
            </div>

            {/* Прогресс-бар */}
            <div className="w-full bg-white/10 rounded-full h-2 mb-6">
                <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Шаги */}
            <div className="flex justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-300 ${index + 1 < currentStep
                                ? 'bg-green-500 text-white'
                                : index + 1 === currentStep
                                    ? 'bg-purple-500 text-white shadow-lg'
                                    : 'bg-white/20 text-white/60'
                            }`}>
                            {index + 1 < currentStep ? '✓' : index + 1}
                        </div>
                        <span className={`text-xs text-center max-w-20 ${index + 1 <= currentStep ? 'text-white' : 'text-white/40'
                            }`}>
                            {step}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
