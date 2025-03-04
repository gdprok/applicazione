import { useState } from "react";
import { FaUser, FaCog, FaFileAlt, FaComments } from "react-icons/fa";

function Sidebar({ onSelectPage }) {
  return (
    <div className="w-1/5 min-h-screen bg-blue-200 p-4 flex flex-col gap-4 shadow-lg">
      <h2 className="text-xl font-bold text-gray-700">📂 Aree Tematiche</h2>
      <button className="flex gap-2 items-center p-2 bg-white rounded shadow" onClick={() => onSelectPage("dashboard")}>
        <FaFileAlt /> Compliance GDPR
      </button>
      <button className="flex gap-2 items-center p-2 bg-white rounded shadow" onClick={() => onSelectPage("chatbot")}>
        <FaComments /> Chatbot AI
      </button>
      <button className="flex gap-2 items-center p-2 bg-white rounded shadow" onClick={() => onSelectPage("settings")}>
        <FaCog /> Impostazioni
      </button>
    </div>
  );
}

function Chatbot({ onClose }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);

  const handleSendQuestion = () => {
    setResponse(
      `L'AI ha analizzato la tua domanda: "${question}". Ti consigliamo di approfondire con un esperto.`
    );
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-300">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">💬 Chatbot AI</h3>
        <button onClick={onClose} className="text-red-500 font-bold">X</button>
      </div>
      <textarea
        placeholder="Scrivi il tuo quesito legale..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded my-2"
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded"
        onClick={handleSendQuestion}
        disabled={!question.trim()}
      >
        Invia Domanda
      </button>
      {response && (
        <div className="mt-2 p-2 bg-gray-100 border rounded">{response}</div>
      )}
    </div>
  );
}

export default function LegalSupportApp() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showChat, setShowChat] = useState(true);

  return (
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar onSelectPage={setCurrentPage} />
      <div className="w-4/5 p-6">
        {currentPage === "dashboard" && (
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold">📊 Dashboard</h2>
            <p className="text-gray-600">Benvenuto nella tua area di lavoro.</p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold">📄 Documento Aziendale</h3>
              <p className="text-gray-700">File in revisione: Contratto GDPR.pdf</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Scarica Documento
              </button>
            </div>
          </div>
        )}
        {currentPage === "settings" && (
          <h2 className="text-2xl font-bold">⚙️ Impostazioni</h2>
        )}
      </div>
      {showChat && <Chatbot onClose={() => setShowChat(false)} />}
    </div>
  );
}
