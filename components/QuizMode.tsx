import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quiz';

const QuizMode: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (currentQuestionIndex >= QUIZ_QUESTIONS.length) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-cyan-400">Kuis Selesai!</h2>
            <p className="mt-4 text-lg">Skor akhir Anda adalah:</p>
            <p className="text-5xl font-bold my-4">{score} / {QUIZ_QUESTIONS.length}</p>
            <button 
                onClick={handleRestart}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                Ulangi Kuis
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-8">
        <p className="text-cyan-400 font-semibold">Pertanyaan {currentQuestionIndex + 1} dari {QUIZ_QUESTIONS.length}</p>
        <h2 className="text-2xl font-bold mt-2">{question.question}</h2>
        
        <div className="mt-6 space-y-3">
            {question.options.map(option => {
                const isSelected = selectedAnswer === option;
                const isCorrect = question.correctAnswer === option;
                
                let buttonClass = 'bg-gray-700 hover:bg-gray-600';
                if (showResult) {
                    if (isCorrect) buttonClass = 'bg-green-500/50 border-green-500';
                    else if (isSelected && !isCorrect) buttonClass = 'bg-red-500/50 border-red-500';
                    else buttonClass = 'bg-gray-800 border-gray-700';
                } else if (isSelected) {
                    buttonClass = 'bg-cyan-600/50 border-cyan-500';
                }
                
                return (
                    <button 
                        key={option} 
                        onClick={() => handleSelectAnswer(option)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${buttonClass}`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>

        {showResult && (
             <div className="mt-4 p-4 rounded-lg bg-gray-900/50 border border-gray-600">
                <p className="font-bold">{selectedAnswer === question.correctAnswer ? "Benar!" : "Salah."}</p>
                <p className="text-sm text-gray-400 mt-1">{question.explanation}</p>
            </div>
        )}

        <div className="mt-8 text-right">
            {showResult ? (
                <button onClick={handleNext} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg">Berikutnya</button>
            ) : (
                <button onClick={handleSubmit} disabled={!selectedAnswer} className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg">Kirim</button>
            )}
        </div>
      </div>
    </div>
  );
};

export default QuizMode;