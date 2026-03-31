import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../../../services/api';
import '../Products/AdminProducts.css';

type Category = {
  id: string;
  nome: string;
  slug: string;
};

export const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [nome, setNome] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const resp = await api.get('/category');
      setCategories(Array.isArray(resp.data) ? resp.data : []);
    } catch (err) {
      console.error(err);
      setCategories([]);
    }
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      alert('Digite o nome da categoria');
      return;
    }

    setLoading(true);
    try {
      await api.post('/category', { nome });
      alert('Categoria criada com sucesso!');
      setNome('');
      setShowForm(false);
      loadCategories();
    } catch (err) {
      console.error(err);
      alert('Erro ao criar categoria.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page fade-in">
      <div className="admin-page-header">
        <h1>Gerenciar Categorias</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Voltar para Lista' : '+ Nova Categoria'}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleCreate} className="glass-card admin-form">
          <h3>Criar Nova Categoria</h3>

          <div className="input-group">
            <label>Nome da Categoria *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Placas de Vídeo"
            />
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            O slug será gerado automaticamente (ex: "placas-de-video").
          </p>

          <button type="submit" disabled={loading} className="btn-success">
            {loading ? 'Criando...' : 'Criar Categoria'}
          </button>
        </form>
      ) : (
        <div className="glass-card admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Slug</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={2} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    Nenhuma categoria cadastrada ainda.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td><strong>{cat.nome}</strong></td>
                    <td style={{ color: 'var(--text-secondary)' }}>{cat.slug}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
