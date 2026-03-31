import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import './Login.css';

export const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !senha) {
      setErrorMsg('Preencha os dados.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/session', { email, senha });
      const { id, nome, role, token } = response.data;
      
      // Salva a sessão no contexto
      signIn(token, { id, nome, email, role });
      
      // Redireciona com base no papel
      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (err: any) {
      console.log(err);
      setErrorMsg('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box glass-card">
        <h2>Acessar Tech Store</h2>
        <p>Faça login para continuar</p>

        {errorMsg && <div className="login-error">{errorMsg}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" 
              placeholder="Digite seu e-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="Digite sua senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};
