// src/components/ui/button.js
import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white' }} onClick={onClick}>
      {children || 'Click Me'}
    </button>
  );
};

export default Button;
