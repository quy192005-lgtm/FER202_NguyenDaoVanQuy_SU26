import React from 'react';
import { useFormContext } from '../../context/FormContext';

export default function FormField({ name, label, type = 'text', placeholder }) {
  const { state, dispatch } = useFormContext();

  const value = state.values[name] || '';
  const error = state.errors[name];
  const isTouched = state.touched[name];

  const hasError = isTouched && error;
  const isValid = isTouched && !error;

  const handleChange = (e) => {
    dispatch({ type: 'CHANGE', field: name, value: e.target.value });
  };

  const handleBlur = () => {
    dispatch({ type: 'BLUR', field: name });
  };

  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label-custom">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="input-custom"
        style={{
          borderColor: hasError ? 'var(--danger-color)' : isValid ? 'var(--success-color)' : 'var(--border-color)',
          boxShadow: hasError ? '0 0 0 1px rgba(239, 68, 68, 0.2)' : isValid ? '0 0 0 1px rgba(16, 185, 129, 0.2)' : 'none'
        }}
      />
      {hasError && <span className="error-text">{error}</span>}
    </div>
  );
}
