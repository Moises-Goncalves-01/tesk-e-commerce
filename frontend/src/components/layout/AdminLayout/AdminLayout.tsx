import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Package, ListTree, ShoppingCart, LayoutDashboard, LogOut } from 'lucide-react';
import { AuthContext } from '../../../contexts/AuthContext';
import './AdminLayout.css';

export const AdminLayout = () => {
  const { pathname } = useLocation();
  const { signOut, user } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Produtos', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Categorias', path: '/admin/categories', icon: <ListTree size={20} /> },
    { name: 'Pedidos', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar Lateral */}
      <aside className="admin-sidebar glass-card">
        <div className="admin-logo">
          <h2>Tech Store</h2>
          <span className="badge-admin">Admin</span>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="admin-footer">
          <div className="admin-user-info">
            <p className="admin-user-name">{user?.nome}</p>
          </div>
          <button className="admin-logout-btn" onClick={signOut}>
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main className="admin-main">
        {/* O Outlet injeta as sub-rotas como Produtos, Categorias, etc */}
        <div className="admin-content-wrapper fade-in">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};
