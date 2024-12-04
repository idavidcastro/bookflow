export interface Book {
  id: number;
  title: string;
  author: string;
  genre_id: string; //género
  description: string;
  published_date: string;
  isbn: string;
  pages: number;
  language: string;
  publisher: string; //editorial
  available: boolean; //estado
  available_count: number; //stock
  photo: string;
}
