import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EnhancedFeedbackForm.css";

const EnhancedFeedbackForm = ({ onFeedbackAdded, isDarkMode }) => {
  const [formData, setFormData] = useState({
    // Basic required fields
    customerName: "",
    email: "",
    feedback: "",
    serviceCategory: "",
    serviceChannel: "",
    customerType: "",
    businessUnit: "",
    
    // Optional fields
    rating: 5,
    userEmail: "",
    userName: "",
    productId: "",
    comment: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" || name === "productId" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submitData = {
        // Map enhanced form fields to backend entity fields
        customerName: formData.customerName || "Anonymous",
        email: formData.email || formData.userEmail || "",
        feedback: formData.feedback || formData.comment || "",
        serviceCategory: formData.serviceCategory || "",
        serviceChannel: formData.serviceChannel || "",
        customerType: formData.customerType || "",
        businessUnit: formData.businessUnit || "",
        
        // Legacy fields for compatibility
        userName: formData.userName || formData.customerName || "Anonymous",
        userEmail: formData.userEmail || formData.email || "",
        comment: formData.comment || formData.feedback || "",
        productId: parseInt(formData.productId) || 1,
        rating: parseInt(formData.rating) || 5
      };

      console.log("Submitting data:", submitData);

      await axios.post("http://localhost:8085/feedback/submit", submitData);
      
      // Clear form
      setFormData({
        customerName: "",
        email: "",
        feedback: "",
        serviceCategory: "",
        serviceChannel: "",
        customerType: "",
        businessUnit: "",
        rating: 5,
        userEmail: "",
        userName: "",
        productId: "",
        comment: ""
      });
      
      // Trigger refresh
      if (onFeedbackAdded) {
        onFeedbackAdded();
      }
      
      alert("Thank you! Your feedback has been submitted successfully.");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={`enhanced-feedback-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="enhanced-feedback-card">
        <div className="feedback-header">
          <h2>Customer Feedback Form</h2>
          <p>Your feedback helps us improve our banking services</p>
        </div>

        <form onSubmit={handleSubmit} className="enhanced-feedback-form">
          {/* Customer Information */}
          <div className="form-section">
            <h3>Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Customer Name *</label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="form-section">
            <h3>Service Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="serviceCategory">Service Category *</label>
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Service Category</option>
                  <option value="Banking">Banking</option>
                  <option value="Investment">Investment</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Loans">Loans</option>
                  <option value="Digital Banking">Digital Banking</option>
                  <option value="Customer Service">Customer Service</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="serviceChannel">Service Channel *</label>
                <select
                  id="serviceChannel"
                  name="serviceChannel"
                  value={formData.serviceChannel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Channel</option>
                  <option value="Branch">Branch</option>
                  <option value="Online">Online Banking</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Phone">Phone Banking</option>
                  <option value="ATM">ATM</option>
                  <option value="Chat">Live Chat</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerType">Customer Type *</label>
                <select
                  id="customerType"
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Customer Type</option>
                  <option value="Individual">Individual</option>
                  <option value="Business">Business</option>
                  <option value="Corporate">Corporate</option>
                  <option value="SME">SME</option>
                  <option value="Premium">Premium</option>
                  <option value="Private Banking">Private Banking</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="businessUnit">Business Unit *</label>
                <select
                  id="businessUnit"
                  name="businessUnit"
                  value={formData.businessUnit}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Business Unit</option>
                  <option value="Retail Banking">Retail Banking</option>
                  <option value="Corporate Banking">Corporate Banking</option>
                  <option value="Investment Banking">Investment Banking</option>
                  <option value="Private Banking">Private Banking</option>
                  <option value="Digital Banking">Digital Banking</option>
                  <option value="Treasury">Treasury</option>
                </select>
              </div>
            </div>
          </div>

          {/* Feedback Content */}
          <div className="form-section">
            <h3>Your Feedback</h3>
            <div className="form-group">
              <label htmlFor="feedback">Feedback Details *</label>
              <textarea
                id="feedback"
                name="feedback"
                placeholder="Please share your detailed feedback about our service..."
                value={formData.feedback}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Overall Rating *</label>
              <div className="rating-container">
                <input
                  id="rating"
                  name="rating"
                  type="range"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  className="rating-slider"
                />
                <div className="rating-display">
                  <span className="rating-stars">
                    {"★".repeat(formData.rating)}{"☆".repeat(5 - formData.rating)}
                  </span>
                  <span className="rating-value">({formData.rating}/5)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </button>
            
            <button 
              type="button" 
              onClick={goToDashboard}
              className="dashboard-btn"
            >
              View Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnhancedFeedbackForm;
