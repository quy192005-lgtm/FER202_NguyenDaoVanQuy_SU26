import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemedButton({ children, onClick, variant = 'primary' }) {
  const { colors } = useTheme();

  const isPrimary = variant === 'primary';
  const backgroundColor = isPrimary ? colors.primary : 'transparent';
  const color = isPrimary ? colors.primaryText : colors.primary;
  const border = isPrimary ? '1px solid transparent' : `1px solid ${colors.primary}`;

  return (
    <button 
      onClick={onClick}
      className={`btn-custom ${!isPrimary ? 'btn-outline' : ''}`}
      style={{
        backgroundColor,
        color,
        border,
      }}
    >
      {children}
    </button>
  );
}
