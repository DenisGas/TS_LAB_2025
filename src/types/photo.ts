export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  localUrl?: string; // Опціональна властивість для локальної URL
}