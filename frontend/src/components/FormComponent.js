// src/components/FormComponent.js
import React, { useState } from 'react';
import visaLogo from '../assets/card-logos/visa.png';
import mastercardLogo from '../assets/card-logos/mastercard.jpg';
import amexLogo from '../assets/card-logos/amex.png';
import discoverLogo from '../assets/card-logos/discover.jpg';

const cardTypeLogos = {
  visa: visaLogo,
  mastercard: mastercardLogo,
  amex: amexLogo,
  discover: discoverLogo,
};

const getCardType = (number) => {
  const regexes = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  };

  for (let [card, regex] of Object.entries(regexes)) {
    if (regex.test(number)) {
      return card;
    }
  }

  return null;
};

const fieldLabels = {
  trans_date_trans_time: 'Transaction date and time',
  cc_num: 'Card Number',
  merchant: 'Merchant',
  category: 'Category',
  amt: 'Amount',
  first: 'First Name',
  last: 'Last Name',
  gender: 'Gender',
  street: 'Street',
  city: 'City',
  state: 'State',
  zip: 'Zip Code',
  lat: 'Latitude',
  long: 'Longitude',
  city_pop: 'City Population',
  job: 'Job',
  dob: 'Date of Birth',
  trans_num: 'Transaction Number',
  unix_time: 'Unix Time',
  merch_lat: 'Merchant Latitude',
  merch_long: 'Merchant Longitude',
};

const sampleMerchants = [
  {
    name: 'fraud_Parisian, Schiller and Altenwerth',
    category: 'misc_net',
    merch_lat: 29.806815,
    merch_long: -95.377033,
  },
  {
    name: 'fraud_Hagenes, Kohler and Hoppe',
    category: 'food_dining',
    merch_lat: 46.835966,
    merch_long: -89.251001,
  },
  {
    name: 'fraud_Kilback LLC',
    category: 'food_dining',
    merch_lat: 41.938008,
    merch_long: -101.775582,
  },
  {
    name: 'fraud_Streich, Dietrich and Barton',
    category: 'shopping_net',
    merch_lat: 37.324006,
    merch_long: -80.905928,
  },
];

const sampleUsers = [
  {
    first: 'Cody',
    last: 'Blake',
    gender: 'M',
    street: '300 Hodge Loaf',
    city: 'Houston',
    state: 'TX',
    zip: '77027',
    lat: 29.7396,
    long: -95.446,
    city_pop: 2906700,
    job: 'Community development worker',
    dob: '1962-03-14',
  },
  {
    first: 'Micheal',
    last: 'Walters',
    gender: 'M',
    street: '15315 Vaughn Park Suite 356',
    city: 'Hovland',
    state: 'MN',
    zip: '55606',
    lat: 47.8342,
    long: -90.0476,
    city_pop: 272,
    job: 'Freight forwarder',
    dob: '2001-07-05',
  },
  {
    first: 'Rachel',
    last: 'Lowe',
    gender: 'F',
    street: '372 Jeffrey Course',
    city: 'Sutherland',
    state: 'NE',
    zip: '69165',
    lat: 41.1558,
    long: -101.136,
    city_pop: 1789,
    job: 'Insurance broker',
    dob: '1982-11-02',
  },
  {
    first: 'Dakota',
    last: 'Fowler',
    gender: 'M',
    street: '16220 Joseph Point Suite 096',
    city: 'Mountain City',
    state: 'TN',
    zip: '37683',
    lat: 36.4657,
    long: -81.814,
    city_pop: 13021,
    job: 'Tree surgeon',
    dob: '2001-07-05',
  },
];

const FormComponent = ({ onSubmit }) => {
  const initialFormState = {
    trans_date_trans_time: '',
    cc_num: '',
    merchant: '',
    category: '',
    amt: '',
    first: '',
    last: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    lat: '',
    long: '',
    city_pop: '',
    job: '',
    dob: '',
    trans_num: '',
    unix_time: '',
    merch_lat: '',
    merch_long: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [cardType, setCardType] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'cc_num') {
      const detectedCardType = getCardType(value);
      setCardType(detectedCardType);
    }
  };

  const handleMerchantChange = (e) => {
    const selectedMerchant = sampleMerchants.find(
      (merchant) => merchant.name === e.target.value
    );
    setFormData({
      ...formData,
      merchant: selectedMerchant.name,
      category: selectedMerchant.category,
      merch_lat: selectedMerchant.merch_lat,
      merch_long: selectedMerchant.merch_long,
    });
  };

  const handleUserChange = (e) => {
    const selectedUser = sampleUsers.find(
      (user) =>
        user.first === e.target.value.split(' ')[0] &&
        user.last === e.target.value.split(' ')[1]
    );
    setFormData({
      ...formData,
      first: selectedUser.first,
      last: selectedUser.last,
      gender: selectedUser.gender,
      street: selectedUser.street,
      city: selectedUser.city,
      state: selectedUser.state,
      zip: selectedUser.zip,
      lat: selectedUser.lat,
      long: selectedUser.long,
      city_pop: selectedUser.city_pop,
      job: selectedUser.job,
      dob: selectedUser.dob,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fieldLabels).map((field) => (
        <div key={field}>
          <label htmlFor={field}>{fieldLabels[field]}</label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      {cardType && (
        <div>
          <label>Card Type:</label>
          <img src={cardTypeLogos[cardType]} alt={cardType} />
        </div>
      )}
      <div>
        <label htmlFor="merchant">Select Merchant:</label>
        <select
          id="merchant"
          name="merchant"
          value={formData.merchant}
          onChange={handleMerchantChange}
        >
          <option value="">Select a merchant</option>
          {sampleMerchants.map((merchant) => (
            <option key={merchant.name} value={merchant.name}>
              {merchant.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="user">Select User:</label>
        <select
          id="user"
          name="user"
          value={`${formData.first} ${formData.last}`}
          onChange={handleUserChange}
        >
          <option value="">Select a user</option>
          {sampleUsers.map((user) => (
            <option key={user.first + ' ' + user.last} value={user.first + ' ' + user.last}>
              {user.first + ' ' + user.last}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
