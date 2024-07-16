import React, { useState } from 'react';

const SendMessageComponent = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSendMessage = async () => {
    const messageData = {
      user: selectedUser,
      message: message,
      url: url,
    };

    try {
      const response = await fetch('http://localhost:5001/saveMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      if (response.ok) {
        alert('Message sent successfully');

        // Optionally, reset form fields after successful submission
        setSelectedUser('');
        setMessage('');
        setUrl('');
      } else {
        alert("Message couldn't be sent. Try Again! ");

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="send-message-container">
      <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Message</h2>
      <br />
      <div className="form-group">
        <label htmlFor="user">User:</label>
        <select id="user" value={selectedUser} onChange={handleUserChange}>
          <option value="">Select User</option>
          <option value="user1">Cody Blake</option>
          <option value="user2">Micheal Walters</option>
          <option value="user3">Rachel Lowe</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <br />
        <textarea
          id="message"
          value={message}
          onChange={handleMessageChange}
          style={{ width: '100%', minHeight: '150px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={handleUrlChange}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <br />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default SendMessageComponent;
