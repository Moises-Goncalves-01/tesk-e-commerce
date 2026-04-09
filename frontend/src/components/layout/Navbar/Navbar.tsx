import React, { useContext, useState } from 'react';
import { ShoppingCart, LogIn, LayoutDashboard, LogOut, Menu, X, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { CartContext } from '../../../contexts/CartContext';
import './Navbar.css';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useContext(AuthContext);
  const { cartItems, toggleCart } = useContext(CartContext);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <nav className="navbar glass-card">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
          <h2>Tech Store</h2>
        </Link>

        {/* Desktop Search */}
        <div className="navbar-search desktop-only">
          <input type="text" placeholder="Buscar produtos..." />
          <button aria-label="Search">
            <Search size={20} />
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions desktop-only">
          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' && (
                <button className="icon-btn text-btn" onClick={() => navigate('/admin')}>
                  <LayoutDashboard size={20} />
                  <span>Painel</span>
                </button>
              )}
              <button className="icon-btn text-btn" onClick={signOut} title="Sair">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <button className="icon-btn text-btn" onClick={() => navigate('/login')}>
              <LogIn size={20} />
              <span>Entrar</span>
            </button>
          )}

          <button className="icon-btn cart-btn" aria-label="Cart" onClick={toggleCart}>
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle">
          <button 
             className="icon-btn"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass-card">
          <div className="navbar-search">
            <input type="text" placeholder="Buscar produtos..." />
            <button>
              <Search size={20} />
            </button>
          </div>
          <div className="mobile-actions">
            {isAuthenticated ? (
              <>
                {user?.role === 'ADMIN' && (
                  <button className="menu-btn" onClick={() => navigate('/admin')}>
                    <LayoutDashboard size={20} />
                    <span>Painel Administrador</span>
                  </button>
                )}
                <button className="menu-btn" onClick={signOut}>
                  <LogOut size={20} />
                  <span>Sair ({user?.nome})</span>
                </button>
              </>
            ) : (
              <button className="menu-btn" onClick={() => navigate('/login')}>
                <LogIn size={20} />
                <span>Fazer Login</span>
              </button>
            )}
            
            <button className="menu-btn" onClick={toggleCart}>
              <ShoppingCart size={20} />
              <span>Carrinho ({cartItemsCount})</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
