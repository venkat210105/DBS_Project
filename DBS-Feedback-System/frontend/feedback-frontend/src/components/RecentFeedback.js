import React from 'react';
import './RecentFeedback.css';

export default function RecentFeedback({ recentFeedback }) {
  if (!recentFeedback || !Array.isArray(recentFeedback) || recentFeedback.length === 0) {
    return (
      <div className="recent-feedback-container">
        <div className="recent-feedback-header">
          <h2>Recent Feedback</h2>
          <span className="feedback-count">No feedback available</span>
        </div>
        <div className="no-feedback">
          <div className="no-feedback-icon">💬</div>
          <p>No recent feedback to display</p>
        </div>
      </div>
    );
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      case 'neutral': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      case 'neutral': return '😐';
      default: return '💬';
    }
  };

  return (
    <div className="recent-feedback-container">
      <div className="recent-feedback-header">
        <h2>Recent Feedback</h2>
        <span className="feedback-count">{recentFeedback.length} entries</span>
      </div>

      <div className="feedback-table-container">
        <table className="feedback-table">
          <thead>
            <tr>
              <th className="id-column">ID</th>
              <th className="comment-column">Comment</th>
              <th className="sentiment-column">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {recentFeedback.map((feedback, index) => (
              <tr key={feedback.id || index} className="feedback-row">
                <td className="id-cell">
                  <span className="feedback-id">#{feedback.id}</span>
                </td>
                <td className="comment-cell">
                  <div className="comment-content">
                    <p className="comment-text">{feedback.comment}</p>
                    {feedback.customerName && (
                      <span className="customer-name">— {feedback.customerName}</span>
                    )}
                  </div>
                </td>
                <td className="sentiment-cell">
                  <span 
                    className="sentiment-badge"
                    style={{ backgroundColor: getSentimentColor(feedback.label) }}
                  >
                    <span className="sentiment-icon">{getSentimentIcon(feedback.label)}</span>
                    {feedback.label || 'Unknown'}
                  </span>
                  {feedback.rating && (
                    <div className="rating-display">
                      <span className="rating-stars">
                        {"★".repeat(feedback.rating)}{"☆".repeat(5 - feedback.rating)}
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}