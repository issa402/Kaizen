export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'success' | 'inspiration' | 'dreams';
  source: string;
  url: string;
  image_url?: string;
  published_at: string;
}