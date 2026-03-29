import React from 'react';
import { Navbar } from './components/layout/Navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1rem', fontWeight: 600 }}>Destaques da Semana</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Skeleton temporário de produto só para visualização */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}></div>
              <h3 style={{ fontSize: '1.1rem' }}>Produto Exemplo</h3>
              <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '1.25rem' }}>R$ 1.999,00</p>
              <button style={{ backgroundColor: 'var(--accent-blue)', color: 'white', padding: '10px', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
