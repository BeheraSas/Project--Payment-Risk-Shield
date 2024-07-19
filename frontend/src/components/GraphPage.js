// src/components/GraphPage.js

import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Image, Button } from 'react-bootstrap';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';

const graphs = [
  { 
    type: 'Age Distribution', 
    src: image1,
    info: 'The Age Distribution graph illustrates the distribution of ages in the dataset. It helps identify the most common age groups and highlights age-related trends and patterns. For instance, if the majority of users fall within a certain age range, targeted marketing strategies can be developed. Additionally, identifying gaps in age distribution can help in understanding potential market opportunities.'
  },
  { 
    type: 'Fraud vs Non-Fraud Cases', 
    src: image2,
    info: 'This graph compares the number of fraud cases to non-fraud cases in the dataset. It provides insights into the prevalence of fraudulent activities. A higher proportion of fraud cases might indicate vulnerabilities in the current system or the need for more robust fraud detection mechanisms. Analyzing this data over time can also reveal trends and help in proactive fraud prevention.'
  },
  { 
    type: 'Credit Card Frauds by Age', 
    src: image3,
    info: 'The Credit Card Frauds by Age graph shows the distribution of credit card fraud incidents across different age groups. It highlights which age groups are most affected by fraud. Younger users might be more prone to phishing attacks due to lack of experience, while older users might be targeted due to higher credit limits. This analysis can inform age-specific educational campaigns and security measures.'
  },
  { 
    type: 'Categorical Features', 
    src: image4,
    info: 'This graph represents various categorical features in the dataset. It provides a visual representation of the distribution of different categories, such as transaction types or user demographics. Understanding these distributions helps in feature selection for machine learning models and can reveal significant patterns and relationships within the data.'
  },
  { 
    type: 'Transactions by Hour', 
    src: image5,
    info: 'The Transactions by Hour graph shows the distribution of transactions over the hours of the day. It helps identify peak transaction times and patterns of transaction activity throughout the day. This information is valuable for optimizing business operations, such as staffing and resource management. Additionally, identifying unusual transaction patterns during off-peak hours can help in detecting fraudulent activities.'
  },
  { 
    type: 'Correlation Matrix', 
    src: image6,
    info: 'The Correlation Matrix visualizes the correlation between different variables in the dataset. It helps identify strong and weak relationships between variables, which is crucial for feature selection, multicollinearity detection, and understanding the structure of the data. High correlation values indicate a strong relationship, which can be useful for predictive modeling, while low values suggest weak or no relationship.'
  },
  { 
    type: 'Distance Distribution', 
    src: image7,
    info: 'The Distance Distribution graph shows the distribution of distances in the dataset. It is useful for understanding spatial relationships and trends, such as the typical distances between transaction points. This information can be valuable for geographic analysis, logistics planning, and detecting anomalies in spatial data. For example, unusually large distances in a short timeframe could indicate fraudulent activity.'
  },
];

const GraphPage = () => {
  const [selectedType, setSelectedType] = useState('Age Distribution');
  const [showInfo, setShowInfo] = useState(false);

  const navbarStyle = {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const navLinkStyle = (isActive) => ({
    color: isActive ? '#007bff' : '#fff',
    marginRight: '1rem',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  });

  const headerStyle = {
    marginTop: '1rem', // Reduced top margin
    marginBottom: '1rem',
    textAlign: 'center',
  };

  const descriptionStyle = {
    marginBottom: '1.5rem', // Adjusted bottom margin
    textAlign: 'center',
    color: '#6c757d',
  };

  const btnPrimaryStyle = {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  };

  const btnPrimaryHoverStyle = {
    backgroundColor: '#0056b3',
    borderColor: '#0056b3',
  };

  const selectedGraph = graphs.find((graph) => graph.type === selectedType);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" style={navbarStyle} className="mb-2"> {/* Reduced bottom margin */}
        <Container>
          <Navbar.Brand href="#">Graph Analysis</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {graphs.map((graph) => (
                <Nav.Link
                  key={graph.type}
                  onClick={() => {
                    setSelectedType(graph.type);
                    setShowInfo(false);
                  }}
                  style={navLinkStyle(graph.type === selectedType)}
                >
                  {graph.type}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <h1 style={headerStyle}>{selectedType}</h1>
            <p style={descriptionStyle}>
              This graph shows the {selectedType.toLowerCase()}. Analyze the trends and patterns to understand the underlying data better.
            </p>
            <Image src={selectedGraph.src} fluid />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Button
                variant="primary"
                style={btnPrimaryStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = btnPrimaryHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = btnPrimaryStyle.backgroundColor)}
                onClick={() => setShowInfo(!showInfo)}
              >
                {showInfo ? 'Hide Info' : 'Learn More'}
              </Button>
            </div>
            {showInfo && (
              <p style={{ marginTop: '1rem', textAlign: 'center', color: '#6c757d' }}>
                {selectedGraph.info}
              </p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GraphPage;
