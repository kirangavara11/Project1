import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import './MainPage.css';

function HomePage() {
  const [question, setQuestion] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [history, setHistory] = useState<string[]>([]);
  const navigate = useNavigate();

  // Handler for the Ask button
  const handleAsk = () => {
    if (question.trim() === '') return; // Ignore empty questions
    setHistory(prev => [question, ...prev]);
    setQuestion('');
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <DocumentScannerIcon style={{ marginRight: 8, fontSize: 32 }} />
          <span className="app-name">DocuChat AI</span>
        </div>
        <div className="nav-buttons">
          <Button
            color="primary"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
           <span className="app-name1">Home</span>
          </Button>
          <Button
            color="primary"
            startIcon={<InfoIcon />}
            onClick={() => navigate('/about')}
          >
            <span className="app-name1">About Us</span>
          </Button>
        </div>
      </header>

      {/* Layout with sidebar and main content */}
      <div className="content-layout">
        {/* History Sidebar */}
        <div className="history-sidebar">
          <h3>Chat History</h3>
          {history.length === 0 ? (
            <p className="history-empty">No questions asked yet.</p>
          ) : (
            <ul className="history-list">
              {history.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h1>Converse with your documents</h1>
          <p>
            Leverage AI-powered chat to summarize lengthy documents and simplify intricate PDFs.
          </p>

          {/* Search Bar */}
          <div className="search-bar">
            <TextField
              label="Ask a question"
              variant="outlined"
              fullWidth
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
              onClick={handleAsk}
              disabled={!question.trim()}
            >
              Ask
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
