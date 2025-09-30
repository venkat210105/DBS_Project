import React, { useState, useEffect } from 'react';
import EnhancedFeedbackForm from './EnhancedFeedbackForm';
import './RootFeedbackComponent.css';

const RootFeedbackComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`root-feedback-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Professional Navigation Header */}
      <div className="professional-navbar">
        <div className="dbs-brand">
          <div className="dbs-logo-container">
            {/* DBS Logo */}
            <div className="dbs-logo-container-img">
              <img 
                src={require('./image.png')} 
                alt="DBS Bank Logo" 
                className="dbs-logo-image" 
              />
            </div>
            <div className="brand-text">
              <span className="brand-name">DBS Bank</span>
              <span className="brand-tagline">Live more, Bank less</span>
            </div>
          </div>
          <div className="system-title">
            <span className="title-main">Customer Experience</span>
            <span className="title-sub">Feedback Portal</span>
          </div>
        </div>
        
        <div className="navbar-controls">
          <nav className="main-navigation">
            <a href="/dashboard" className="nav-item">
              <span className="nav-icon">📊</span>
              <span className="nav-label">Analytics</span>
            </a>
            <a href="/feedback-list" className="nav-item">
              <span className="nav-icon">📝</span>
              <span className="nav-label">Feedback</span>
            </a>
          </nav>
          
          {/* Professional Theme Toggle */}
          <div className="theme-controls">
            <span className="theme-label">Theme</span>
            <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle theme">
              <div className="toggle-track">
                <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
                  <span className="toggle-icon">{isDarkMode ? '🌙' : '☀️'}</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Form Display Area */}
      <div className="form-display-area">
        <EnhancedFeedbackForm isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default RootFeedbackComponent;