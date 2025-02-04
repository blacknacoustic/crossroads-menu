// src/components/ui/card.js
import React from 'react';

const Card = ({ children }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      margin: '10px',
    }}>
      {children}
    </div>
  );
};

export default Card;
