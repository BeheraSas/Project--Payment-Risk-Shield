import React, { useState } from "react";
import { Input, Typography, Table, Tooltip, Button, Tag } from "antd";
import axios from 'axios';

function PhishingURLDetector() {
  const [urlValue, setUrlValue] = useState("");
  const [features, setFeatures] = useState([]);
  const [isPhishing, setIsPhishing] = useState(null);

  const featureToDescriptionMapping = {
    Have_IP: "Is IP address present in the URL",
    Have_At: "Presence of @ symbol",
    URL_Length: "Length of the URL",
    URL_Depth: "Depth of the URL",
    Redirection: "Presence of redirection '//'",
    https_Domain: "Uses HTTPS protocol",
    TinyURL: "Uses a tiny URL",
    "Prefix/Suffix": "Presence of '-' in domain",
    DNS_Record: "DNS record availability",
    Domain_Age: "Age of the domain",
    Domain_End: "End period of the domain",
    iFrame: "Presence of iFrame",
    Mouse_Over: "Changes in the status bar on mouse over",
    Right_Click: "Disables right click",
    Web_Forwards: "Number of forwards",
  };

  const columns = [
    {
      title: "Feature Name",
      dataIndex: "featureName",
      key: "featureName",
      render: (_, { featureName }) => (
        <Tooltip title={featureToDescriptionMapping[featureName]}>
          <span>{featureName}</span>
        </Tooltip>
      ),
    },
    {
      title: "Extracted Value",
      dataIndex: "extractedValue",
      key: "extractedValue",
    },
  ];

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/extract?url=${urlValue}`);
      const data = response.data;
      
      const formattedFeatures = Object.keys(data).filter(key => key !== "prediction" && key !== "url").map((key, index) => ({
        key: index + 1,
        featureName: key,
        extractedValue: data[key],
      }));

      setFeatures(formattedFeatures);
      setIsPhishing(data.prediction === 1);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  return (
    <div className="container lg:w-1/2 bg-slate-50 rounded-xl flex flex-col justify-center items-center p-4">
      <Typography.Title level={3}>Phishing URL Detector</Typography.Title>
      <Typography.Title level={5}>Enter suspicious URL</Typography.Title>
      <Input
        className="w-72"
        type="text"
        name="phishingURL"
        value={urlValue}
        onChange={(e) => setUrlValue(e.target.value)}
        required
      />
      <Button className="mt-4" type="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {isPhishing !== null && (
        <>
          <Typography.Title className="mt-4" level={5}>
            Status 
          </Typography.Title>
          <Tag color={isPhishing ? "#87d068" : "#cd201f"}>{isPhishing ? "FALSE" : "TRUE"}</Tag>
        </>
      )}
      <Typography.Title className="mt-5" level={3}>
        Features
      </Typography.Title>
      <Table
        className="border-x-4 border-y-4 rounded-md w-1/2"
        dataSource={features}
        columns={columns}
      />
    </div>
  );
}

export default PhishingURLDetector;
