import { useState } from "react";
import { MessageSquare, FileText, Briefcase, Shield, Users, Settings, Download, FolderOpen } from "lucide-react";

function Sidebar({ onSelectPage }) {
  return (
    <div className="w-1/5 min-h-screen bg-blue-200 p-4 flex flex-col gap-4 shadow-lg">
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("dashboard")}>
        📊 Dashboard
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("gdpr")}>
        🛡️ Compliance GDPR
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("lavoro")}>
        ⚖️ Diritto del Lavoro
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("societario")}>
        🏢 Diritto Societario
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300" onClick={() => onSelectPage("strategia")}>
        📈 Pianificazione Strategica
      </button>
      <button className="flex gap-2 items-center p-2 rounded hover:bg-blue-300 mt-auto" onClick={() => onSelectPage("settings")}>
        ⚙️ Impostazioni
      </button>
    </div>
  );
}

function Workspace() {
  return (
    <div className="w-3/5 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h3 className="text-lg font-bold text-gray-700 mb-4">📄 Documento di Consulenza</h3>
      <div className="w-full bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-gray-700">"Policy GDPR - Versione aggiornata 2025".</p>
      </div>
      <button className="flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded">
        <Download size={16} /> Scarica Documento
      </button>
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
    <div className="fixed bottom-4 right-4 w-80 bg-white border p-4 rounded-lg shadow-lg">
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
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">📌 Aree Tematiche</h2>
          <div className="flex gap-4 mt-4">
            <button className="flex gap-2 items-center p-2 bg-white rounded shadow-md">
              🛡️ Compliance GDPR
            </button>
            <button className="flex gap-2 items-center p-2 bg-white rounded shadow-md">
              ⚖️ Diritto del Lavoro
            </button>
            <button className="flex gap-2 items-center p-2 bg-white rounded shadow-md">
              🏢 Diritto Societario
            </button>
            <button className="flex gap-2 items-center p-2 bg-white rounded shadow-md">
              📈 Pianificazione Strategica
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Workspace />
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
