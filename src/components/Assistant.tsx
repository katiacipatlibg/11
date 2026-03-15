import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `Eres un asistente virtual experto en el documento "11 Entornos Escolares Seguros en Escuelas de Educación Básica".
Tu objetivo es ayudar a los usuarios a estudiar y comprender los protocolos de seguridad escolar.
Responde de manera clara, concisa y educativa.
Tienes temática de Shrek, así que puedes usar expresiones como "¡Por mi pantano!", "Ogro", "Burro", etc., pero mantén el profesionalismo al explicar los protocolos.
El documento cubre:
1. Comunicación y Disciplina Familiar
2. Revisión desde Casa y Objetos Prohibidos
3. Mapas de Riesgos y Recursos
4. Inscripciones y Credenciales
5. Procedimiento de Revisión de Mochilas
6. Hallazgo de Armas o Drogas
7. Balaceras o Disturbios Externos
8. Detección de Violencia
9. Entrevista a Víctimas
10. Justicia Restaurativa vs. Delitos Graves`;

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: '¡Hola! Soy tu ogro-asistente experto en Entornos Escolares Seguros. ¿En qué te puedo ayudar hoy? ¡Pregúntame lo que quieras sobre los protocolos!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: 'gemini-3.1-flash-lite-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      // Replay history for context (simplified for this demo)
      for (const msg of messages.slice(1)) {
        if (msg.role === 'user') {
          await chat.sendMessage({ message: msg.content });
        }
      }

      const response = await chat.sendMessage({ message: userMessage });
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: response.text || 'Lo siento, hubo un problema en mi pantano y no pude responder.'
      }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: '¡Ouch! Hubo un error al conectar con mi pantano. Intenta de nuevo más tarde.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-[600px] bg-white rounded-3xl shadow-xl border-4 border-shrek-green overflow-hidden">
      <div className="bg-shrek-dark p-4 flex items-center gap-3 text-white">
        <div className="w-10 h-10 rounded-full bg-shrek-green flex items-center justify-center">
          <Bot size={24} className="text-shrek-dark" />
        </div>
        <div>
          <h2 className="font-display font-bold text-lg">Asistente Shrek</h2>
          <p className="text-xs text-swamp-light opacity-80">Experto en Entornos Seguros</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-swamp-light">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-mud-brown text-white rounded-br-sm'
                  : 'bg-white border-2 border-shrek-green text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 opacity-70">
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {msg.role === 'user' ? 'Tú' : 'Shrek'}
                </span>
              </div>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-shrek-green rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-2">
              <Loader2 className="animate-spin text-shrek-green" size={20} />
              <span className="text-sm text-gray-500 font-medium">Pensando en su pantano...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t-2 border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta aquí..."
          className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:border-shrek-green focus:bg-white transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="w-12 h-12 rounded-full bg-shrek-green text-shrek-dark flex items-center justify-center hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          <Send size={20} className="ml-1" />
        </button>
      </form>
    </div>
  );
}
