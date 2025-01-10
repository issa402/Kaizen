import { NewsItem } from '../types/news';

// More diverse fallback content
const FALLBACK_QUOTES = [
  {
    id: '1',
    title: 'Albert Einstein',
    content: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
    category: 'inspiration',
    source: 'Daily Wisdom',
    url: 'https://quotable.io',
    image_url: 'https://images.unsplash.com/photo-1509909756405-be0199881695',
    published_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Maya Angelou',
    content: 'Try to be a rainbow in someone\'s cloud.',
    category: 'inspiration',
    source: 'Daily Wisdom',
    url: 'https://quotable.io',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    published_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Walt Disney',
    content: 'All our dreams can come true if we have the courage to pursue them.',
    category: 'inspiration',
    source: 'Daily Wisdom',
    url: 'https://quotable.io',
    image_url: 'https://images.unsplash.com/photo-1536183922588-166604504d5e',
    published_at: new Date().toISOString()
  }
];

const FALLBACK_SUCCESS_STORIES = [
  {
    id: '1',
    title: 'From Garage to Global: The Story of Innovation',
    content: 'How a small startup became a game-changer in sustainable technology.',
    category: 'success',
    source: 'Success Daily',
    url: 'https://example.com/success-story',
    image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    published_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Breaking Through Barriers',
    content: 'A young entrepreneur\'s journey from local market to international success.',
    category: 'success',
    source: 'Success Daily',
    url: 'https://example.com/success-story-2',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    published_at: new Date().toISOString()
  }
];

const FALLBACK_MINDFULNESS = [
  {
    id: '1',
    title: 'The Power of Present Moment',
    content: 'Discovering peace and clarity through mindfulness practices.',
    category: 'dreams',
    source: 'Mindful Living',
    url: 'https://example.com/mindfulness',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    published_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Meditation for Better Living',
    content: 'Simple daily practices that can transform your mental well-being.',
    category: 'dreams',
    source: 'Mindful Living',
    url: 'https://example.com/mindfulness-2',
    image_url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88',
    published_at: new Date().toISOString()
  }
];

export async function fetchInspirationalNews(): Promise<NewsItem[]> {
  // Return fallback content immediately to ensure fast loading
  return [...FALLBACK_QUOTES, ...FALLBACK_SUCCESS_STORIES, ...FALLBACK_MINDFULNESS];
}