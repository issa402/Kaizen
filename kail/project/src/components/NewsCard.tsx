import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { NewsItem } from '../types/news';
import { format } from 'date-fns';

const categoryColors = {
  success: 'bg-green-100 text-green-800',
  inspiration: 'bg-purple-100 text-purple-800',
  dreams: 'bg-blue-100 text-blue-800'
};

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a 
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1"
    >
      {item.image_url && (
        <img 
          src={item.image_url} 
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
            {item.category}
          </span>
          <span className="text-sm text-gray-500">
            {format(new Date(item.published_at), 'MMM d, yyyy')}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.content}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {item.source}
          </span>
          <span className="inline-flex items-center text-indigo-600">
            Read more
            <ExternalLink className="w-4 h-4 ml-1" />
          </span>
        </div>
      </div>
    </a>
  );
}