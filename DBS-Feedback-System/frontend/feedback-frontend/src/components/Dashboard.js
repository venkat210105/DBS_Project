import React, { useEffect, useState, useCallback } from "react";
import { fetchDashboardData } from "../api";
import SentimentChart from "./SentimentChart";
import TrendsChart from "./TrendsChart";
import RecentFeedback from "./RecentFeedback";
import './Dashboard.css';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error loading dashboard: {error}</p>;
  if (!data) return <p>No dashboard data available.</p>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard Insights</h2>

      <div className="cards-container">
        <div className="card">
          <h3>Positive</h3>
          <p>{data.sentimentCounts.POSITIVE || 0}</p>
        </div>
        <div className="card">
          <h3>Neutral</h3>
          <p>{data.sentimentCounts.NEUTRAL || 0}</p>
        </div>
        <div className="card">
          <h3>Negative</h3>
          <p>{data.sentimentCounts.NEGATIVE || 0}</p>
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
        <RecentFeedback recentFeedback={data.recentFeedback} />
      </div>
    </div>
  );
}
