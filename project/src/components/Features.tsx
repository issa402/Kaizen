import React from 'react';
import { BookOpen, Target, Sparkles, BarChart3 } from 'lucide-react';

export function Features() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            High Value Improvements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            1% better every day compounds to 37.8x better in one year. This journal is designed to make
            this powerful concept work for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
            <BookOpen className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Structured Journaling
            </h3>
            <p className="text-gray-600">
              Proven templates to guide your daily reflection and growth
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
            <Target className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Goal Tracking
            </h3>
            <p className="text-gray-600">
              Set and track meaningful goals across all areas of life
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl">
            <Sparkles className="w-10 h-10 text-pink-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Daily Inspiration
            </h3>
            <p className="text-gray-600">
              Content to keep you motivated and focused
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-xl">
            <BarChart3 className="w-10 h-10 text-rose-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Progress Analytics
            </h3>
            <p className="text-gray-600">
              Visual insights into your growth and achievements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}