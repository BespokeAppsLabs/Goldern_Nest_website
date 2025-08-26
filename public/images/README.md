# Images Directory

This directory is for storing static images used in the Golden Nest Poultry website.

## Current Images

The website currently uses Unsplash images for demonstration purposes. For production, you should replace these with actual farm and product photos.

## Image Structure

```
public/images/
├── README.md
├── eggs.jpg              # Fresh eggs image
├── broilers.jpg          # Broiler chickens image
├── layers.jpg            # Layer chickens image
├── farm1.jpg             # Farm operations
├── farm2.jpg             # Quality control
├── farm3.jpg             # Healthy chickens
└── logo/                 # Company branding
    ├── logo.svg
    └── favicon.ico
```

## Image Requirements

### Format
- **JPG/JPEG** - For photographs and complex images
- **PNG** - For images requiring transparency
- **SVG** - For logos and simple graphics
- **WebP** - Modern format with better compression

### Dimensions
- **Hero Images**: 1200x800px minimum
- **Product Images**: 800x600px minimum
- **Gallery Images**: 1200x800px minimum
- **Thumbnails**: 400x300px

### Optimization
- Compress images for web (under 500KB recommended)
- Use appropriate formats for content type
- Consider responsive images for different screen sizes
- Add descriptive alt text for accessibility

## Current Implementation

The website uses these placeholder images from Unsplash:
- Eggs: `https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f`
- Broilers: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64`
- Layers: `https://images.unsplash.com/photo-1578662996442-48f60103fc96`

## Replacing Images

1. **Add New Images**: Place your images in this directory
2. **Update Components**: Modify the image paths in relevant components
3. **Optimize**: Ensure images are web-optimized
4. **Test**: Verify images display correctly on all devices

## SEO Considerations

- Use descriptive filenames (e.g., `fresh-eggs-golden-nest.jpg`)
- Include alt text for all images
- Consider image sitemaps for large galleries
- Optimize image loading with Next.js Image component
