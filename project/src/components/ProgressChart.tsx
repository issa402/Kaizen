import React from 'react';

interface ChartData {
  spiritual: number;
  mental: number;
  physical: number;
}

export function ProgressChart({ data }: { data: ChartData }) {
  const maxValue = Math.max(data.spiritual, data.mental, data.physical);
  const getHeight = (value: number) => (value / maxValue) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-6">Weekly Progress</h3>
      <div className="flex items-end justify-around h-48 gap-4">
        <div className="flex flex-col items-center w-1/3">
          <div 
            className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg"
            style={{ height: `${getHeight(data.spiritual)}%` }}
          />
          <p className="mt-2 text-sm font-medium text-gray-600">Spiritual</p>
          <p className="text-indigo-600 font-semibold">{data.spiritual}%</p>
        </div>
        
        <div className="flex flex-col items-center w-1/3">
          <div 
            className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg"
            style={{ height: `${getHeight(data.mental)}%` }}
          />
          <p className="mt-2 text-sm font-medium text-gray-600">Mental</p>
          <p className="text-purple-600 font-semibold">{data.mental}%</p>
        </div>
        
        <div className="flex flex-col items-center w-1/3">
          <div 
            className="w-full bg-gradient-to-t from-pink-500 to-pink-300 rounded-t-lg"
            style={{ height: `${getHeight(data.physical)}%` }}
          />
          <p className="mt-2 text-sm font-medium text-gray-600">Physical</p>
          <p className="text-pink-600 font-semibold">{data.physical}%</p>
        </div>
      </div>
    </div>
  );
}