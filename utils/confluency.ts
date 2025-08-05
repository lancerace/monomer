import { ConfluencyLevel } from '@/types';

export function getConfluencyLevel(percentage?: number): ConfluencyLevel {
  if (percentage === undefined) return 'no-data';
  
  if (percentage < 20) return 'very-low';
  if (percentage <= 60) return 'growing';
  if (percentage <= 90) return 'optimal';
  return 'over';
}

export function getConfluencyColor(level: ConfluencyLevel): string {
  const colorMap = {
    'very-low': 'bg-confluency-very-low border-green-200',
    'growing': 'bg-confluency-growing text-white border-green-600',
    'optimal': 'bg-confluency-optimal text-black border-yellow-400',
    'over': 'bg-confluency-over text-white border-red-700',
    'no-data': 'bg-confluency-no-data border-gray-300'
  };
  
  return colorMap[level];
}

export function getConfluencyDescription(level: ConfluencyLevel): string {
  const descriptionMap = {
    'very-low': 'Very Low Confluency',
    'growing': 'Growing Cells',
    'optimal': 'Ready for Passage',
    'over': 'Over-confluent',
    'no-data': 'No Data'
  };
  
  return descriptionMap[level];
}