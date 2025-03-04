import { useState } from "react";
import { Calendar, MessageSquare, File, Home, Settings, Download, Folder } from "lucide-react";

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

function ChatbotWidget({ isOpen, onToggle }) {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-bold">💬 Chatbot Legale</h2>
          <ChatbotInput onSendQuestion={() => {}} />
          <button onClick={onToggle} className="w-full mt-4 bg-red-500 text-white py-2 rounded">
            Chiudi
          </button>
        </div>
      ) : (
        <button onClick={onToggle} className="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center">
          💬
        </button>
      )}
    </div>
  );
}

function Sidebar({ onSelectPage }) {
  return (
    <aside className="w-64 min-h-screen bg-white p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">📁 Aree Tematiche</h2>
      <nav className="flex flex-col gap-2">
        <button className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded" onClick={() => onSelectPage("dashboard")}>
          <Home size={18} /> Dashboard
        </button>
        <button className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded" onClick={() => onSelectPage("compliance")}> 
          <Folder size={18} /> Compliance GDPR
        </button>
        <button className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded" onClick={() => onSelectPage("diritto_lavoro")}> 
          <Calendar size={18} /> Diritto del Lavoro
        </button>
        <button className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded" onClick={() => onSelectPage("chatbot")}>
          <MessageSquare size={18} /> Chatbot
        </button>
        <button className="flex gap-2 items-center p-2 hover:bg-gray-200 rounded" onClick={() => onSelectPage("settings")}>
          <Settings size={18} /> Impostazioni
        </button>
      </nav>
    </aside>
  );
}

export default function LegalSupportApp() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar onSelectPage={setCurrentPage} />
      <main className="flex-1 p-6">
        {currentPage === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold">📊 Dashboard</h2>
            <div className="mt-4 bg-white p-4 shadow-lg rounded-lg">
              <h3 className="font-semibold">📄 Documento di Consulenza</h3>
              <p>"Policy GDPR - Versione aggiornata 2025"</p>
              <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded flex gap-2 items-center">
                <Download size={16} /> Scarica Documento
              </button>
            </div>
          </div>
        )}
        {currentPage === "chatbot" && <ChatbotWidget isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />}
      </main>
      <ChatbotWidget isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
    </div>
  );
}
