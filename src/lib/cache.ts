/**
 * cache.ts — Client-side caching utilities for Supabase data
 * 
 * Provides localStorage-based caching with TTL (time-to-live) support
 * to reduce unnecessary API calls for content that doesn't change often.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  version: string;
}

const CACHE_VERSION = '1.0'; // Increment this to invalidate all caches
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes default

export class ContentCache {
  /**
   * Get cached data if available and not expired
   */
  static get<T>(key: string, ttl: number = DEFAULT_TTL): T | null {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      
      // Check version
      if (entry.version !== CACHE_VERSION) {
        this.remove(key);
        return null;
      }

      // Check TTL
      const age = Date.now() - entry.timestamp;
      if (age > ttl) {
        this.remove(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  }

  /**
   * Set cached data
   */
  static set<T>(key: string, data: T): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        version: CACHE_VERSION,
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(entry));
    } catch (error) {
      console.error('Cache write error:', error);
      // If storage is full, clear old caches
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        this.clearOldest();
        // Try again
        try {
          const entry: CacheEntry<T> = {
            data,
            timestamp: Date.now(),
            version: CACHE_VERSION,
          };
          localStorage.setItem(`cache_${key}`, JSON.stringify(entry));
        } catch (retryError) {
          console.error('Cache write failed after cleanup:', retryError);
        }
      }
    }
  }

  /**
   * Remove specific cache entry
   */
  static remove(key: string): void {
    localStorage.removeItem(`cache_${key}`);
  }

  /**
   * Clear all caches
   */
  static clearAll(): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Clear oldest cache entries to free up space
   */
  static clearOldest(): void {
    const keys = Object.keys(localStorage);
    const cacheEntries: Array<{ key: string; timestamp: number }> = [];

    keys.forEach((key) => {
      if (key.startsWith('cache_')) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const entry = JSON.parse(item);
            cacheEntries.push({ key, timestamp: entry.timestamp || 0 });
          }
        } catch (error) {
          // Invalid entry, remove it
          localStorage.removeItem(key);
        }
      }
    });

    // Sort by timestamp (oldest first) and remove oldest 25%
    cacheEntries.sort((a, b) => a.timestamp - b.timestamp);
    const toRemove = Math.ceil(cacheEntries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      localStorage.removeItem(cacheEntries[i].key);
    }
  }

  /**
   * Get cache statistics
   */
  static getStats(): { count: number; size: number; oldestAge: number } {
    const keys = Object.keys(localStorage);
    let count = 0;
    let size = 0;
    let oldestTimestamp = Date.now();

    keys.forEach((key) => {
      if (key.startsWith('cache_')) {
        count++;
        const item = localStorage.getItem(key);
        if (item) {
          size += item.length;
          try {
            const entry = JSON.parse(item);
            if (entry.timestamp < oldestTimestamp) {
              oldestTimestamp = entry.timestamp;
            }
          } catch (error) {
            // Invalid entry
          }
        }
      }
    });

    return {
      count,
      size,
      oldestAge: count > 0 ? Date.now() - oldestTimestamp : 0,
    };
  }
}
