import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MicroplateView from '@/components/MicroplateView/MicroplateView';
import type { MicroplateWithMeasurements } from '@/types';

async function getMicroplate(id: string): Promise<MicroplateWithMeasurements | null> {
  try {
    const microplate = await prisma.microplate.findUnique({
      where: { id },
      include: {
        measurements: {
          orderBy: { timestamp: 'desc' }
        }
      }
    });
    return microplate;
  } catch (error) {
    console.error('Error fetching microplate:', error);
    return null;
  }
}

export default async function MicroplatePage({ params }: { params: { id: string } }) {
  const microplate = await getMicroplate(params.id);
  if (!microplate) {
    notFound();
  }

  return <MicroplateView microplate={microplate} />;
}