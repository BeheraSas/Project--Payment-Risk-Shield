// src/components/TransactionMessage.js
import React from 'react';


const TransactionMessage = ({ transactionStatus }) => {
  let transactionMessage = null;
//   let iconSrc = null;
  let message = '';

  if (transactionStatus === 'fraud') {
    // iconSrc = fraudIcon;
    message = 'Payment blocked: Transaction flagged as FRAUD. Please wait for approval.';
  } else if (transactionStatus === 'notFraud') {
    // iconSrc = successIcon;
    message = 'Payment successful.';
  }

  return (
    <div>
      {/* <img src={iconSrc} alt={transactionStatus} style={{ height: '50px', width: 'auto' }} /> */}
      <p>{message}</p>
    </div>
  );
};

export default TransactionMessage;
