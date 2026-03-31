import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import '../Products/AdminProducts.css';

type OrderItem = {
  id: string;
  quantidade: number;
  preco_unitario: number;
  product: {
    nome: string;
  };
};

type Order = {
  id: string;
  user_id: string;
  status: 'PENDING' | 'PAID' | 'CANCELED';
  total: number;
  created_at: string;
  user?: { nome: string; email: string };
  orderItems?: OrderItem[];
};

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendente', color: '#f59e0b' },
  PAID: { label: 'Pago', color: '#10b981' },
  CANCELED: { label: 'Cancelado', color: '#ef4444' },
};

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const resp = await api.get('/admin/orders?page=1');
      const data = resp.data;
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      setOrders([]);
    }
  }

  async function handleChangeStatus(order_id: string, newStatus: string) {
    setLoading(true);
    try {
      await api.put('/admin/orders/status', { order_id, status: newStatus });
      loadOrders();
    } catch (err) {
      console.error(err);
      alert('Erro ao alterar status do pedido.');
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  }

  return (
    <div className="admin-page fade-in">
      <div className="admin-page-header">
        <h1>Gerenciar Pedidos</h1>
        <button className="btn-primary" onClick={loadOrders} disabled={loading}>
          Atualizar
        </button>
      </div>

      <div className="glass-card admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Nenhum pedido encontrado.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const st = statusLabels[order.status] || { label: order.status, color: '#999' };
                return (
                  <tr key={order.id}>
                    <td>{formatDate(order.created_at)}</td>
                    <td>{order.user?.nome || '---'}</td>
                    <td style={{ fontWeight: 'bold', color: 'var(--accent-blue)' }}>
                      R$ {Number(order.total).toFixed(2)}
                    </td>
                    <td>
                      <span style={{
                        background: `${st.color}22`,
                        color: st.color,
                        border: `1px solid ${st.color}44`,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}>
                        {st.label}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                        disabled={loading}
                        style={{
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-light)',
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.85rem',
                        }}
                      >
                        <option value="PENDING">Pendente</option>
                        <option value="PAID">Pago</option>
                        <option value="CANCELED">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
