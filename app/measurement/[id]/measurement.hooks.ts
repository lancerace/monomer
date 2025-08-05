import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { WellMeasurement } from '@prisma/client';
  

interface AddMeasurementInput {
    plateId: string;
    measurement: {
      row: string;
      column: number;
      confluencyPercentage: number;
    };
  }

const addMeasurement = async ({ 
    plateId, 
    measurement 
  }: AddMeasurementInput): Promise<WellMeasurement> => {
    const response = await fetch(`/api/plate/${plateId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(measurement),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add measurement');
    }
    
    return response.json();
  };

export function useAddMeasurement(plateId: string) {
    const router = useRouter();
  
  // Mutation hook
  const mutation = useMutation({
    mutationFn: addMeasurement,
    onSuccess: () => {
      setTimeout(() => {
        router.push(`/microplate/${plateId}`);
        router.refresh();
      }, 2000);
    },
  });
  
    // Event handlers and actions
    const handleAddMeasurement = useCallback(async (input: AddMeasurementInput) => {
      return mutation.mutateAsync(input);
    }, [mutation]);
  
    // Group return values into getters and actions
    const getters = {
      isPending: mutation.isPending,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      error: mutation.error,
      data: mutation.data,
    };
  
    const actions = {
      addMeasurement: handleAddMeasurement,
      mutateAsync: mutation.mutateAsync,
      reset: mutation.reset,
    };
  
    return { getters, actions };
  }