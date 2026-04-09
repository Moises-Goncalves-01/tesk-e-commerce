import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { api } from '../services/api';
import { AuthContext } from './AuthContext';

export interface CartItemType {
  id: string;
  product_id: string;
  quantidade: number;
  product: {
    id: string;
    nome: string;
    preco: number;
    imagem_url: string;
    estoque: number;
  };
}

interface CartContextData {
  cartItems: CartItemType[];
  isCartOpen: boolean;
  totalCartValue: number;
  loadCart: () => Promise<void>;
  addItemToCart: (product_id: string, quantidade: number) => Promise<void>;
  removeItemFromCart: (item_id: string) => Promise<void>;
  checkout: () => Promise<void>;
  toggleCart: () => void;
  clearCartData: () => void;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      clearCartData();
    }
  }, [isAuthenticated]);

  async function loadCart() {
    try {
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }

  async function addItemToCart(product_id: string, quantidade: number) {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para adicionar itens ao carrinho!');
      return;
    }
    
    try {
      await api.post('/cart', { product_id, quantidade });
      await loadCart();
      setIsCartOpen(true); // Abre o drawer automaticamente
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao adicionar item');
    }
  }

  async function removeItemFromCart(item_id: string) {
    try {
      await api.delete('/cart', {
        params: { item_id }
      });
      await loadCart();
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  }

  async function checkout() {
    try {
      await api.post('/order');
      await loadCart(); // Deve vir vazio após o sucesso
      alert('Pedido realizado com sucesso!');
      setIsCartOpen(false);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao finalizar compra');
    }
  }

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  function clearCartData() {
    setCartItems([]);
  }

  const totalCartValue = cartItems.reduce((acc, item) => {
    return acc + (item.product.preco * item.quantidade);
  }, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        isCartOpen, 
        totalCartValue, 
        loadCart, 
        addItemToCart, 
        removeItemFromCart, 
        checkout, 
        toggleCart,
        clearCartData
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
