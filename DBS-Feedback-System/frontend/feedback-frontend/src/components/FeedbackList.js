import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:8085/feedback/all");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div>
      <h2>All Feedback</h2>
      {feedbacks.map((f) => (
        <div key={f.id}>
          <h4>{f.customerName} ({f.rating}/5)</h4>
          <p>{f.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
