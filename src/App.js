import { useState } from "react";
import { MessageSquare, FileText, Briefcase, Shield, Users, Settings } from "lucide-react";

function Sidebar({ onSelectPage }) {
  return (
    <div className="w-1/5 min-h-screen bg-gray-200 p-4 flex flex-col gap-4 shadow-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">📌 Aree Tematiche</h2>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-gray-300" onClick={() => onSelectPage("gdpr")}>
        <Shield size={16} /> Compliance GDPR
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-gray-300" onClick={() => onSelectPage("lavoro")}>
        <Briefcase size={16} /> Diritto del Lavoro
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-gray-300" onClick={() => onSelectPage("societario")}>
        <Users size={16} /> Diritto Societario
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-gray-300" onClick={() => onSelectPage("strategia")}>
        <FileText size={16} /> Pianificazione Strategica
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-gray-300 mt-auto" onClick={() => onSelectPage("settings")}>
        <Settings size={16} /> Impostazioni
      </button>
    </div>
  );
}

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = () => {
    setResponse(`L'AI ha analizzato la tua domanda: "${question}". Ti consigliamo di approfondire con un esperto.`);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2">💬 Chatbot Legale</h3>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Scrivi il tuo quesito..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="w-full bg-blue-500 text-white py-2 mt-2 rounded" onClick={handleSend}>
        Invia Domanda
      </button>
      {response && <p className="mt-2 p-2 bg-gray-100 rounded">{response}</p>}
    </div>
  );
}

export default function LegalSupportApp() {
  const [currentPage, setCurrentPage] = useState("gdpr");

  return (
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar onSelectPage={setCurrentPage} />
      <div className="w-4/5 p-6">
        <h2 className="text-2xl font-bold">
          {currentPage === "gdpr" && "📜 Compliance GDPR"}
          {currentPage === "lavoro" && "⚖️ Diritto del Lavoro"}
          {currentPage === "societario" && "🏢 Diritto Societario"}
          {currentPage === "strategia" && "📈 Pianificazione Strategica"}
          {currentPage === "settings" && "⚙️ Impostazioni"}
        </h2>
        <p className="mt-4 text-gray-700">
          Qui puoi consultare informazioni e accedere ai servizi dedicati alla sezione scelta.
        </p>
      </div>
      <Chatbot />
    </div>
  );
}
