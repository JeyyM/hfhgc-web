import imageCompression from 'browser-image-compression';

/** Long edge cap keeps detail sharp on retina while shrinking huge camera photos. */
const MAX_EDGE_PX = 2560;

/** JPEG/WebP quality — high enough that artifacts are rarely visible on the web. */
const LOSSY_QUALITY = 0.92;

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '—';
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export interface OptimizeImageResult {
  file: File;
  originalBytes: number;
  outputBytes: number;
  /** Whole-number percent smaller than original (0 if nothing was saved). */
  reductionPercent: number;
}

function preferOriginalIfBarelySmaller(original: File, processed: File): File {
  if (processed.size >= original.size * 0.98) return original;
  return processed;
}

/**
 * Resize very large PNGs (preserves transparency) without JPEG conversion.
 */
async function downscalePngMaxEdge(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  try {
    let w = bitmap.width;
    let h = bitmap.height;
    if (w <= MAX_EDGE_PX && h <= MAX_EDGE_PX) return file;

    const scale = Math.min(MAX_EDGE_PX / w, MAX_EDGE_PX / h);
    w = Math.round(w * scale);
    h = Math.round(h * scale);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, 0, 0, w, h);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png');
    });
    if (!blob) return file;

    const base = file.name.replace(/\.[^.]+$/i, '') || 'image';
    return new File([blob], `${base}.png`, { type: 'image/png', lastModified: Date.now() });
  } finally {
    bitmap.close();
  }
}

export async function optimizeImageForWeb(file: File): Promise<OptimizeImageResult> {
  const originalBytes = file.size;
  let processed: File;

  const isLossy =
    file.type === 'image/jpeg' ||
    file.type === 'image/jpg' ||
    file.type === 'image/webp';

  if (isLossy) {
    const out = await imageCompression(file, {
      maxWidthOrHeight: MAX_EDGE_PX,
      maxSizeMB: 24,
      useWebWorker: true,
      initialQuality: LOSSY_QUALITY,
      fileType: file.type,
    });
    processed = preferOriginalIfBarelySmaller(file, out);
  } else if (file.type === 'image/png') {
    try {
      const out = await imageCompression(file, {
        maxWidthOrHeight: MAX_EDGE_PX,
        maxSizeMB: 24,
        useWebWorker: true,
        fileType: 'image/png',
        initialQuality: 1,
      });
      processed = preferOriginalIfBarelySmaller(file, out);
    } catch {
      processed = preferOriginalIfBarelySmaller(file, await downscalePngMaxEdge(file));
    }
  } else {
    processed = file;
  }

  const outputBytes = processed.size;
  const reductionPercent =
    originalBytes > outputBytes
      ? Math.round(((originalBytes - outputBytes) / originalBytes) * 100)
      : 0;

  return {
    file: processed,
    originalBytes,
    outputBytes,
    reductionPercent,
  };
}
