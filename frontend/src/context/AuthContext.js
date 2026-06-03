// context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/auth/');
    newSocket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.status);
      console.log(data.message);
      if (data.status === 'success') {
        if (data.message === 'Login successful' || data.message === 'Registration successful') {
          setIsAuthenticated(true);
        }
      } else {
        alert(data.message);
      }
    };

    newSocket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to simplify consuming AuthContext
export const useAuth = () => useContext(AuthContext);
