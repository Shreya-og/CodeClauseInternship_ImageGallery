import React, { useState, useMemo } from 'react';
import { Camera } from 'lucide-react';
import { galleryImages } from './data/images';
import { FilterCategory, GalleryImage } from './types/gallery';
import { FilterButton } from './components/FilterButton';
import { ImageCard } from './components/ImageCard';
import { Lightbox } from './components/Lightbox';
import { SearchBar } from './components/SearchBar';

function App() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter images based on category and search term
  const filteredImages = useMemo(() => {
    let filtered = galleryImages;

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(image => image.category === activeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(image =>
        image.title.toLowerCase().includes(searchLower) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        image.alt.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [activeFilter, searchTerm]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: galleryImages.length,
      nature: 0,
      architecture: 0,
      technology: 0,
      people: 0,
      ghibli: 0
    };

    galleryImages.forEach(image => {
      counts[image.category as FilterCategory]++;
    });

    return counts;
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const categories: FilterCategory[] = ['all', 'nature', 'architecture', 'technology', 'people', 'ghibli'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gray-900 rounded-xl">
                <Camera size={32} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Gallery</h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our curated collection of professional photography across various categories
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <FilterButton
                key={category}
                category={category}
                isActive={activeFilter === category}
                onClick={setActiveFilter}
                count={categoryCounts[category]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="text-center">
          <p className="text-gray-600">
            Showing {filteredImages.length} of {galleryImages.length} images
            {searchTerm && (
              <span className="ml-2">
                for "<span className="font-medium">{searchTerm}</span>"
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Image Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onClick={handleImageClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Camera size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">
              {searchTerm
                ? `No images match your search "${searchTerm}"`
                : `No images in the ${activeFilter} category`}
            </p>
          </div>
        )}
      </main>

      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        images={filteredImages}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

export default App;