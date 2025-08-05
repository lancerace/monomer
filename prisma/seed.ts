import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Check if default microplate already exists
  const existingPlate = await prisma.microplate.findFirst({
    where: { name: 'MicroPlate A' }
  });

  if (existingPlate) {
    console.log('✅ Default microplate already exists, skipping seed...');
    return;
  }

  // Create default microplate
  const microplate = await prisma.microplate.create({
    data: {
      name: 'MicroPlate A',
    },
  });

  console.log(`✅ Created microplate: ${microplate.name} (ID: ${microplate.id})`);

  // Create some sample measurements for different days
  const sampleMeasurements = [
    // Day 0 - Initial seeding (very low confluency)
    { row: 'A', column: 1, confluencyPercentage: 5.0, daysAgo: 5 },
    { row: 'A', column: 2, confluencyPercentage: 7.5, daysAgo: 5 },
    { row: 'A', column: 3, confluencyPercentage: 4.2, daysAgo: 5 },
    { row: 'B', column: 1, confluencyPercentage: 6.1, daysAgo: 5 },
    { row: 'B', column: 2, confluencyPercentage: 8.3, daysAgo: 5 },
    { row: 'B', column: 3, confluencyPercentage: 5.7, daysAgo: 5 },

    // Day 1 - Growing
    { row: 'A', column: 1, confluencyPercentage: 15.2, daysAgo: 4 },
    { row: 'A', column: 2, confluencyPercentage: 18.7, daysAgo: 4 },
    { row: 'A', column: 3, confluencyPercentage: 12.9, daysAgo: 4 },
    { row: 'B', column: 1, confluencyPercentage: 16.8, daysAgo: 4 },
    { row: 'B', column: 2, confluencyPercentage: 20.1, daysAgo: 4 },
    { row: 'B', column: 3, confluencyPercentage: 14.5, daysAgo: 4 },

    // Day 2 - Moderate growth
    { row: 'A', column: 1, confluencyPercentage: 35.4, daysAgo: 3 },
    { row: 'A', column: 2, confluencyPercentage: 42.8, daysAgo: 3 },
    { row: 'A', column: 3, confluencyPercentage: 31.2, daysAgo: 3 },
    { row: 'B', column: 1, confluencyPercentage: 38.9, daysAgo: 3 },
    { row: 'B', column: 2, confluencyPercentage: 45.6, daysAgo: 3 },
    { row: 'B', column: 3, confluencyPercentage: 33.7, daysAgo: 3 },

    // Day 3 - Good growth
    { row: 'A', column: 1, confluencyPercentage: 67.3, daysAgo: 2 },
    { row: 'A', column: 2, confluencyPercentage: 72.1, daysAgo: 2 },
    { row: 'A', column: 3, confluencyPercentage: 64.8, daysAgo: 2 },
    { row: 'B', column: 1, confluencyPercentage: 69.5, daysAgo: 2 },
    { row: 'B', column: 2, confluencyPercentage: 75.3, daysAgo: 2 },
    { row: 'B', column: 3, confluencyPercentage: 66.9, daysAgo: 2 },

    // Day 4 - Near optimal/some over-confluent
    { row: 'A', column: 1, confluencyPercentage: 85.2, daysAgo: 1 },
    { row: 'A', column: 2, confluencyPercentage: 92.7, daysAgo: 1 },
    { row: 'A', column: 3, confluencyPercentage: 82.4, daysAgo: 1 },
    { row: 'B', column: 1, confluencyPercentage: 87.8, daysAgo: 1 },
    { row: 'B', column: 2, confluencyPercentage: 94.1, daysAgo: 1 },
    { row: 'B', column: 3, confluencyPercentage: 84.6, daysAgo: 1 },

    // Day 5 - Current state (mixed confluency levels)
    { row: 'A', column: 1, confluencyPercentage: 88.5, daysAgo: 0 },
    { row: 'A', column: 2, confluencyPercentage: 96.2, daysAgo: 0 },
    { row: 'A', column: 3, confluencyPercentage: 85.7, daysAgo: 0 },
    { row: 'B', column: 1, confluencyPercentage: 91.3, daysAgo: 0 },
    { row: 'B', column: 2, confluencyPercentage: 97.8, daysAgo: 0 },
    { row: 'B', column: 3, confluencyPercentage: 87.9, daysAgo: 0 },
  ];

  // Create measurements with proper timestamps
  for (const measurement of sampleMeasurements) {
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - measurement.daysAgo);
    timestamp.setHours(9, 0, 0, 0); // Set to 9 AM for consistency

    await prisma.wellMeasurement.create({
      data: {
        microplateId: microplate.id,
        row: measurement.row,
        column: measurement.column,
        confluencyPercentage: measurement.confluencyPercentage,
        timestamp: timestamp,
      },
    });
  }

  console.log(`✅ Created ${sampleMeasurements.length} sample measurements`);
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });