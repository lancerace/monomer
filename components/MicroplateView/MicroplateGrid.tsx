import { WellData } from '@/types';
import { DateDisplay } from '../DateDisplay';
import { getConfluencyLevel, getConfluencyColor, getConfluencyDescription } from '@/utils/confluency';

interface MicroplateGridProps {
  microplateData: WellData[];
}

const MicroplateGrid = ({ microplateData }: MicroplateGridProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Microplate View
      </h3>
      
      {/* Column Headers */}
      <div className="grid grid-cols-4 gap-6 mb-4">
        <div></div> {/* Empty corner */}
        {[1, 2, 3].map((column) => (
          <div key={column} className="text-center font-bold text-gray-700 text-lg">
            {column}
          </div>
        ))}
      </div>

      {/* Microplate Wells */}
      <div className="grid grid-cols-4 gap-6">
        {['A', 'B'].map((row) => (
          <div key={row} className="contents">
            {/* Row Header */}
            <div className="flex items-center justify-center font-bold text-gray-700 text-lg">
              {row}
            </div>
            
            {/* Wells for this row */}
            {[1, 2, 3].map((column) => {
              const well = microplateData.find(w => w.row === row && w.column === column);
              const confluencyLevel = getConfluencyLevel(well?.latestConfluency);
              const colorClass = getConfluencyColor(confluencyLevel);
              const description = getConfluencyDescription(confluencyLevel);
              
              return (
                <div
                  key={`${row}${column}`}
                  className={`
                    relative w-28 h-28 rounded-full border-3 shadow-lg
                    flex flex-col items-center justify-center
                    transition-all duration-300 hover:scale-110 hover:shadow-xl hover:z-10
                    cursor-pointer group
                    ${colorClass}
                  `}
                >
                  <div className="text-sm font-bold text-gray-800">
                    {well?.latestConfluency !== undefined 
                      ? `${well.latestConfluency.toFixed(1)}%` 
                      : 'No Data'
                    }
                  </div>
                  <div className="text-xs font-semibold text-gray-600">
                    {row}{column}
                  </div>
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm rounded-lg py-2 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 shadow-xl">
                    <div className="font-semibold">{description}</div>
                    {well?.lastUpdated && (
                      <div className="text-xs text-gray-300 mt-1">
                        Updated: <DateDisplay date={well.lastUpdated} format="date" />
                      </div>
                    )}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MicroplateGrid;