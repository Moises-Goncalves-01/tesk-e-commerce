import React, { useContext } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartContext } from '../../contexts/CartContext';
import './CartDrawer.css';

export function CartDrawer() {
  const { 
    isCartOpen, 
    toggleCart, 
    cartItems, 
    totalCartValue, 
    removeItemFromCart, 
    checkout 
  } = useContext(CartContext);

  if (!isCartOpen) return null;

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalCartValue);

  return (
    <div className="cart-drawer-overlay" onClick={toggleCart}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-header">
          <h2>Seu Carrinho</h2>
          <button className="close-btn" onClick={toggleCart}>
            <X size={24} />
          </button>
        </div>

        {/* Itens */}
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} className="empty-icon" />
              <p>Seu carrinho está vazio.</p>
              <button className="continue-shopping" onClick={toggleCart}>
                Continuar comprando
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.product.imagem_url ? (
                    <img src={item.product.imagem_url} alt={item.product.nome} />
                  ) : (
                    <div className="no-img-mini">Sem Img</div>
                  )}
                </div>
                <div className="cart-item-details">
                  <h4>{item.product.nome}</h4>
                  <p>Qtd: {item.quantidade}</p>
                  <span className="cart-item-price">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.product.preco * item.quantidade)}
                  </span>
                </div>
                <button 
                  className="cart-item-remove" 
                  onClick={() => removeItemFromCart(item.id)}
                  title="Remover"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>{formattedTotal}</strong>
            </div>
            <button className="checkout-btn" onClick={checkout}>
              Finalizar Compra
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
