// src/components/PredictionComponent.js
import React from 'react';

const PredictionComponent = ({ result }) => {
  return (
    <div className="result">
      <h2>Fraud Detection Result</h2>
      <p>{result ? "This transaction is fraudulent." : "This transaction is not fraudulent."}</p>
    </div>
  );
};

export default PredictionComponent;
