/**
 * CounterContext.jsx – Context quản lý state đếm (Bài 1)
 */

import { createContext, useContext, useState } from 'react';

const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  const value = {
    count,
    increment,
    decrement,
    reset,
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};