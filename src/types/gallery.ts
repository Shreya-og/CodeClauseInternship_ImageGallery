export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  tags: string[];
  title: string;
}

export type FilterCategory = 'all' | 'nature' | 'architecture' | 'technology' | 'people' | 'ghibli';