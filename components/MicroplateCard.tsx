'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MicroplateWithMeasurements } from '@/types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { formatDate, formatDateTime } from '@/utils/dateFormat';
import { DateDisplay } from './DateDisplay';

interface MicroplateCardProps {
  plate: MicroplateWithMeasurements;
}

export function MicroplateCard({ plate }: MicroplateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">
          {plate.name}
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <div className="mb-4 space-y-2">
        {/* Plate ID - Always visible but expandable */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Plate ID:</span>{' '}
          <span className={`${isExpanded ? 'break-all' : 'truncate block'}`}>
            {plate.id}
          </span>
        </div>

        {/* Basic info always visible */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Created:</span>{' '}
          <DateDisplay date={plate.createdAt} format="date" />
        </div>
        
        <div className="text-sm text-gray-600">
          <span className="font-medium">Measurements:</span>{' '}
          {plate.measurements?.length || 0}
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Last Updated:</span>{' '}
              {plate.updatedAt ? (
                <DateDisplay date={plate.updatedAt} format="datetime" />
              ) : (
                'Never'
              )}
            </div>
            
            {plate.measurements && plate.measurements.length > 0 && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Latest Measurement:</span>{' '}
                <DateDisplay date={plate.measurements[0].timestamp} format="datetime" />
              </div>
            )}
            
            <div className="text-sm text-gray-600">
              <span className="font-medium">Wells:</span> 2 rows × 3 columns (6 total)
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex space-x-3">
        <Link
          href={`/microplate/${plate.id}`}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          View Microplate
        </Link>
      </div>
    </div>
  );
}