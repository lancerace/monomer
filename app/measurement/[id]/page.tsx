import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { Microplate } from '@prisma/client';
import MeasurementForm from './measurement';

async function getMicroplate(id: string): Promise<Microplate | null> {
  try {
    const microplate = await prisma.microplate.findUnique({
      where: { id }
    });
    return microplate;
  } catch (error) {
    console.error('Error fetching microplate:', error);
    return null;
  }
}

export default async function MeasurementPage({ params }: { params: { id: string } }) {
  const microplate = await getMicroplate(params.id);
  
  if (!microplate) {
    notFound();
  }

  return <MeasurementForm microplate={microplate} />;
}