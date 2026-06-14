import React from 'react';
import { CheckoutPanel } from './components/CheckoutPanel';

function App() {
  const handlePagesaMe = (shuma: number) => {
    console.log(`Pagesa e $${shuma.toFixed(2)} u krye me sukses`);
  };

  return (
    <CheckoutPanel
      balanca={1250.50}
      emriProduktit="Plani Premium"
      cmimProduktit={49.99}
      onPagesaMe={handlePagesaMe}
    />
  );
}

export default App;
