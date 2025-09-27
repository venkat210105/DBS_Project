import React, { useState, useCallback } from "react";
import { Routes, Route } from 'react-router-dom';
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const refreshList = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="App">
      <h1>Feedback System</h1>
      <Routes>
        {/* Main Feedback Page */}
        <Route path="/" element={
          <>
            <FeedbackForm onFeedbackAdded={refreshList} />
            <FeedbackList refreshTrigger={refreshTrigger} />
          </>
        } />

        {/* Dashboard / Analytics Page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
