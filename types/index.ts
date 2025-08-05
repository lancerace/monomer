import type { Microplate, WellMeasurement } from '@prisma/client';


export type MicroplateWithMeasurements = Microplate & {
  measurements: WellMeasurement[];
};

export interface WellData  {
  id: string;
  row: string;
  column: number;
  latestConfluency?: number;
  lastUpdated?: string;
}

export type ConfluencyLevel = 'very-low' | 'growing' | 'optimal' | 'over' | 'no-data';