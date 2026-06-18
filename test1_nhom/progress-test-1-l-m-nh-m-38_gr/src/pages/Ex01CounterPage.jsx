import { CounterProvider } from '../context/CounterContext';
import CounterDisplay from '../components/counter/CounterDisplay';
import CounterControls from '../components/counter/CounterControls';
import StatusMessage from '../components/counter/StatusMessage';

const Ex01CounterPage = () => {
  return (
    <CounterProvider>
      <div className="page-container">
        <div className="card-custom text-center mx-auto" style={{ maxWidth: '500px' }}>
          <h2 className="mb-4 text-dark fw-bold">Bài 1: Counter</h2>
          <p className="text-muted mb-4">Chia sẻ state đếm qua Context cho các component độc lập.</p>
          <CounterDisplay />
          <CounterControls />
          <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />
          <StatusMessage />  
        </div>
      </div>
    </CounterProvider>
  );
};

export default Ex01CounterPage;
