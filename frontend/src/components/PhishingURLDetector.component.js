import React, { useState } from "react";
import { Input, Typography, Table, Tooltip, Button, Tag } from "antd";

function PhishingURLDetector() {
  const [urlValue, setUrlValue] = useState("");
  const featureToDescriptionMapping = {
    IsIpInURL: "Is IP address present in the URL",
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

  const dataSource = [
    { key: "1", featureName: "havingIP", extractedValue: 1 },
    { key: "2", featureName: "haveAtSign", extractedValue: 0 },
    { key: "3", featureName: "getLength", extractedValue: 1 },
    { key: "4", featureName: "getDepth", extractedValue: 3 },
    { key: "5", featureName: "redirection", extractedValue: 0 },
    { key: "6", featureName: "httpDomain", extractedValue: 1 },
    { key: "7", featureName: "tinyURL", extractedValue: 0 },
    { key: "8", featureName: "prefixSuffix", extractedValue: 1 },
    { key: "9", featureName: "getDNS", extractedValue: 0 },
    { key: "10", featureName: "domainAge", extractedValue: 1 },
    { key: "11", featureName: "domainEnd", extractedValue: 0 },
    { key: "12", featureName: "iframe", extractedValue: 1 },
    { key: "13", featureName: "mouseOver", extractedValue: 0 },
    { key: "14", featureName: "rightClick", extractedValue: 1 },
    { key: "15", featureName: "forwarding", extractedValue: 0 },
  ];
  return (
    <div className="container lg:w-1/2 bg-slate-50 rounded-xl flex flex-col justify-center items-center p-4">
      <Typography.Title level={3}>Phishing Url Detector</Typography.Title>
      <Typography.Title level={5}>Enter suspicious url</Typography.Title>
      <Input
        className="w-72"
        type="text"
        name="phishingURL"
        value={urlValue}
        onChange={(e) => setUrlValue(e.target.value)}
        required
      />
      <Button className="mt-4" type="primary">
        Submit
      </Button>
      <Typography.Title className="mt-4" level={5}>
        Is Phishing Link?
      </Typography.Title>
      <Tag color="#cd201f">TRUE</Tag>
      <Typography.Title className="mt-5" level={3}>
        Features
      </Typography.Title>
      <Table className="border-x-4 border-y-4 rounded-md w-1/2" dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default PhishingURLDetector;
