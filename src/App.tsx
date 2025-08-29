import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Constructor from './pages/Constructor/index';
import Projects from './pages/Projects/index';
import BottomNavigation from './components/BottomNavigation';
import { useTelegramNavigation } from './hooks/useTelegramNavigation';
import './App.css';

function AppContent() {
  useTelegramNavigation();

  return (
    <div className="App min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="pb-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/constructor" element={<Constructor />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
