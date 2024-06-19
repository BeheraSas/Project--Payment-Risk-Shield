import { Button, Flex } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container p-5">
      <Flex gap={10} justify="center">
        <Button
          onClick={() => navigate("/fraudDetector")}
          type="primary"
          className="text-2xl py-6"
        >
          Fraud Detector
        </Button>
        <Button
          onClick={() => navigate("/phisingUrlDetector")}
          type="primary"
          className="text-2xl py-6"
        >
          Phising URL Detector
        </Button>
      </Flex>
    </div>
  );
}

export default Home;
