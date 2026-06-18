import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { THEME_MODES, THEME_LABELS } from '../../data/themeConfig';

export default function ThemeNavbar() {
  const { mode, colors, changeMode } = useTheme();

  return (
    <div style={{ backgroundColor: colors.surface, padding: '1rem', borderBottom: `1px solid ${colors.border}`, transition: 'all 0.3s ease' }}>
      <div className="container py-0 d-flex align-items-center">
        <h5 className="mb-0 fw-bold me-auto d-none d-sm-block">Giao diện</h5>
        <div className="theme-nav-container">
          {THEME_MODES.map(m => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`theme-nav-btn ${mode === m ? 'active' : ''}`}
              style={{
                color: mode === m ? colors.primary : colors.text,
                backgroundColor: mode === m ? colors.surface : 'transparent'
              }}
            >
              {THEME_LABELS[m]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
