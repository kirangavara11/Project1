import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import './MainPage.css';

function HomePage() {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [queryType, setQueryType] = useState('');
  const [selectedState, setSelectedState] = useState<"Delaware" | "Florida" | "">("");
  const [selectedFeature, setSelectedFeature] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  


  const navigate = useNavigate();
  const location = useLocation();

  // Dropdown data
  const queryTypes = [
    "Compare all User Stories between Delaware and Florida",
    "Fetch User Stories from a specific Feature",
    "Reverse Lookup from User Story to Epic"
  ];
  const states = ["Delaware", "Florida"];

  const categories: Record<"Delaware" | "Florida", string> = {
  Delaware: "DFS-DE",
  Florida: "DFS-FL"
};

  const features = {
    Delaware: [
      "Standard Complaint Report",
      "Institutional Abuse Reports",
      "Family Report"
    ],
    Florida: [
      "Service Referral Intake",
      "Mandated reporter portal",
      "Child_Adult_Special Condition Intake"
    ]
  };

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
            className={location.pathname === '/' ? 'nav-btn active-nav-btn' : 'nav-btn'}
          >
            <span className="app-name1">Home</span>
          </Button>
          <Button
            color="primary"
            startIcon={<InfoIcon />}
            onClick={() => navigate('/about')}
            className={location.pathname === '/about' ? 'nav-btn active-nav-btn' : 'nav-btn'}
          >
            <span className="app-name1">About Us</span>
          </Button>
        </div>
      </header>

      <div className="content-layout">
        {/* Sidebar */}
        <div className="history-sidebar">
          <div className="sidebar-header">
            <h3>Chat History</h3>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className="new-chat-btn"
              onClick={() => setHistory([])}
              style={{ marginLeft: 0 }}
            >
              New Chat
            </Button>
          </div>
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
          {/* Dropdowns */}
          <div className="dropdown-row">
          <FormControl variant="outlined" sx={{ minWidth: 240 }}>
            <InputLabel>Query Type</InputLabel>
            <Select
              value={queryType}
              onChange={e => setQueryType(e.target.value)}
              label="Query Type"
            >
              {queryTypes.map((qt) => (
                <MenuItem key={qt} value={qt}>{qt}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* State Dropdown */}
          <FormControl variant="outlined" sx={{ minWidth: 140 }}>
            <InputLabel>State</InputLabel>
            <Select
              value={selectedState}
              onChange={e => {
                setSelectedState(e.target.value as "Delaware" | "Florida" | "");
                setSelectedFeature(''); // Reset feature when state changes
                setSelectedCategory(''); // Reset category when state changes
              }}
              label="State"
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>{state}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Dropdown */}
          <FormControl variant="outlined" sx={{ minWidth: 140 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              label="Category"
              disabled={!selectedState}
            >
              {selectedState && (
                <MenuItem value={categories[selectedState]}>{categories[selectedState]}</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Feature Dropdown */}
          <FormControl variant="outlined" sx={{ minWidth: 240 }}>
            <InputLabel>Feature</InputLabel>
            <Select
              value={selectedFeature}
              onChange={e => setSelectedFeature(e.target.value)}
              label="Feature"
              disabled={!selectedState}
            >
              {(selectedState && features[selectedState] || []).map(feature => (
                <MenuItem key={feature} value={feature}>{feature}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>



          <h1>Converse with your documents</h1>
          <p>
            Leverage AI-powered chat to summarize lengthy documents and simplify intricate PDFs.
          </p>
          {/* Q&A scrollable area */}
          <div className="qa-area">
            {history.length === 0 ? (
              <p className="history-empty">No questions asked yet.</p>
            ) : (
              history.map((q, idx) => (
                <div key={idx} style={{
                  marginBottom: '16px',
                  padding: '12px',
                  background: '#f5f7fa',
                  borderRadius: '8px',
                  textAlign: 'left'
                }}>
                  <strong>Q:</strong> {q}
                  <br />
                  <strong>A:</strong> <span style={{ color: '#1976d2' }}>This is a sample answer for: "{q}"</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Search Bar (fixed at bottom of viewport) */}
      <div className="search-bar-container">
        <div className="search-bar">
          <TextField
            label="Ask a question"
            variant="outlined"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className="search-input"
            onKeyDown={e => { if (e.key === 'Enter') handleAsk(); }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAsk}
            disabled={!question.trim()}
          >
            Ask
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
