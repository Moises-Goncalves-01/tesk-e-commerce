import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import './Home.css';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem_url?: string;
  categoria: {
    nome: string;
  };
}

interface Category {
  id: string;
  nome: string;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/product'),
          api.get('/category')
        ]);
        // A API de produtos retorna { products: [...] } conforme ajustamos antes
        setProducts(prodRes.data.products || []);
        setCategories(catRes.data || []);
      } catch (error) {
        console.error('Erro ao buscar dados da home', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProducts = activeCategory 
    ? products.filter(p => p.categoria.nome === activeCategory)
    : products;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">O Melhor Equipamento para o seu Setup</h1>
          <p className="hero-subtitle">
            Encontre setups de alta performance, peças de última geração e periféricos premium em Dark Mode.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        
        {/* Categories Header */}
        <div className="categories-header">
          <h2>Conheça Nossos Produtos</h2>
          <div className="categories-filters">
            <button 
              className={`category-badge ${!activeCategory ? 'active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              Todos
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`category-badge ${activeCategory === cat.nome ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.nome)}
              >
                {cat.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="loading-container">
            <Loader2 className="spinner" size={48} />
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="empty-products-msg">
                Nenhum produto encontrado nesta categoria.
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
