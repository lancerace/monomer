import { WellMeasurement } from '@prisma/client';
import { WellData } from '@/types';

export function getMicroplateData(measurements: WellMeasurement[]): WellData[] {
  const microplateData: WellData[] = [];
  const rows = ['A', 'B'] as const;
  const columns = [1, 2, 3] as const;

  // Initialize all wells
  for (const row of rows) {
    for (const column of columns) {
      const wellId = `${row}${column}`;
      
      // Find the latest measurement for this well
      const latestMeasurement = measurements
        .filter(m => m.row === row && m.column === column)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

      microplateData.push({
        id: wellId,
        row,
        column,
        latestConfluency: latestMeasurement?.confluencyPercentage,
        lastUpdated: latestMeasurement?.timestamp?.toISOString(),
      });
    }
  }

  return microplateData;
}