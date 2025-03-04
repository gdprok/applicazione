import { useState } from "react";
import { Calendar, MessageSquare, File, Home, Settings, Folder, Briefcase, ClipboardCheck } from "lucide-react";

function ChatbotInput({ onSendQuestion }) {
  const [question, setQuestion] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <textarea
        placeholder="Scrivi qui il tuo quesito legale..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded"
        onClick={() => onSendQuestion(question)}
        disabled={!question.trim()}
      >
        Invia Domanda
      </button>
    </div>
  );
}

function ChatbotResponse({ response, onShowOptions }) {
  return (
    <div className="mt-4 p-2 border rounded-lg bg-gray-100">
      <p>{response}</p>
      <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded" onClick={onShowOptions}>
        Continua
      </button>
    </div>
  );
}

function ChatbotActions({ onSelectOption }) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <button className="w-full bg-gray-200 py-2 rounded flex gap-2 items-center" onClick={() => onSelectOption("consulenza")}> 
        <Calendar size={16} /> Prenota una consulenza gratuita
      </button>
      <button className="w-full bg-gray-200 py-2 rounded flex gap-2 items-center" onClick={() => onSelectOption("chat_avvocato")}> 
        <MessageSquare size={16} /> Chat con un avvocato (Premium)
      </button>
      <button className="w-full bg-gray-200 py-2 rounded flex gap-2 items-center" onClick={() => onSelectOption("revisione_documento")}> 
        <File size={16} /> Invia un documento per revisione
      </button>
    </div>
  );
}

function Sidebar({ onSelectPage }) {
  return (
    <div className="w-1/5 min-h-screen bg-gray-200 p-4 flex flex-col gap-4">
      <button className="flex gap-2 items-center" onClick={() => onSelectPage("dashboard")}> 
        <Home size={16} /> Dashboard
      </button>
      <button className="flex gap-2 items-center" onClick={() => onSelectPage("compliance_gdpr")}> 
        <Folder size={16} /> Compliance GDPR
      </button>
      <button className="flex gap-2 items-center" onClick={() => onSelectPage("diritto_lavoro")}> 
        <Briefcase size={16} /> Diritto del Lavoro
      </button>
      <button className="flex gap-2 items-center" onClick={() => onSelectPage("diritto_societario")}> 
        <ClipboardCheck size={16} /> Diritto Societario
      </button>
      <button className="flex gap-2 items-center" onClick={() => onSelectPage("chatbot")}> 
        <MessageSquare size={16} /> Chatbot
      </button>
      <button className="flex gap-2 items-center" onClick={() => onSelectPage("settings")}> 
        <Settings size={16} /> Impostazioni
      </button>
    </div>
  );
}

export default function LegalSupportApp() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [response, setResponse] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSendQuestion = (question) => {
    setResponse(
      `L'AI ha analizzato la tua domanda: "${question}". Ecco alcune informazioni generali. Tuttavia, ti consigliamo di approfondire con un esperto.`
    );
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelectPage={setCurrentPage} />
      <div className="w-4/5 p-6">
        {currentPage === "dashboard" && <h2 className="text-2xl font-bold">📊 Dashboard</h2>}
        {currentPage === "compliance_gdpr" && <h2 className="text-2xl font-bold">📂 Compliance GDPR</h2>}
        {currentPage === "diritto_lavoro" && <h2 className="text-2xl font-bold">💼 Diritto del Lavoro</h2>}
        {currentPage === "diritto_societario" && <h2 className="text-2xl font-bold">🏛️ Diritto Societario</h2>}
        {currentPage === "settings" && <h2 className="text-2xl font-bold">⚙️ Impostazioni</h2>}
        {currentPage === "chatbot" && (
          <div className="relative w-full max-w-xl p-4 shadow-md border rounded-lg">
            <h2 className="text-xl font-bold mb-2">💬 Assistente Legale AI</h2>
            <p className="text-sm text-gray-600 mb-4">
              Ciao! Sono il tuo assistente legale AI. Come posso aiutarti oggi?
            </p>
            {!response && <ChatbotInput onSendQuestion={handleSendQuestion} />}
            {response && !showOptions && (
              <ChatbotResponse response={response} onShowOptions={() => setShowOptions(true)} />
            )}
            {showOptions && !selectedOption && <ChatbotActions onSelectOption={handleSelectOption} />}
            {selectedOption === "consulenza" && <p className="mt-4 text-green-600">📅 Prenota una consulenza con un esperto.</p>}
            {selectedOption === "chat_avvocato" && <p className="mt-4 text-blue-600">💬 Avvia una chat con un avvocato.</p>}
            {selectedOption === "revisione_documento" && <p className="mt-4 text-orange-600">📄 Carica il documento per la revisione.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
