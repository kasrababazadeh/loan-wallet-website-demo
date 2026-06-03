// AuthModal.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ type, onClose }) => {
  const { socket, login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendSMS = () => {
    socket.send(JSON.stringify({
      action: 'send_sms',
      phone_number: phoneNumber
    }));
  };

  const handleVerifyCode = () => {
    socket.send(JSON.stringify({
      action: 'verify_code',
      verification_code: verificationCode,
      phone_number: phoneNumber,
      type: type
    }));
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);
      if (data.status === 'success') {
        if (data.message === 'SMS sent successfully') {
          setShowVerification(true);
        } else if (data.message === 'Verification successful') {
          login();
          onClose();
        }
      } else {
        setMessage(data.message);
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, login, onClose, type]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{type === 'login' ? 'Login' : 'Register'}</h2>
        {message && (
          <div className="text-red-500 mb-4">{message}</div>
        )}
        {!showVerification ? (
          <>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={handleSendSMS}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Send SMS
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={handleVerifyCode}
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Verify Code
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white p-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
