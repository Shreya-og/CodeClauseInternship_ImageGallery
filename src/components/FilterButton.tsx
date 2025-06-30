import React from 'react';
import { FilterCategory } from '../types/gallery';

interface FilterButtonProps {
  category: FilterCategory;
  isActive: boolean;
  onClick: (category: FilterCategory) => void;
  count: number;
}

const categoryLabels: Record<FilterCategory, string> = {
  all: 'All',
  nature: 'Nature',
  architecture: 'Architecture',
  technology: 'Technology',
  people: 'People',
  ghibli: 'Ghibli'
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  category,
  isActive,
  onClick,
  count
}) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`
        px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out
        border border-gray-200 hover:border-gray-300
        ${isActive 
          ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
          : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
        }
        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20
        transform hover:scale-105 active:scale-95
      `}
    >
      <span className="flex items-center space-x-2">
        <span>{categoryLabels[category]}</span>
        <span className={`
          text-xs px-2 py-1 rounded-full
          ${isActive 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-100 text-gray-500'
          }
        `}>
          {count}
        </span>
      </span>
    </button>
  );
};