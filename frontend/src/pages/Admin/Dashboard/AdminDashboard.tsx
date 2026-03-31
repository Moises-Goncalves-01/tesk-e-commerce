import { useEffect, useState, useContext } from 'react';
import { api } from '../../../services/api';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, categories: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const [prodResp, catResp, ordResp] = await Promise.all([
        api.get('/product').catch(() => ({ data: { totalCount: 0 } })),
        api.get('/category').catch(() => ({ data: [] })),
        api.get('/admin/orders?page=1').catch(() => ({ data: [] })),
      ]);

      const prodData = prodResp.data;
      const prodCount = prodData?.totalCount ?? (Array.isArray(prodData) ? prodData.length : 0);

      const catData = catResp.data;
      const catCount = Array.isArray(catData) ? catData.length : 0;

      const ordData = ordResp.data;
      let ordCount = 0;
      if (Array.isArray(ordData)) {
        ordCount = ordData.filter((o: any) => o.status === 'PENDING').length;
      } else if (ordData && Array.isArray(ordData.orders)) {
        ordCount = ordData.orders.filter((o: any) => o.status === 'PENDING').length;
      }

      setStats({ products: prodCount, orders: ordCount, categories: catCount });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total de Produtos</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{stats.products}</p>
        </div>
        
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Pedidos Pendentes</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-purple)' }}>{stats.orders}</p>
        </div>
        
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Categorias</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.categories}</p>
        </div>
      </div>
    </div>
  );
};
