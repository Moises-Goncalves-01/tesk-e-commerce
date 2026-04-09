const fs = require('fs');

async function test() {
  try {
    // 1. Login
    const loginRes = await fetch('http://localhost:3333/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@techstore.com', senha: 'admin123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;

    // 2. Get category
    const catRes = await fetch('http://localhost:3333/category');
    const categories = await catRes.json();
    const catId = categories[0].id;

    // 3. Upload image
    const form = new FormData();
    form.append('nome', 'Super PC Gamer 4K');
    form.append('descricao', 'Testando upload com script');
    form.append('preco', '25000');
    form.append('estoque', '2');
    form.append('categoria_id', catId);
    
    // Read the image generated earlier
    const imgPath = 'C:\\Users\\silva\\.gemini\\antigravity\\brain\\a748fd40-e459-4161-a8ca-b65aa831e7dc\\gaming_setup_1775415260873.png';
    const buffer = fs.readFileSync(imgPath);
    form.append('file', new Blob([buffer], { type: 'image/png' }), 'gaming_setup.png');

    const res = await fetch('http://localhost:3333/product', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    });

    const data = await res.json();
    if (!res.ok) console.error('ERROR RESPONSE:', data);
    else console.log('UPLOAD SUCCESS:', data);
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}

test();
