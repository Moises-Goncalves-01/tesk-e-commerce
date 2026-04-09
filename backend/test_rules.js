async function testRules() {
  try {
    // 1. Login
    const loginRes = await fetch('http://localhost:3333/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@techstore.com', senha: 'admin123' })
    });
    const { token } = await loginRes.json();

    // 2. Get category
    const catRes = await fetch('http://localhost:3333/category');
    const categories = await catRes.json();
    const catId = categories[0].id;

    // 3. Teste 1: Criar produto com valor e estoque negativos
    console.log('\n--- TESTE 1: Produto Inválido ---');
    const form = new FormData();
    form.append('nome', 'Produto Fraudulento');
    form.append('descricao', 'Tentando quebrar o sistema');
    form.append('preco', '-500');   // Inválido
    form.append('estoque', '-5');   // Inválido
    form.append('categoria_id', catId);
    
    let res1 = await fetch('http://localhost:3333/product', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form
    });
    console.log('Esperado Falha -> Resultado:', await res1.json());

    // 4. Criamos um produto válido com estoque=2 para testar Carrinho
    console.log('\n--- PREPARANDO TESTE DE ESTOQUE ---');
    const form2 = new FormData();
    form2.append('nome', 'Fone Teste de Estoque');
    form2.append('descricao', 'Temos apenas 2 no estoque');
    form2.append('preco', '100');
    form2.append('estoque', '2');
    form2.append('categoria_id', catId);
    
    let res2 = await fetch('http://localhost:3333/product', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form2
    });
    const produto = await res2.json();
    console.log('Criou produto:', produto.nome, 'Estoque:', produto.estoque);

    // 5. Teste 2: Adicionar 3 unidades no carrinho (estoque é 2)
    console.log('\n--- TESTE 2: Adicionar mais no carrinho que o estoque ---');
    let res3 = await fetch('http://localhost:3333/cart', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id: produto.id, quantidade: 3 })
    });
    console.log('Esperado Falha -> Resultado:', await res3.json());

    // 6. Teste 3: Adicionar 2 (OK) e tentar fechar pedido
    console.log('\n--- TESTE 3: Carrinho OK e Checkout ---');
    await fetch('http://localhost:3333/cart', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id: produto.id, quantidade: 2 })
    });
    
    // Finalizando pedido
    let res4 = await fetch('http://localhost:3333/order', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const pedido = await res4.json();
    console.log('Pedido criado:', pedido.id);

    // Verificando estoque (deve ser 0 agora)
    let res5 = await fetch('http://localhost:3333/product');
    const produtos = await res5.json();
    const nossoProduto = produtos.products.find(p => p.id === produto.id);
    console.log('Estoque apos pedido:', nossoProduto.estoque);

    // 7. Teste 4: Cancelar pedido e ver se volta o estoque
    console.log('\n--- TESTE 4: Cancelamento devolve estoque ---');
    await fetch('http://localhost:3333/admin/orders/status', {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order_id: pedido.id, status: 'CANCELED' })
    });

    let res6 = await fetch('http://localhost:3333/product');
    const produtosFinais = await res6.json();
    const nossoProdutoFinal = produtosFinais.products.find(p => p.id === produto.id);
    console.log('Estoque apos CANCELAMENTO:', nossoProdutoFinal.estoque);

  } catch (err) {
    console.error('ERROR NO SCRIPT:', err);
  }
}

testRules();
