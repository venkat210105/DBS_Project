import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ onFeedbackAdded }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8085/feedback/submit", {
        userName,
        userEmail,
        productId: parseInt(productId),
        customerName,
        comment,
        rating: parseInt(rating),
      });
      onFeedbackAdded(res.data);

      // Clear form
      setUserName("");
      setUserEmail("");
      setProductId("");
      setCustomerName("");
      setComment("");
      setRating(1);
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="User Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        min={1}
        max={5}
        onChange={(e) => setRating(parseInt(e.target.value))}
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
