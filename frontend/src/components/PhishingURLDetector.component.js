import React, { useState } from "react";
import { Input, Typography, Table, Tooltip, Button, Tag, Modal } from "antd";
import axios from 'axios';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../phishing.css';


function PhishingURLDetector() {
  const [urlValue, setUrlValue] = useState("");
  const [features, setFeatures] = useState([]);
  const [isPhishing, setIsPhishing] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [redirectMessage, setRedirectMessage] = useState("");
  const [redirectColor, setRedirectColor] = useState("");

  const navigate = useNavigate(); // Initialize navigate

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

      // Prepare modal data
      const message = data.prediction === 1
        ? "The URL appears to be phishing. Do you still want to proceed?"
        : "The URL is safe. Do you want to proceed?";
      const color = data.prediction === 1 ? "#cd201f" : "#87d068";

      setRedirectUrl(urlValue);
      setRedirectMessage(message);
      setRedirectColor(color);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const handleModalOk = () => {
    window.open(redirectUrl, '_blank'); // Opens the URL in a new tab
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="app-title">Payment Risk Shield</span>
        </div>
        <div className='ml-auto'>
          <Button onClick={() => navigate('/phishing-detection')}>Phishing Detection</Button>
        </div>
      </nav>
      <div className="container w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-slate-50 rounded-xl flex flex-col justify-center items-center p-4" style={{ minWidth: '40em', padding: '4em' }}>
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
        <div className="flex justify-center mt-4">
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        {isPhishing !== null && (
          <>
            <Typography.Title className="mt-4 " level={5}>
              Status 
            </Typography.Title>
            <Tag color={isPhishing ? "#cd201f" : "#87d068"} style={{ marginLeft: '1em' }}>
              {isPhishing ? "Phishing" : "Safe"}
            </Tag>
          </>
        )}
      </div>

      <Modal
        title={isPhishing ? "Warning" : "Info"}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ style: { backgroundColor: redirectColor } }}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk} style={{ backgroundColor: redirectColor }}>
            Yes
          </Button>,
        ]}
      >
        <p>{redirectMessage}</p>
      </Modal>
    </div>
  );
}

export default PhishingURLDetector;
