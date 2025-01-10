import React from 'react';
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react';

interface Stats {
  totalEntries: number;
  streak: number;
  topMood: string;
  completionRate: number;
}

export function DashboardStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100">Total Entries</p>
            <h3 className="text-3xl font-bold">{stats.totalEntries}</h3>
          </div>
          <BarChart3 className="w-8 h-8 opacity-75" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100">Current Streak</p>
            <h3 className="text-3xl font-bold">{stats.streak} days</h3>
          </div>
          <TrendingUp className="w-8 h-8 opacity-75" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-pink-100">Most Common Mood</p>
            <h3 className="text-3xl font-bold">{stats.topMood}</h3>
          </div>
          <Award className="w-8 h-8 opacity-75" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-100">Completion Rate</p>
            <h3 className="text-3xl font-bold">{stats.completionRate}%</h3>
          </div>
          <Target className="w-8 h-8 opacity-75" />
        </div>
      </div>
    </div>
  );
}