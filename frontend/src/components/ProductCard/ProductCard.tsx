import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../../contexts/CartContext';
import './ProductCard.css';

interface ProductProps {
  product: {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem_url?: string;
    estoque: number;
    categoria?: {
      nome: string;
    };
  }
}

export function ProductCard({ product }: ProductProps) {
  const { addItemToCart } = useContext(CartContext);

  const isOutOfStock = product.estoque <= 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItemToCart(product.id, 1);
    }
  };

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.preco);

  return (
    <div className={`product-card glass-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="product-image-container">
        {product.imagem_url ? (
          <img src={product.imagem_url} alt={product.nome} className="product-image" />
        ) : (
          <div className="product-no-image">
            <span>Sem Imagem</span>
          </div>
        )}
        {product.categoria && (
          <span className="product-category-badge">{product.categoria.nome}</span>
        )}
        {isOutOfStock && (
          <div className="product-sold-out-overlay">
            <span>Esgotado</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title" title={product.nome}>{product.nome}</h3>
        <p className="product-description">{product.descricao}</p>
        
        <div className="product-footer">
          <span className="product-price">{formattedPrice}</span>
          <button 
            className="product-add-btn" 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            title={isOutOfStock ? "Fora de estoque" : "Adicionar ao carrinho"}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
