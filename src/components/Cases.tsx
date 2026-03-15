import { useState } from 'react';
import { motion } from 'motion/react';
import { cases } from '../data';
import { CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';

export default function Cases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentCase = cases[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
  };

  const nextCase = () => {
    if (currentIndex < cases.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const prevCase = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-display font-bold text-shrek-dark flex items-center gap-2">
          <BookOpen className="text-mud-brown" />
          Casos de Estudio
        </h2>
        <span className="px-4 py-2 bg-swamp-dark text-mud-brown font-bold rounded-full text-sm">
          Caso {currentIndex + 1} de {cases.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border-4 border-mud-brown p-6 sm:p-10">
        <div className="bg-swamp-light p-6 rounded-2xl mb-8 border-l-4 border-shrek-green">
          <h3 className="text-lg font-sans font-medium text-shrek-dark leading-relaxed">
            {currentCase.text}
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {currentCase.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === currentCase.correct;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            let buttonClass = "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ";
            
            if (!showResult) {
              buttonClass += "border-gray-200 hover:border-mud-brown hover:bg-orange-50 text-gray-700";
            } else if (showCorrect) {
              buttonClass += "border-green-500 bg-green-50 text-green-800 font-medium";
            } else if (showWrong) {
              buttonClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              buttonClass += "border-gray-200 opacity-50 text-gray-500";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showResult}
                className={buttonClass}
              >
                <span className="flex-1 pr-4">{option}</span>
                {showCorrect && <CheckCircle2 className="text-green-500 shrink-0" size={24} />}
                {showWrong && <XCircle className="text-red-500 shrink-0" size={24} />}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={prevCase}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          {showResult && currentIndex < cases.length - 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button
                onClick={nextCase}
                className="flex items-center gap-2 px-6 py-3 bg-shrek-green text-shrek-dark font-bold rounded-full hover:bg-opacity-90 transition-colors shadow-md"
              >
                Siguiente Caso
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
