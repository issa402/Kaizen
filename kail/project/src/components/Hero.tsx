import React from 'react';
import { TrendingUp, Brain, Heart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] bg-cover bg-center opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Improve 1% Every Day Low Key on The Low
            <span className="block text-indigo-200 mt-2"> With Kaizen Journal</span>
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join for calm results through small, daily improvements.
            The #1 journal for continuous self-improvement.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-indigo-50 transition-colors"
          >
            Start Your Journey
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-indigo-100">
                Visualize your growth with intuitive analytics and progress tracking
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
              <Brain className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
              <h3 className="text-xl font-semibold mb-2">Daily Insights</h3>
              <p className="text-indigo-100">
                Gain powerful insights into your patterns and behaviors
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg">
              <Heart className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
              <h3 className="text-xl font-semibold mb-2">Holistic Growth</h3>
              <p className="text-indigo-100">
                Balance spiritual, mental, and physical well-being
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}