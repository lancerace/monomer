import { useMemo } from 'react';
import {  getMicroplateData } from '@/utils/microplateData';
import type { MicroplateWithMeasurements } from '@/types';

interface UseWellsDataParams {
  microplate?: MicroplateWithMeasurements;
}


// Hook for processed wells data
export function useMicroplate(params: UseWellsDataParams) {
  const { microplate } = params;

  // Computed values and derived state
  const microplateData = useMemo(() => {
    if (!microplate?.measurements) return [];
    return getMicroplateData(microplate.measurements);
  }, [microplate?.measurements]);

  // Group return values into getters and actions
  const getters = {
    microplateData,
    hasData: microplateData.length > 0,
    microplate,
  };

  const actions = {
    // No actions for this hook - it's purely computed data
  };

  return { getters, actions };
}


