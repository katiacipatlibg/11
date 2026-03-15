import { useState } from 'react';
import { motion } from 'motion/react';
import { questions } from '../data';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === question.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl border-4 border-shrek-green">
        <h2 className="text-4xl font-display font-bold text-shrek-dark mb-4">¡Terminaste!</h2>
        <p className="text-xl text-mud-brown mb-8">
          Tu puntuación: <span className="font-bold text-shrek-green">{score}</span> de {questions.length}
        </p>
        <button
          onClick={restartQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-shrek-green text-shrek-dark font-bold rounded-full hover:bg-opacity-90 transition-colors shadow-md"
        >
          <RefreshCcw size={20} />
          Volver a intentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-display font-bold text-shrek-dark">Preguntas tipo examen</h2>
        <span className="px-4 py-2 bg-swamp-dark text-mud-brown font-bold rounded-full text-sm">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border-4 border-shrek-green p-6 sm:p-10">
        <h3 className="text-xl sm:text-2xl font-sans font-semibold text-gray-800 mb-8">
          {question.text}
        </h3>

        <div className="flex flex-col gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === question.correct;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            let buttonClass = "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ";
            
            if (!showResult) {
              buttonClass += "border-gray-200 hover:border-shrek-green hover:bg-swamp-light text-gray-700";
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

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-end"
          >
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 px-6 py-3 bg-mud-brown text-white font-bold rounded-full hover:bg-opacity-90 transition-colors shadow-md"
            >
              {currentIndex < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
