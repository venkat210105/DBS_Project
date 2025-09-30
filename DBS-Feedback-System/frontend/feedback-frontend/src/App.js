import React, { useState, useCallback } from "react";
import { Routes, Route } from 'react-router-dom';
import RootFeedbackComponent from "./components/RootFeedbackComponent";
import FeedbackList from "./components/FeedbackList";
import Dashboard from './components/Dashboard';
import FeedbackHistory from './components/FeedbackHistory';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const refreshList = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* Main Feedback Page with Root Component */}
        <Route path="/" element={<RootFeedbackComponent />} />

        {/* Feedback List Page */}
        <Route path="/feedback-list" element={<FeedbackList refreshTrigger={refreshTrigger} />} />

        {/* Dashboard / Analytics Page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Feedback History with filtering */}
        <Route path="/feedback-history" element={<FeedbackHistory />} />
      </Routes>
    </div>
  );
}

export default App;
