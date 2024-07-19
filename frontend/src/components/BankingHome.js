// src/components/BankingHome.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png';

const BankingHome = () => {
  const navigate = useNavigate();

  const handleRedirectToPhishing = () => {
    navigate('/phishing-detection-bank');
  };

  const handleRedirectToGraph = () => {
    navigate('/graph-analysis');
  };

  const [isWide, setIsWide] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardStyle = {
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const rightCardStyle = isWide
    ? {
        ...cardStyle,
        flex: '0 0 auto',
        width: '45%',
      }
    : cardStyle;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" className="logo" style={{ height: '40px', marginRight: '10px' }} />
            Payment Risk Shield
          </a>
        </div>
      </nav>
      <Container style={{ marginTop: '2rem' }}>
        <h2 className="text-center mb-4">Welcome, Customer!</h2>
        <Row>
          <Col md={6}>
            <Card style={cardStyle}>
              <Card.Body className="d-flex flex-column">
                <div>
                  <Card.Title>Phishing Detection</Card.Title>
                  <Card.Text>
                    Protect yourself from phishing attacks by using our Phishing Detection tool.
                  </Card.Text>
                </div>
                <Button variant="primary" onClick={handleRedirectToPhishing}>Go to Phishing Detection</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} style={rightCardStyle}>
            <Card>
              <Card.Body className="d-flex flex-column">
                <div>
                  <Card.Title>Graph Analysis</Card.Title>
                  <Card.Text>
                    Explore various data insights through our Graph Analysis tool.
                  </Card.Text>
                </div>
                <Button variant="primary" onClick={handleRedirectToGraph}>Go to Graph Analysis</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BankingHome;
