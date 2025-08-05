import Link from 'next/link';
import type { MicroplateWithMeasurements } from '@/types';
import { useMicroplate } from './microplateView.hooks';
import MicroplateGrid from './MicroplateGrid';
import Header from './Header';
import Legend from './Legend';

interface MicroplateViewProps {
  microplate: MicroplateWithMeasurements;
}

export default function MicroplateView({ microplate }: MicroplateViewProps) {
  const { getters } = useMicroplate({ microplate });
  const { microplateData } = getters;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative py-8">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <Header microplate={microplate} />
            </div>
            
            {/* Content Section */}
            <div className="p-8 space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <MicroplateGrid microplateData={microplateData} />
              </div>
              <Legend />
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ready to Update?
              </h3>
              <p className="text-gray-600 mb-6">
                Record new confluency measurements for your microplate wells
              </p>
              <Link
                href={`/measurement/${microplate.id}`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Update Measurements
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}