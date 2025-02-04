// src/components/ui/switch.js
import React, { useState } from 'react';

const Switch = ({ onChange, checked }) => {
  return (
    <label style={{ cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: '40px', height: '20px' }}
      />
      <span style={{ marginLeft: '10px' }}>{checked ? 'On' : 'Off'}</span>
    </label>
  );
};

export default Switch;
