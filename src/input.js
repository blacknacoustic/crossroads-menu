// src/components/ui/input.js
import React from 'react';

const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Enter text'}
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
    />
  );
};

export default Input;
