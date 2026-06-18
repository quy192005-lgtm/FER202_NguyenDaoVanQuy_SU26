import React from 'react';
import PizzaList from './components/PizzaList';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '30px 0', color: '#0d6efd' }}>
        🍕 Pizza Store - Test
      </h1>

      <PizzaList />

      <Footer />
    </div>
  );
}

export default App;
