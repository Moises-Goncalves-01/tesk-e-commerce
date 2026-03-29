import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar glass-card">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <h2>Tech Store</h2>
        </div>

        {/* Desktop Search */}
        <div className="navbar-search desktop-only">
          <input type="text" placeholder="Buscar produtos..." />
          <button aria-label="Search">
            <Search size={20} />
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions desktop-only">
          <button className="icon-btn" aria-label="User Account">
            <User size={24} />
          </button>
          <button className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingCart size={24} />
            <span className="cart-badge">0</span>
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
            <button className="menu-btn">
              <User size={20} />
              <span>Minha Conta</span>
            </button>
            <button className="menu-btn">
              <ShoppingCart size={20} />
              <span>Carrinho (0)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
