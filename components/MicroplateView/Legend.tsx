interface LegendItem {
  color: string;
  border: string;
  label: string;
}

const Legend = () => {
  const legendItems: LegendItem[] = [
    {
      color: "bg-confluency-very-low",
      border: "border-green-200",
      label: "< 20% Very Low"
    },
    {
      color: "bg-confluency-growing",
      border: "border-green-600",
      label: "20-60% Growing"
    },
    {
      color: "bg-confluency-optimal",
      border: "border-yellow-400",
      label: "60-90% Optimal"
    },
    {
      color: "bg-confluency-over",
      border: "border-red-700",
      label: "> 90% Over-confluent"
    },
    {
      color: "bg-confluency-no-data",
      border: "border-gray-300",
      label: "No Data"
    }
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-8">
      <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Confluency Levels
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
            <div className={`w-5 h-5 ${item.color} border-2 ${item.border} rounded-md shadow-sm`}></div>
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;