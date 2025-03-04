import React, { useState } from 'react';
import { FaShieldAlt, FaBalanceScale, FaBuilding, FaChartLine, FaCog, FaPaperPlane, FaCommentDots } from 'react-icons/fa';
import './App.css';

function App() {
  const sections = [
    { name: 'Compliance GDPR', icon: <FaShieldAlt className="icon" /> },
    { name: 'Diritto del Lavoro', icon: <FaBalanceScale className="icon" /> },
    { name: 'Diritto Societario', icon: <FaBuilding className="icon" /> },
    { name: 'Pianificazione Strategica', icon: <FaChartLine className="icon" /> },
    { name: 'Impostazioni', icon: <FaCog className="icon" /> }
  ];

  const [activeSection, setActiveSection] = useState(sections[0].name);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Legal App</h2>
        <ul>
          {sections.map((section) => (
            <li 
              key={section.name}
              className={activeSection === section.name ? 'active' : ''}
              onClick={() => setActiveSection(section.name)}
            >
              {section.icon}
              <span>{section.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content area */}
      <main className="content-area">
        <h1>{activeSection}</h1>
        <div className="section-content">
          {/* Contenuto variabile in base alla sezione selezionata */}
          {activeSection === 'Compliance GDPR' && (
            <p>Qui verranno visualizzati i documenti e le attività relative alla Compliance GDPR.</p>
          )}
          {activeSection === 'Diritto del Lavoro' && (
            <p>Qui verranno visualizzati i documenti e le attività relative al Diritto del Lavoro.</p>
          )}
          {activeSection === 'Diritto Societario' && (
            <p>Qui verranno visualizzati i documenti e le attività relative al Diritto Societario.</p>
          )}
          {activeSection === 'Pianificazione Strategica' && (
            <p>Qui verranno visualizzati i documenti e le attività relative alla Pianificazione Strategica.</p>
          )}
          {activeSection === 'Impostazioni' && (
            <p>Qui potrai modificare le impostazioni dell'applicazione.</p>
          )}
        </div>
      </main>

      {/* Chatbot widget */}
      <div className="chatbot-container">
        {!chatOpen && (
          <button className="chatbot-button" onClick={() => setChatOpen(true)}>
            <FaCommentDots />
          </button>
        )}
        {chatOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <span>ChatBot</span>
              <button className="close-button" onClick={() => setChatOpen(false)}>✖</button>
            </div>
            <div className="chatbot-content">
              <p>Ciao! Come posso aiutarti?</p>
            </div>
            <div className="chatbot-input-area">
              <input type="text" placeholder="Scrivi un messaggio..." />
              <button className="send-button"><FaPaperPlane /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
