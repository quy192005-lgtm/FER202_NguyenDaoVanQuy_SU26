/**
 * CounterDisplay.jsx – Hiển thị giá trị đếm hiện tại (Bài 1)
 */

import { useCounter } from '../../context/CounterContext';

export default function CounterDisplay() {
  const { count } = useCounter();

  return (
    <div className="counter-display">
      <h2 className="mb-0 fs-5 text-muted">Counter:</h2>
      <div className="counter-value">{count}</div>
    </div>
  );
}