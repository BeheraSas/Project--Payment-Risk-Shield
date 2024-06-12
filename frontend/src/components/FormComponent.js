// src/components/FormComponent.js
import React, { useState } from "react";
import visaLogo from "../assets/card-logos/visa.png";
import mastercardLogo from "../assets/card-logos/mastercard.jpg";
import amexLogo from "../assets/card-logos/amex.png";
import discoverLogo from "../assets/card-logos/discover.jpg";
// Import other card logos as needed
import { Button, Flex, Input, Typography } from "antd";

const cardTypeLogos = {
  visa: visaLogo,
  mastercard: mastercardLogo,
  amex: amexLogo,
  discover: discoverLogo,
  // Add other card types here
};

const getCardType = (number) => {
  const regexes = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    // Add other card type regexes here
  };

  for (let [card, regex] of Object.entries(regexes)) {
    if (regex.test(number)) {
      return card;
    }
  }

  return null;
};

const fieldLabels = {
  trans_date_trans_time: "Transaction date and time",
  cc_num: "Card Number",
  merchant: "Merchant",
  category: "Category",
  amt: "Amount",
  first: "First Name",
  last: "Last Name",
  gender: "Gender",
  street: "Street",
  city: "City",
  state: "State",
  zip: "Zip Code",
  lat: "Latitude",
  long: "Longitude",
  city_pop: "City Population",
  job: "Job",
  dob: "Date of Birth",
  trans_num: "Transaction Number",
  unix_time: "Unix Time",
  merch_lat: "Merchant Latitude",
  merch_long: "Merchant Longitude",
};

const FormComponent = ({ onSubmit }) => {
  const initialFormState = {
    trans_date_trans_time: "",
    cc_num: "",
    merchant: "",
    category: "",
    amt: "",
    first: "",
    last: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    lat: "",
    long: "",
    city_pop: "",
    job: "",
    dob: "",
    trans_num: "",
    unix_time: "",
    merch_lat: "",
    merch_long: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [cardType, setCardType] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "cc_num") {
      const detectedCardType = getCardType(value);
      setCardType(detectedCardType);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container p-2 bg-slate-50 m-4 w-1/2 rounded-xl">
      <form onSubmit={handleSubmit}>
        <Flex className="flex-col" justify="center" align="center" gap={10}>
          <Typography.Title level={3}>Fraud Detection</Typography.Title>
          {Object.keys(initialFormState).map((field) => (
            <div key={field} className="w-1/2">
              <label>
                {/* {fieldLabels[field] || field.replace(/_/g, " ")}:
            {field === "cc_num" && cardType && (
              <img
                src={cardTypeLogos[cardType]}
                alt={`${cardType} logo`}
                className="card-logo"
              />
            )} */}
                <Typography.Title level={3}>
                  {fieldLabels[field] || field.replace(/_/g, " ")}
                </Typography.Title>
                <Input
                className="w-full"
                  type="text"
                  name={field}
                  placeholder={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          ))}
          <Button type="primary">Submit</Button>
        </Flex>
      </form>
    </div>
  );
};

export default FormComponent;
