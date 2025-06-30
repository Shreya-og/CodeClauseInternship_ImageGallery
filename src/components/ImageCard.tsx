import React, { useState } from 'react';
import { Eye, User } from 'lucide-react';
import { GalleryImage } from '../types/gallery';

interface ImageCardProps {
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02]"
      onClick={() => onClick(image)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={image.src}
          alt={image.alt}
          className={`
            w-full h-full object-cover transition-all duration-500
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
            {image.photographer && (
              <div className="flex items-center text-white/80 text-sm">
                <User size={14} className="mr-1" />
                <span>{image.photographer}</span>
              </div>
            )}
          </div>
          
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Eye size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full capitalize">
          {image.category}
        </span>
      </div>
      
      {/* Bottom section */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1">
          {image.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};