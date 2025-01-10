import React, { useState } from 'react';
import { useNews } from '../hooks/useNews';
import { NewsWidget } from '../components/NewsWidget';
import { Sparkles, Quote, Trophy, Brain, Filter } from 'lucide-react';

export default function InspirationFeed() {
  const { news, loading, error } = useNews();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const quotes = news.filter(item => item.category === 'inspiration');
  const success = news.filter(item => item.category === 'success');
  const mindfulness = news.filter(item => item.category === 'dreams');

  const categories = [
    { id: 'inspiration', name: 'Daily Quotes', icon: Quote },
    { id: 'success', name: 'Success Stories', icon: Trophy },
    { id: 'dreams', name: 'Mindfulness & Growth', icon: Brain }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Daily Inspiration</h1>
          </div>
          
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(!selectedCategory || selectedCategory === 'inspiration') && (
            <NewsWidget
              title="Daily Quotes"
              icon={Quote}
              loading={loading}
              items={quotes}
            />
          )}
          
          {(!selectedCategory || selectedCategory === 'success') && (
            <NewsWidget
              title="Success Stories"
              icon={Trophy}
              loading={loading}
              items={success}
            />
          )}
          
          {(!selectedCategory || selectedCategory === 'dreams') && (
            <NewsWidget
              title="Mindfulness & Growth"
              icon={Brain}
              loading={loading}
              items={mindfulness}
            />
          )}
        </div>
      </div>
    </div>
  );
}