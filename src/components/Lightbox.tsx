import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, User, Tag } from 'lucide-react';
import { GalleryImage } from '../types/gallery';

interface LightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  image,
  images,
  onClose,
  onNext,
  onPrevious
}) => {
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrevious();
      };
      
      document.addEventListener('keydown', handleKeyPress);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [image, onClose, onNext, onPrevious]);

  if (!image) return null;

  const currentIndex = images.findIndex(img => img.id === image.id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Navigation buttons */}
      {!isFirst && (
        <button
          onClick={onPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {!isLast && (
        <button
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Main content */}
      <div className="max-w-6xl max-h-full flex flex-col lg:flex-row gap-6 w-full">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Info panel */}
        <div className="lg:w-80 bg-white/95 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{image.title}</h2>
            <p className="text-gray-600 text-sm">{image.alt}</p>
          </div>

          {image.photographer && (
            <div className="flex items-center text-gray-700">
              <User size={16} className="mr-2" />
              <span className="text-sm">by {image.photographer}</span>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <Tag size={16} className="mr-2" />
              <span className="text-sm font-medium">Category</span>
            </div>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full capitalize">
              {image.category}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Tags</p>
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Image {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};