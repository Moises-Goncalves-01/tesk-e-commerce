import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';
import { api } from '../../../services/api';
import './AdminProducts.css';

type Product = {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria_id: string;
  imagem_url?: string;
  categoria?: { nome: string; slug: string };
};

type Category = {
  id: string;
  nome: string;
};

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Estados do Form
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [categoria_id, setCategoriaId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    try {
      const resp = await api.get('/product');
      // A API retorna { products: [...], page, totalCount, ... }
      const data = resp.data;
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  }

  async function loadCategories() {
    try {
      const resp = await api.get('/category');
      const data = resp.data;
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setCategories([]);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!nome || !descricao || !preco || !categoria_id) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('nome', nome);
      data.append('descricao', descricao);
      data.append('preco', preco);
      data.append('estoque', estoque || '0');
      data.append('categoria_id', categoria_id);
      
      if (imageFile) {
        data.append('file', imageFile);
      }

      const response = await api.post('/product', data);
      
      alert('Produto cadastrado com sucesso!');
      
      // Reseta form e recarrega
      setNome('');
      setDescricao('');
      setPreco('');
      setEstoque('');
      setCategoriaId('');
      setImageFile(null);
      setShowForm(false);
      loadProducts();
      
    } catch (err) {
      console.error("Erro ao cadastrar produto", err);
      alert("Erro ao cadastrar produto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page fade-in">
      <div className="admin-page-header">
        <h1>Gerenciar Produtos</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Voltar para Lista' : '+ Novo Produto'}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleRegister} className="glass-card admin-form">
          <h3>Cadastrar Novo Produto</h3>
          
          <div className="input-group">
            <label>Nome do Produto *</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: RTX 4090" />
          </div>

          <div className="input-group">
            <label>Descrição *</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Detalhes técnicos..."></textarea>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Preço (R$) *</label>
              <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="1999.90" />
            </div>
            
            <div className="input-group">
              <label>Estoque (Opcional)</label>
              <input type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} placeholder="10" />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Categoria *</label>
              <select value={categoria_id} onChange={(e) => setCategoriaId(e.target.value)}>
                <option value="">Selecione uma categoria...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Imagem do Produto (PNG, JPG ou WEBP)</label>
              <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-success">
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>
        </form>
      ) : (
        <div className="glass-card admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{textAlign: 'center', padding: '2rem', color: 'var(--text-muted)'}}>Nenhum produto cadastrado ainda.</td>
                </tr>
              ) : (
                products.map(product => {
                  const numVal = Number(product.preco);
                  const precoFormatado = isNaN(numVal) ? String(product.preco) : `R$ ${numVal.toFixed(2)}`;
                  
                  return (
                    <tr key={product.id}>
                      <td>
                        {product.imagem_url ? (
                          <img src={product.imagem_url} alt={product.nome} className="product-thumb" />
                        ) : (
                          <div className="product-thumb-placeholder">Sem Img</div>
                        )}
                      </td>
                      <td><strong>{product.nome}</strong></td>
                      <td>{product.categoria?.nome || categories.find(c => c.id === product.categoria_id)?.nome || '---'}</td>
                      <td style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{precoFormatado}</td>
                      <td>{product.estoque} un.</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
