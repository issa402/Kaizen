import React from 'react';
import { NewsCard } from './NewsCard';
import type { NewsItem } from '../types/news';
import type { LucideIcon } from 'lucide-react';

interface NewsWidgetProps {
  title: string;
  icon: LucideIcon;
  loading: boolean;
  items: NewsItem[];
}

export function NewsWidget({ title, icon: Icon, loading, items }: NewsWidgetProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No articles available at the moment
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <NewsCard item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}