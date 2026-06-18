/**
 * StatusMessage.jsx – Hiển thị trạng thái dương / âm / bằng 0 (Bài 1)
 */

import { useCounter } from '../../context/CounterContext';

export default function StatusMessage() {
  const { count } = useCounter();

  let statusText = 'Bằng 0';
  let badgeClass = 'zero';

  if (count > 0) {
    statusText = 'Dương';
    badgeClass = 'positive';
  } else if (count < 0) {
    statusText = 'Âm';
    badgeClass = 'negative';
  }

  return (
    <div className="status-message">
      <p className="mb-0 mt-3 text-muted">Trạng thái: <span className={`status-badge ms-2 ${badgeClass}`} data-testid="status-text">{statusText}</span></p>
    </div>
  );
}