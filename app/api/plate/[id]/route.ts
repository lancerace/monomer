import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const microplate = await prisma.microplate.findUnique({
      where: { id: params.id },
      include: {
        measurements: {
          orderBy: { timestamp: 'desc' }
        }
      }
    });

    if (!microplate) {
      return NextResponse.json(
        { error: 'Microplate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(microplate);
  } catch (error) {
    console.error('Error fetching microplate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { row, column, confluencyPercentage } = body;

    // Validate input
    if (!['A', 'B'].includes(row)) {
      return NextResponse.json(
        { error: 'Row must be A or B' },
        { status: 400 }
      );
    }

    if (![1, 2, 3].includes(column)) {
      return NextResponse.json(
        { error: 'Column must be 1, 2, or 3' },
        { status: 400 }
      );
    }

    if (typeof confluencyPercentage !== 'number' || confluencyPercentage < 0 || confluencyPercentage > 100) {
      return NextResponse.json(
        { error: 'Confluency percentage must be a number between 0 and 100' },
        { status: 400 }
      );
    }

    // Check if microplate exists
    const microplate = await prisma.microplate.findUnique({
      where: { id: params.id }
    });

    if (!microplate) {
      return NextResponse.json(
        { error: 'Microplate not found' },
        { status: 404 }
      );
    }

    // Create new measurement
    const measurement = await prisma.wellMeasurement.create({
      data: {
        microplateId: params.id,
        row,
        column,
        confluencyPercentage
      }
    });

    return NextResponse.json(measurement, { status: 201 });
  } catch (error) {
    console.error('Error creating measurement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}