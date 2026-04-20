import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { X, Search, Upload, Image as ImageIcon, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  currentImageUrl?: string;
}

interface StorageImage {
  name: string;
  url: string;
  created_at: string;
  size: number;
}

// Cache for images to avoid re-fetching
const imageCache: { images: StorageImage[] | null; timestamp: number } = {
  images: null,
  timestamp: 0,
};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function ImageGalleryModal({
  isOpen,
  onClose,
  onSelectImage,
  currentImageUrl
}: ImageGalleryModalProps) {
  const [images, setImages] = useState<StorageImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const IMAGES_PER_PAGE = 20;

  // Update selected image when modal opens with new currentImageUrl
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(currentImageUrl || null);
      setPage(0); // Reset to first page
      loadImages();
    }
  }, [isOpen, currentImageUrl]);

  const loadImages = async () => {
    try {
      setLoading(true);
      
      // Check cache first
      const now = Date.now();
      if (imageCache.images && (now - imageCache.timestamp) < CACHE_DURATION) {
        setImages(imageCache.images);
        setLoading(false);
        return;
      }

      // List all files in the website-images bucket
      const { data, error } = await supabase.storage
        .from('website-images')
        .list('', {
          limit: 200, // Increased limit
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      // Get public URLs for all images
      const imagesWithUrls = data
        .filter(file => file.name !== '.emptyFolderPlaceholder') // Filter out placeholder files
        .map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from('website-images')
            .getPublicUrl(file.name);

          return {
            name: file.name,
            url: publicUrl,
            created_at: file.created_at || new Date().toISOString(),
            size: file.metadata?.size || 0
          };
        });

      // Update cache
      imageCache.images = imagesWithUrls;
      imageCache.timestamp = now;
      
      setImages(imagesWithUrls);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/jpg,image/png,image/webp';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        alert('Image too large! Please select an image under 5MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, WebP)');
        return;
      }

      try {
        setUploading(true);
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Upload to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from('website-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Reload gallery and invalidate cache
        imageCache.images = null; // Invalidate cache
        await loadImages();
        
        // Auto-select the newly uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('website-images')
          .getPublicUrl(fileName);
        setSelectedImage(publicUrl);
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setUploading(false);
      }
    };
    input.click();
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onSelectImage(selectedImage);
      onClose();
    }
  };

  // Memoize filtered and paginated images
  const { paginatedImages, totalPages } = useMemo(() => {
    const filtered = images.filter(img => 
      img.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const start = page * IMAGES_PER_PAGE;
    const end = start + IMAGES_PER_PAGE;
    const paginated = filtered.slice(start, end);
    const total = Math.ceil(filtered.length / IMAGES_PER_PAGE);
    
    return { paginatedImages: paginated, totalPages: total };
  }, [images, searchQuery, page]);

  // Reset to page 0 when search changes
  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-heading font-bold text-[var(--color-text-main)]">Image Gallery</h2>
              <p className="text-sm text-gray-600">Select an existing image or upload a new one</p>
            </div>
            <button 
              onClick={onClose}
              className="h-10 w-10 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search and Upload */}
          <p className="text-sm text-gray-400 mb-2 text-center">
            💡 For better performance, compress images before uploading with{' '}
            <a href="https://squoosh.app/" target="_blank" rel="noreferrer" className="text-[var(--color-green-5)] underline hover:text-[var(--color-green-4)]">Squoosh</a>.
          </p>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 bg-white focus:ring-2 focus:ring-[var(--color-green-5)]/20 focus:border-[var(--color-green-5)] outline-none"
              />
            </div>
            <button 
              onClick={handleFileSelect}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-all disabled:opacity-50"
            >
              <Upload size={18} />
              {uploading ? 'Uploading...' : 'Upload New'}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[var(--color-green-5)] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading images...</p>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ImageIcon size={64} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-2">
                {searchQuery ? 'No images found' : 'No images yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try a different search term' : 'Upload your first image to get started'}
              </p>
              {!searchQuery && (
                <button 
                  onClick={handleFileSelect}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-all"
                >
                  <Upload size={18} />
                  Upload Image
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedImages.map((image) => {
                  const isSelected = selectedImage === image.url;
                  const isCurrent = currentImageUrl === image.url;
                  
                  return (
                    <div
                      key={image.name}
                      onClick={() => handleImageClick(image.url)}
                      className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                        isSelected
                          ? 'ring-4 ring-[var(--color-green-5)] shadow-lg scale-105'
                          : 'ring-2 ring-gray-200 hover:ring-[var(--color-green-5)]/50 hover:scale-102'
                      }`}
                    >
                      <img 
                        src={image.url} 
                        alt={image.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white text-center px-2">
                          <p className="text-xs font-semibold truncate">{image.name}</p>
                          <p className="text-xs mt-1">
                            {new Date(image.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 h-8 w-8 bg-[var(--color-green-5)] rounded-full flex items-center justify-center shadow-lg">
                          <Check className="text-white" size={16} />
                        </div>
                      )}

                      {/* Current image indicator */}
                      {isCurrent && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 rounded-md text-white text-xs font-semibold">
                          Current
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <span className="text-sm font-semibold text-gray-700">
                    Page {page + 1} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    title="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {images.length} {images.length === 1 ? 'image' : 'images'} total
            {searchQuery && paginatedImages.length !== images.length && (
              <span className="ml-2">• {paginatedImages.length} matching</span>
            )}
            {selectedImage && (
              <span className="ml-2 text-[var(--color-green-5)] font-semibold">• 1 selected</span>
            )}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 rounded-lg border-2 border-gray-200 bg-white font-semibold text-gray-600 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              disabled={!selectedImage}
              className="px-6 py-2 bg-[var(--color-green-5)] text-white rounded-lg font-semibold hover:bg-[var(--color-green-4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Use Selected Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
