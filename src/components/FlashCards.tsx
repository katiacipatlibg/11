import { useState } from 'react';
import { motion } from 'motion/react';
import { flashcards } from '../data';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

export default function FlashCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const card = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-shrek-dark mb-2">Tarjetas de Estudio</h2>
        <p className="text-sm text-mud-brown">Tarjeta {currentIndex + 1} de {flashcards.length}</p>
      </div>

      <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl border-4 border-shrek-green flex flex-col items-center justify-center p-8 text-center">
            <div className="text-shrek-green mb-4">
              <RefreshCw size={32} className="opacity-50" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-shrek-dark">
              {card.front}
            </h3>
            <p className="mt-4 text-sm text-gray-500 font-medium uppercase tracking-widest">Toca para voltear</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-shrek-dark rounded-2xl shadow-xl border-4 border-shrek-green flex flex-col items-center justify-center p-8 text-center [transform:rotateY(180deg)]">
            <h3 className="text-xl sm:text-2xl font-sans font-medium text-white whitespace-pre-line">
              {card.back}
            </h3>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between w-full mt-8 gap-4">
        <button
          onClick={prevCard}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-mud-brown text-white hover:bg-opacity-90 transition-colors shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-6 py-3 rounded-full bg-shrek-green text-shrek-dark font-bold hover:bg-opacity-90 transition-colors shadow-md"
        >
          Voltear
        </button>
        <button
          onClick={nextCard}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-mud-brown text-white hover:bg-opacity-90 transition-colors shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
