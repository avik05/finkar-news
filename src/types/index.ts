export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  summary: string;
  category: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
}
