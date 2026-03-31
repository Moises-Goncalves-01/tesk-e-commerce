import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// Pages
import { AdminLayout } from '../components/layout/AdminLayout/AdminLayout';
import { AdminDashboard } from '../pages/Admin/Dashboard/AdminDashboard';
import { AdminProducts } from '../pages/Admin/Products/AdminProducts';
import { AdminCategories } from '../pages/Admin/Categories/AdminCategories';
import { AdminOrders } from '../pages/Admin/Orders/AdminOrders';

// Client Layout
import { Navbar } from '../components/layout/Navbar/Navbar';
import { Login } from '../pages/Auth/Login';

function PrivateRoute({ children, reqAdmin = false }: { children: JSX.Element, reqAdmin?: boolean }) {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (reqAdmin && user?.role !== 'ADMIN') {
    return <Navigate to="/" />; // Redireciona para a home se não for admin
  }

  return children;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas de Cliente */}
      <Route path="/" element={<><Navbar /><div style={{padding:'2rem'}}>Home em construcao</div></>} />
      <Route path="/login" element={<Login />} />

      {/* Rotas do Painel Administrativo */}
      <Route 
        path="/admin" 
        element={
          <PrivateRoute reqAdmin={true}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}
