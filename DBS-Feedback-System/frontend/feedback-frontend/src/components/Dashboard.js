import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from "../api";
import SentimentChart from "./SentimentChart";
import TrendsChart from "./TrendsChart";
import RecentFeedback from "./RecentFeedback";
import './Dashboard.css';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const navigate = useNavigate();

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSentimentClick = (sentiment) => {
    navigate(`/feedback-history?sentiment=${sentiment.toLowerCase()}`);
  };

  // Apply dark mode to body element for global effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('dark-mode', 'light-mode');
    };
  }, [darkMode]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error loading dashboard: {error}</p>;
  if (!data) return <p>No dashboard data available.</p>;

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="dashboard-header">
        <h2>Dashboard Insights</h2>
        <button 
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          <div className="toggle-container">
            <div className={`toggle-circle ${darkMode ? 'dark' : 'light'}`}></div>
          </div>
        </button>
      </div>

      <div className="cards-container">
        <div 
          className="card clickable-card positive-card" 
          onClick={() => handleSentimentClick('positive')}
          title="Click to view all positive feedback"
        >
          <h3>Positive</h3>
          <p className="card-count">{data.sentimentCounts.POSITIVE || 0}</p>
          <span className="card-subtitle">Click to view details</span>
        </div>
        <div 
          className="card clickable-card neutral-card" 
          onClick={() => handleSentimentClick('neutral')}
          title="Click to view all neutral feedback"
        >
          <h3>Neutral</h3>
          <p className="card-count">{data.sentimentCounts.NEUTRAL || 0}</p>
          <span className="card-subtitle">Click to view details</span>
        </div>
        <div 
          className="card clickable-card negative-card" 
          onClick={() => handleSentimentClick('negative')}
          title="Click to view all negative feedback"
        >
          <h3>Negative</h3>
          <p className="card-count">{data.sentimentCounts.NEGATIVE || 0}</p>
          <span className="card-subtitle">Click to view details</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h3>Trends Over Time</h3>
          <TrendsChart trends={data.trends} />
        </div>
        <div className="chart">
          <h3>Sentiment Distribution</h3>
          <SentimentChart sentimentCounts={data.sentimentCounts} />
        </div>
      </div>

      <div className="recent-feedback">
        <h3>Recent Feedback</h3>
        <RecentFeedback recentFeedback={data.recentFeedback} darkMode={darkMode} />
      </div>
    </div>
  );
}
