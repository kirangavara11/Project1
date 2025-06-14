import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stack,
  Typography,
  Divider,
  useMediaQuery
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AboutUs from './AboutUs';
import InputFileUpload from './InputFileUpload';

function HomePage() {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState('');
  const [selectedEpic, setSelectedEpic] = useState('');
  const [selectedState, setSelectedState] = useState<"Delaware" | "Florida" | "">("");
  const [selectedFeature, setSelectedFeature] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  // Responsive breakpoints
  const isSm = useMediaQuery('(max-width:900px)');
  const isXs = useMediaQuery('(max-width:700px)');

  // Heights
  const NAVBAR_HEIGHT = 64;
  const SEARCHBAR_HEIGHT = isSm ? 64 : 80;
  const SIDEBAR_WIDTH = isXs ? 0 : isSm ? 180 : 320;

  // Dropdown data
  const Data = [
    "GovConnect"
  ];
  const Epic = [
    "Intake"
  ];

  const states = ["Delaware", "Florida"];
  const categories = {
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
    if (question.trim() === '') return;
    setHistory(prev => [question, ...prev]);
    setQuestion('');
    // Scroll main content to top when a new question is asked
    setTimeout(() => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
      }
    }, 100);
  };

  // Ref for main content for scrolling
  const mainContentRef = useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(to right, #e0eafc, #cfdef3)' }}>
      {/* Navbar */}
      <Paper
        elevation={2}
        square
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: `${NAVBAR_HEIGHT}px`,
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <DocumentScannerIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={600} color="primary.main">
            DocuChat AI
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} pr={3}>
          <Button
            variant="contained"
            color={!showAbout ? "primary" : "inherit"}
            startIcon={<HomeIcon />}
            onClick={() => setShowAbout(false)}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color={showAbout ? "primary" : "inherit"}
            startIcon={<InfoIcon />}
            onClick={() => setShowAbout(true)}
          >
            About Us
          </Button>
        </Stack>
      </Paper>

      {/* Layout: Sidebar + Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100vh',
        }}
      >
        {/* Sidebar */}
        {!isXs && (
          <Paper
            elevation={1}
            sx={{
              width: SIDEBAR_WIDTH,
              minWidth: isSm ? 120 : 220,
              height: '100vh',
              borderRadius: 0,
              p: isSm ? 1 : 3,
              boxSizing: 'border-box',
              borderRight: 1,
              borderColor: 'grey.200',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1100,
              position: 'fixed',
              top: 0,
              left: 0,
              bgcolor: '#fff',
            }}
          >
            <Box sx={{ mt: `${NAVBAR_HEIGHT}px` }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle1" color="primary" fontWeight={600}>
                  Chat History
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => setHistory([])}
                >
                  New Chat
                </Button>
              </Stack>
              <Divider />
              <Box sx={{ mt: 2, flex: 1, overflowY: 'auto', maxHeight: `calc(100vh - ${NAVBAR_HEIGHT + 90}px)` }}>
                {history.length === 0 ? (
                  <Typography color="text.secondary" fontSize="0.96rem">
                    No questions asked yet.
                  </Typography>
                ) : (
                  <Stack spacing={1}>
                    {history.map((q, idx) => (
                      <Paper key={idx} variant="outlined" sx={{ p: 1, fontSize: '0.98rem' }}>
                        {q}
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Box>
            </Box>
          </Paper>
        )}

        {/* Main Content */}
        <Box
          ref={mainContentRef}
          sx={{
            flex: 1,
            ml: !isXs ? `${SIDEBAR_WIDTH}px` : 0,
            mt: `${NAVBAR_HEIGHT}px`,
            mb: `${SEARCHBAR_HEIGHT}px`,
            height: `calc(100vh - ${NAVBAR_HEIGHT + SEARCHBAR_HEIGHT}px)`,
            overflowY: 'auto',
            bgcolor: '#fff',
            borderRadius: 0,
            boxShadow: 2,
            px: isSm ? 2 : 4,
            py: isSm ? 2 : 4,
            transition: 'padding 0.3s',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {showAbout ? (
            <AboutUs />
          ) : (
            <>
              {/* Dropdowns */}
              <Stack
                direction="row"
                spacing={1.5}
                mb={3}
                flexWrap="wrap"
                alignItems="center"
              >
                <FormControl size="small" sx={{ minWidth: 140, maxWidth: 180 }}>
                  <InputLabel>Data</InputLabel>
                  <Select
                    value={selectedData}
                    onChange={e => setSelectedData(e.target.value)}
                    label="Data"
                  >
                    <MenuItem value="GovConnect">GovConnect</MenuItem>
                  </Select>
                </FormControl>

                {/* Epic Dropdown */}
                <FormControl size="small" sx={{ minWidth: 140, maxWidth: 180 }}>
                  <InputLabel>Epic</InputLabel>
                  <Select
                    value={selectedEpic}
                    onChange={e => setSelectedEpic(e.target.value)}
                    label="Epic"
                  >
                    <MenuItem value="Intake">Intake</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 110, maxWidth: 140 }}>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={selectedState}
                    onChange={e => {
                      setSelectedState(e.target.value as "Delaware" | "Florida" | "");
                      setSelectedFeature('');
                      setSelectedCategory('');
                    }}
                    label="State"
                  >
                    {states.map((state) => (
                      <MenuItem key={state} value={state}>{state}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 110, maxWidth: 140 }}>
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

                <FormControl size="small" sx={{ minWidth: 140, maxWidth: 180 }}>
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
              </Stack>

              <Typography variant="h5" mb={1}>
                Converse with your documents
              </Typography>
              <Typography variant="body1" mb={2}>
                Leverage AI-powered chat to summarize lengthy documents and simplify intricate PDFs.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <InputFileUpload />
              <Button
                variant="outlined"
                onClick={() => {
                  // Add your logic for showing RFP templates here
                  alert('Show RFP Templates clicked!');
                }}
              >
                Show RFP Templates
              </Button>
            </Stack>

              {/* Q&A scrollable area */}
              <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
                {history.length === 0 ? (
                  <Typography color="text.secondary" fontSize="0.96rem">
                    No questions asked yet.
                  </Typography>
                ) : (
                  history.map((q, idx) => (
                    <Paper
                      key={idx}
                      sx={{
                        mb: 1,
                        p: 2,
                        bgcolor: '#f5f7fa',
                        borderRadius: 2,
                        textAlign: 'left'
                      }}
                    >
                      <Typography variant="subtitle2"><strong>Q:</strong> {q}</Typography>
                      <Typography variant="body2" color="primary">
                        <strong>A:</strong> This is a sample answer for: "{q}"
                      </Typography>
                    </Paper>
                  ))
                )}
              </Stack>
            </>
          )}
        </Box>
      </Box>

      {/* Search Bar (fixed at bottom of viewport) */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          left: !isXs ? `${SIDEBAR_WIDTH}px` : 0,
          bottom: 0,
          width: !isXs ? `calc(100vw - ${SIDEBAR_WIDTH}px - 50px)` : '100vw',
          borderRadius: !isXs ? '0 0 0 0' : '0 0 12px 12px',
          px: isSm ? 1 : 3,
          py: isSm ? 1 : 2,
          zIndex: 1300,
          boxShadow: 3,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" width="100%">
          <TextField
            label="Ask a question"
            variant="outlined"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            fullWidth
            size="small"
            onKeyDown={e => { if (e.key === 'Enter') handleAsk(); }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAsk}
            disabled={!question.trim()}
            size="medium"
          >
            Ask
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default HomePage;
