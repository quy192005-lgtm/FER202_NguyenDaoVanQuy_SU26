import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemedInput({ placeholder }) {
  const { colors } = useTheme();

  return (
    <div className="form-group mb-3">
      <input 
        placeholder={placeholder} 
        className="input-custom"
        style={{
          backgroundColor: colors.background,
          color: colors.text,
          borderColor: colors.border,
        }}
      />
    </div>
  );
}
