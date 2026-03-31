# Image Gallery System

## Overview
The HFHGC website now includes a centralized image gallery system that prevents duplicate uploads and manages all website images through Supabase Storage.

## Features

### 🖼️ **Centralized Image Storage**
- All images are stored in the `website-images` Supabase Storage bucket
- Public access for viewing, admin-only for uploads/deletes
- Prevents CDN waste from duplicate uploads

### 🔍 **Image Gallery Modal**
- Browse all uploaded images in a visual grid
- Search images by filename
- Preview images before selection
- See current image indicator
- Upload new images directly from the modal

### ⚡ **Auto-Detection**
The image gallery automatically appears for any form field that:
- Has a key containing "image" (e.g., `image_url`, `profile_image`, `header_image`)
- Is of type `url` or has no specific type

### 🎯 **How to Use**

#### For Admins:
1. Navigate to any admin edit page (Home, About, Team, Projects, etc.)
2. Find any image URL field
3. Click the **"Gallery"** button next to the input
4. Either:
   - **Select an existing image** from the gallery
   - **Upload a new image** if none match your needs
5. Click "Use Selected Image"

#### Image Field Examples:
- Hero images (Home page)
- Team member photos
- Project images
- Partner logos
- Event photos
- Blog post headers

## Technical Details

### Component Location
- **Component**: `src/components/ImageGallery.tsx`
- **Integration**: `src/components/AdminUI.tsx` (FormField component)

### Storage Configuration
- **Bucket**: `website-images`
- **Access**: Public read, admin-only write/delete
- **Max Size**: 5MB per image
- **Formats**: JPEG, JPG, PNG, WebP

### RLS Policies
```sql
-- Admin can upload
CREATE POLICY "Admin upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'website-images' AND is_admin());

-- Admin can update
CREATE POLICY "Admin update" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'website-images' AND is_admin());

-- Admin can delete
CREATE POLICY "Admin delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'website-images' AND is_admin());

-- Public can read
CREATE POLICY "Public read images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'website-images');
```

### File Naming
Images are automatically renamed on upload:
```
{timestamp}-{random}.{extension}
Example: 1709208340123-abc7def.jpg
```

## Benefits

✅ **No Duplicate Uploads** - Reuse existing images across multiple pages
✅ **Centralized Management** - All images in one place
✅ **Consistent URLs** - Supabase CDN ensures fast loading
✅ **Storage Efficiency** - Prevents wasted storage space
✅ **Easy Discovery** - Search and browse all uploaded images
✅ **Admin Control** - Only admins can upload/delete images

## Future Enhancements

Potential improvements:
- Image cropping/resizing
- Bulk upload
- Image categorization/tags
- Usage tracking (which images are used where)
- Automatic image optimization
- Delete unused images feature

## Troubleshooting

### Images not loading?
- Check Supabase storage bucket is public
- Verify RLS policies are enabled
- Ensure admin is authenticated

### Upload fails?
- Check file size (max 5MB)
- Verify file format (JPEG, PNG, WebP only)
- Confirm admin authentication
- Check browser console for errors

### Gallery is empty?
- Upload your first image using the "Upload New" button
- Check Supabase dashboard for bucket contents
- Verify bucket name is `website-images`
