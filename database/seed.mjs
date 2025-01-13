import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* async function seedUsers() {
  const numberOfUsers = 20;

  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=${numberOfUsers}`
    );
    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("API don't have results...");
    }

    for (const user of data.results) {
      try {
        await prisma.user.create({
          data: {
            email: user.email,
            username: `${user.name.first} ${user.name.last}`,
            password: '123456',
            image: user.picture.medium,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
            ranting: Math.floor(Math.random() * 5),
          },
        });
      } catch (error) {
        console.error(`Error in user ${user.email}:`, error);
      }
    }
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Seed users failed:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Conexión con Prisma cerrada.');
  }
} */

// seedUsers();

async function seedCategories() {
  await prisma.category.create({
    data: {
      title: 'Sport',
      description:
        'Venez vivre des moments palpitants en rejoignant nos événements sportifs ! Que vous soyez passionné de football, de course à pied ou de sports extrêmes, cette catégorie est faite pour vous.',
    },
  });

  await prisma.category.create({
    data: {
      title: 'Education',
      description:
        'Explorez des opportunités enrichissantes pour apprendre et grandir ! Nos événements éducatifs incluent des conférences inspirantes, des ateliers pratiques et des séminaires captivants pour tous les âges.',
    },
  });

  await prisma.category.create({
    data: {
      title: 'Language',
      description:
        'Développez vos compétences linguistiques tout en vous amusant ! Rejoignez des événements de langue pour pratiquer vos compétences en conversation, participer à des ateliers interactifs et découvrir des cultures fascinantes.',
    },
  });

  await prisma.category.create({
    data: {
      title: 'City Tours',
      description:
        'Découvrez les merveilles de votre ville à travers nos visites guidées ! Explorez les trésors cachés, apprenez l’histoire locale et profitez de parcours captivants à travers les quartiers emblématiques.',
    },
  });

  await prisma.category.create({
    data: {
      title: 'Air Libre',
      description:
        'Ressentez la liberté en plein air avec nos événements en extérieur ! Que vous aimiez la randonnée, le camping ou les pique-niques, cette catégorie vous propose des activités rafraîchissantes dans la nature.',
    },
  });

  await prisma.category.create({
    data: {
      title: 'Autres',
      description:
        'Découvrez une variété d’événements uniques qui ne rentrent dans aucune autre catégorie ! Cette rubrique rassemble des expériences éclectiques et originales pour satisfaire toutes vos curiosités.',
    },
  });
  console.log('Seeded categories');
}

async function seedEvents() {
  const maxEventsPerCategory = 5;
  const users = await prisma.user.findMany();
  const categories = await prisma.category.findMany();

  for (let i = 0; i < categories.length; i++) {
    const numberOfEvents = Math.floor(
      Math.random() * (maxEventsPerCategory + 1)
    ); // Entre 0 y 5 eventos por catégorie

    for (let j = 0; j < numberOfEvents; j++) {
      // Selecciona un usuario aleatorio
      const user = users[Math.floor(Math.random() * users.length)];

      // Genera fechas al azar para los eventos
      const startDate = new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1); // Durée aléatoire entre 1 et 5 jours

      // Títulos cortos y descripciones ficticias
      const eventTitle = `Événement ${i + 1}-${j + 1}`;
      const eventDescription = `Détail de l’événement ${i + 1}-${j + 1}. Profitez d’une expérience inoubliable avec des activités passionnantes.`;

      await prisma.events.create({
        data: {
          userId: user.id,
          title: eventTitle,
          description: eventDescription,
          eventStart: startDate,
          eventEnd: endDate,
          categoryId: categories[i].id,
          city: 'Montpellier',
        },
      });
    }
  }
  console.log('Seeded events');
}

seedCategories()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(async () => {
    await seedEvents();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
