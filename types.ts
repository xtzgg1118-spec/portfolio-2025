export interface Project {
  id: number;
  title: string;
  category: string;
  coverImage: string;
  images: string[];
  description: string;
  year: string;
  client?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  type: 'page' | 'link';
  content?: {
    title: string;
    body: string;
  };
}