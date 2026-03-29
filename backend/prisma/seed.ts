import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando script de Seed...');

  const passwordHash = await hash('admin123', 8);

  // Usa upsert para criar apenas se o email não existir ainda
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@techstore.com' },
    update: {}, // se já existe, não mexe em nada
    create: {
      nome: 'Administrador Mestre',
      email: 'admin@techstore.com',
      senha: passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('✅ Usuário Master Admin criado/verificado:');
  console.log(`- Email: ${adminUser.email}`);
  console.log(`- Role: ${adminUser.role}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
