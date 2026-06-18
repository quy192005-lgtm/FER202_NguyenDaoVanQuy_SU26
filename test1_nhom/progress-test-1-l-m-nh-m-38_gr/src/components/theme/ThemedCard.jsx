import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemedCard({ title, children }) {
  const { colors } = useTheme();

  return (
    <div className="card-custom mb-4" style={{
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      color: colors.text
    }}>
      {title && <h3 className="mb-4 fw-bold fs-5">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
