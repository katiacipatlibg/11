import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FlashCards from './components/FlashCards';
import Quiz from './components/Quiz';
import Cases from './components/Cases';
import Assistant from './components/Assistant';
import { Layers, CheckSquare, BookOpen, MessageSquareText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards');

  const tabs = [
    { id: 'flashcards', label: 'Tarjetas', icon: Layers },
    { id: 'quiz', label: 'Examen', icon: CheckSquare },
    { id: 'cases', label: 'Casos', icon: BookOpen },
    { id: 'assistant', label: 'Asistente', icon: MessageSquareText },
  ];

  return (
    <div className="min-h-screen bg-swamp-light font-sans text-gray-800 pb-20">
      {/* Header */}
      <header className="bg-shrek-dark text-white p-6 shadow-md sticky top-0 z-10 border-b-4 border-shrek-green">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-shrek-green rounded-full flex items-center justify-center text-2xl font-bold text-shrek-dark shadow-inner">
              11
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold tracking-tight flex items-center gap-2">
                Entornos Escolares Seguros <span className="text-2xl">🧌</span>
              </h1>
              <p className="text-sm text-swamp-dark font-medium">Guía de Estudio Interactiva</p>
            </div>
          </div>
          <div className="flex gap-2 text-2xl">
            <span title="Burro">🐴</span>
            <span title="Fiona">👸</span>
            <span title="Gato con Botas">🐱👢</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-5xl mx-auto p-4 mt-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-white p-2 rounded-full shadow-sm border-2 border-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-200 ${
                  isActive
                    ? 'bg-shrek-green text-shrek-dark shadow-md'
                    : 'text-gray-500 hover:bg-swamp-light hover:text-mud-brown'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-shrek-dark' : ''} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === 'flashcards' && <FlashCards />}
            {activeTab === 'quiz' && <Quiz />}
            {activeTab === 'cases' && <Cases />}
            {activeTab === 'assistant' && <Assistant />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-50 pointer-events-none flex items-center gap-2">
        <span className="font-display font-bold text-mud-brown text-xl tracking-widest uppercase">
          Miss Karu
        </span>
      </div>
    </div>
  );
}
