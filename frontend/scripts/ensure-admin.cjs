const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@admin.com';
  const password = 'admin123';

  await prisma.user.upsert({
    where: { email },
    update: {
      name: 'Administrador',
      phone: '00000000000',
      address: 'Painel Administrativo',
      password,
    },
    create: {
      name: 'Administrador',
      email,
      phone: '00000000000',
      address: 'Painel Administrativo',
      password,
    },
  });

  console.log(`Admin user ensured: ${email}`);
}

main()
  .catch((error) => {
    console.error('Failed to ensure admin user:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
