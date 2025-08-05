import { MicroplateWithMeasurements } from "@/types";
import { prisma } from "@/lib/prisma";
import { MicroplateCard } from "../components/MicroplateCard";

async function getMicroplates(): Promise<MicroplateWithMeasurements[]> {
  const microplates = await prisma.microplate.findMany({
    include: {
      measurements: {
        orderBy: { timestamp: "desc" },
      },
    },
  });

  return microplates;
}

export default async function Home() {
  const microplates = await getMicroplates();


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Culture Confluency Tracker
            </h1>
            <p className="text-gray-500">
              Select a microplate to monitor cell growth and confluency
            </p>
          </div>

          {/* Microplates List */}
          {microplates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No microplates found</div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {microplates.map((plate) => (
                <MicroplateCard key={plate.id+"_microplateCard"} plate={plate} />
              ))}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Getting Started
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                • Each microplate represents a 6-well culture plate (2 rows × 3
                columns)
              </p>
              <p>
                • Click "View Plate" to see the current confluency status of all
                wells
              </p>
            
              <p>
                • Wells are color-coded based on confluency levels for quick
                visual assessment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
