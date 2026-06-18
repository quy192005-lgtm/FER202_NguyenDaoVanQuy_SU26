/**
 * CounterControls.jsx – Các nút điều khiển bộ đếm (Bài 1)
 */

import { useCounter } from '../../context/CounterContext';

export default function CounterControls() {
  const { increment, decrement, reset } = useCounter();

  return (
    <div className="counter-controls">
      <button className="btn-custom btn-circle shadow-sm" onClick={increment}>+</button>
      <button className="btn-custom btn-circle shadow-sm" style={{backgroundColor: '#e2e8f0', color: '#0f172a'}} onClick={decrement}>-</button>
      <button className="btn-custom btn-outline shadow-sm px-4 ms-2 rounded-pill" onClick={reset}>Reset</button>
    </div>
  );
}