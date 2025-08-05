import Link from 'next/link';

interface ActionButtonProps {
  microplateId: string;
}

const ActionButton = ({ microplateId }: ActionButtonProps) => {
  return (
    <div className="flex justify-center space-x-4">
      <Link
        href={`/measurement/${microplateId}`}
        className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      >
        <svg 
          className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </svg>
        Update Measurements
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg blur-sm opacity-0 group-hover:opacity-25 transition-opacity duration-200 -z-10"></div>
      </Link>
    </div>
  );
};

export default ActionButton;