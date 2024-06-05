import React, { useState } from "react";

function PhishingURLDetectorComponent() {
  const [urlValue, setUrlValue] = useState("");
  return (
    <div className="phishing__component">
      <h2 className="phishing__title">Phisihing URL Detector</h2>
      <input type="text" onChange={(e) => setUrlValue(e.target.value)}  value={urlValue}/>
    </div>
  );
}

export default PhishingURLDetectorComponent;
