import React, { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  const [updateFlag, setUpdateFlag] = useState(false);

  const refreshList = () => setUpdateFlag(!updateFlag);

  return (
    <div>
      <h1>Feedback System</h1>
      <FeedbackForm onFeedbackAdded={refreshList} />
      <FeedbackList key={updateFlag} />
    </div>
  );
}

export default App;
