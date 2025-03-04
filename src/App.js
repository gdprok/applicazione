import { useState } from "react";
import { MessageSquare, FileText, Briefcase, Shield, Users, Settings, Plus, CheckCircle, Calendar } from "lucide-react";

function Sidebar({ onSelectPage }) {
  return (
    <div className="w-1/5 min-h-screen bg-blue-200 p-4 flex flex-col gap-4 shadow-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">📌 Aree Tematiche</h2>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("gdpr")}>
        <Shield size={16} /> Compliance GDPR
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("lavoro")}>
        <Briefcase size={16} /> Diritto del Lavoro
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("societario")}>
        <Users size={16} /> Diritto Societario
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("strategia")}>
        <FileText size={16} /> Pianificazione Strategica
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300 mt-auto" onClick={() => onSelectPage("settings")}>
        <Settings size={16} /> Impostazioni
      </button>
    </div>
  );
}

function TaskBoard() {
  return (
    <div className="flex gap-4 w-full">
      {/* Lista 1: Da fare */}
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-gray-700 mb-2">📌 Da fare</h3>
        <div className="bg-gray-100 p-2 rounded-lg mb-2">📝 Firmare nomine DPO</div>
        <div className="bg-gray-100 p-2 rounded-lg mb-2">📞 Chiamare studio legale</div>
        <div className="bg-gray-100 p-2 rounded-lg mb-2">📄 Rivedere policy GDPR</div>
        <button className="flex gap-2 items-center text-blue-500">
          <Plus size={16} /> Aggiungi una scheda
        </button>
      </div>

      {/* Lista 2: In esecuzione */}
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-gray-700 mb-2">⏳ In esecuzione</h3>
        <div className="bg-yellow-100 p-2 rounded-lg mb-2">📑 Revisione contratti in corso</div>
        <button className="flex gap-2 items-center text-blue-500">
          <Plus size={16} /> Aggiungi una scheda
        </button>
      </div>

      {/* Lista 3: Completato */}
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-gray-700 mb-2">✅ Completato</h3>
        <div className="bg-green-100 p-2 rounded-lg mb-2 flex gap-2 items-center">
          <CheckCircle size={16} className="text-green-600" /> 🔍 Adeguamento privacy completato
        </div>
        <button className="flex gap-2 items-center text-blue-500">
          <Plus size={16} /> Aggiungi una scheda
        </button>
      </div>
    </div>
  );
}

function Chatbot() {
  const [conversation, setConversation] = useState([
    { sender: "bot", text: "Benvenuto! Come posso aiutarti?" },
    { sender: "user", text: "Ho bisogno di aiuto con la compliance GDPR." },
    { sender: "bot", text: "Capito! Ti consiglio di fissare una consulenza con un esperto. Vuoi procedere?" },
  ]);
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    setConversation([...conversation, { sender: "user", text: question }]);
    setQuestion("");
    setTimeout(() => {
      setConversation([...conversation, { sender: "user", text: question }, { sender: "bot", text: "Grazie! Un esperto ti contatterà presto." }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white border p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2">💬 Chatbot Legale</h3>
      <div className="h-40 overflow-y-auto bg-gray-100 p-2 rounded mb-2">
        {conversation.map((msg, index) => (
          <div key={index} className={`p-2 rounded mb-1 ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Scrivi il tuo quesito..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="w-full bg-blue-500 text-white py-2 mt-2 rounded" onClick={handleSend}>
        Invia Domanda
      </button>
    </div>
  );
}

export default function LegalSupportApp() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar onSelectPage={setCurrentPage} />
      <div className="w-4/5 p-6">
        {currentPage === "dashboard" && (
          <>
            <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
            <TaskBoard />
          </>
        )}
        {currentPage !== "dashboard" && (
          <>
            <h2 className="text-2xl font-bold">
              {currentPage === "gdpr" && "📜 Compliance GDPR"}
              {currentPage === "lavoro" && "⚖️ Diritto del Lavoro"}
              {currentPage === "societario" && "🏢 Diritto Societario"}
              {currentPage === "strategia" && "📈 Pianificazione Strategica"}
              {currentPage === "settings" && "⚙️ Impostazioni"}
            </h2>
            <p className="mt-4 text-gray-700">Qui puoi consultare informazioni e accedere ai servizi dedicati.</p>
          </>
        )}
      </div>
      <Chatbot />
    </div>
  );
}
