/**
 * useSupabase.ts — Generic CRUD hooks for every table.
 *
 * useFetch<T>(table, options?)     → { data, loading, error, refetch }
 * useUpsert<T>(table)              → { upsert, loading, error }
 * useDelete(table)                 → { remove, loading, error }
 * useSettings()                    → { settings, loading, update, refetch }
 *
 * All hooks talk directly to the public Supabase client.
 * Now includes caching support for better performance.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { ContentCache } from '../lib/cache';

/* ─── Generic Fetch ─── */
interface FetchOptions {
  order?: { column: string; ascending?: boolean };
  filter?: Record<string, any>;
  eq?: [string, any][];
  single?: boolean;
  cache?: boolean; // Enable caching
  cacheTTL?: number; // Cache time-to-live in milliseconds
}

export function useFetch<T = any>(table: string, options?: FetchOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate cache key based on table and options
  const getCacheKey = () => {
    const optionsStr = options ? JSON.stringify(options) : '';
    return `${table}_${optionsStr}`;
  };

  const refetch = useCallback(async (skipCache = false) => {
    setLoading(true);
    setError(null);
    
    const cacheKey = getCacheKey();
    const shouldUseCache = options?.cache !== false && !skipCache;

    // Try to get from cache first
    if (shouldUseCache) {
      const cached = ContentCache.get<T[]>(cacheKey, options?.cacheTTL);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
    }

    try {
      let query = supabase.from(table).select('*');

      if (options?.eq) {
        for (const [col, val] of options.eq) {
          query = query.eq(col, val);
        }
      }

      if (options?.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
      }

      if (options?.single) {
        const { data: row, error: err } = await query.single();
        if (err) throw err;
        const result = row ? [row as T] : [];
        setData(result);
        if (shouldUseCache) ContentCache.set(cacheKey, result);
      } else {
        const { data: rows, error: err } = await query;
        if (err) throw err;
        const result = (rows ?? []) as T[];
        setData(result);
        if (shouldUseCache) ContentCache.set(cacheKey, result);
      }
    } catch (e: any) {
      setError(e.message || 'Failed to fetch data');
      console.error(`useFetch(${table}):`, e);
    } finally {
      setLoading(false);
    }
  }, [table, JSON.stringify(options)]);

  useEffect(() => { refetch(); }, [refetch]);

  // Return refetch with option to skip cache
  return { 
    data, 
    loading, 
    error, 
    refetch: (skipCache = false) => refetch(skipCache) 
  };
}

/* ─── Single-row fetch (about_page, home_hero) ─── */
export function useFetchSingle<T = any>(table: string, cacheTTL?: number) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (skipCache = false) => {
    setLoading(true);
    setError(null);

    const cacheKey = `${table}_single`;

    // Try cache first
    if (!skipCache && cacheTTL) {
      const cached = ContentCache.get<T>(cacheKey, cacheTTL);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
    }

    try {
      const { data: rows, error: err } = await supabase.from(table).select('*').limit(1);
      if (err) throw err;
      const result = rows && rows.length > 0 ? (rows[0] as T) : null;
      setData(result);
      if (cacheTTL && result) ContentCache.set(cacheKey, result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [table, cacheTTL]);

  useEffect(() => { refetch(); }, [refetch]);
  return { 
    data, 
    loading, 
    error, 
    refetch: (skipCache = false) => refetch(skipCache) 
  };
}

/* ─── Generic Upsert ─── */
export function useUpsert<T = any>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upsert = async (row: Partial<T>, onConflict?: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from(table)
        .upsert(row as any, onConflict ? { onConflict } : undefined)
        .select()
        .single();
      if (err) throw err;
      
      // Invalidate cache for this table
      ContentCache.remove(`${table}_single`);
      // Also clear any list caches for this table
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(`cache_${table}_`)) {
          localStorage.removeItem(key);
        }
      });
      
      return data as T;
    } catch (e: any) {
      setError(e.message);
      console.error(`useUpsert(${table}):`, e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { upsert, loading, error };
}

/* ─── Generic Insert ─── */
export function useInsert<T = any>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insert = async (row: Partial<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from(table)
        .insert(row as any)
        .select()
        .single();
      if (err) throw err;
      
      // Invalidate cache for this table
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(`cache_${table}_`)) {
          localStorage.removeItem(key);
        }
      });
      
      return data as T;
    } catch (e: any) {
      setError(e.message);
      console.error(`useInsert(${table}):`, e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { insert, loading, error };
}

/* ─── Generic Update ─── */
export function useUpdate<T = any>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, fields: Partial<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from(table)
        .update(fields as any)
        .eq('id', id)
        .select()
        .single();
      if (err) throw err;
      
      // Invalidate cache for this table
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(`cache_${table}_`)) {
          localStorage.removeItem(key);
        }
      });
      
      return data as T;
    } catch (e: any) {
      setError(e.message);
      console.error(`useUpdate(${table}):`, e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}

/* ─── Generic Delete ─── */
export function useDelete(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase.from(table).delete().eq('id', id);
      if (err) throw err;
      
      // Invalidate cache for this table
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(`cache_${table}_`)) {
          localStorage.removeItem(key);
        }
      });
      
      return true;
    } catch (e: any) {
      setError(e.message);
      console.error(`useDelete(${table}):`, e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}

/* ─── Site Settings (key-value) ─── */
export function useSettings() {
  const { data: rows, loading, error, refetch } = useFetch<{ id: string; key: string; value: string }>('site_settings');

  const settings: Record<string, string> = {};
  for (const r of rows) settings[r.key] = r.value;

  const updateSetting = async (key: string, value: string) => {
    try {
      // First, try to find if the setting exists
      const { data: existing, error: fetchError } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', key)
        .maybeSingle();

      if (fetchError) {
        console.error('Error checking existing setting:', fetchError);
        return false;
      }

      if (existing) {
        // Setting exists, update it
        const { error: updateError } = await supabase
          .from('site_settings')
          .update({ value })
          .eq('key', key);
        
        if (updateError) {
          console.error('Error updating setting:', updateError);
          return false;
        }
      } else {
        // Setting doesn't exist, insert it
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert({ key, value });
        
        if (insertError) {
          console.error('Error inserting setting:', insertError);
          return false;
        }
      }
      
      return true;
    } catch (e) {
      console.error('updateSetting exception:', e);
      return false;
    }
  };

  const updateAll = async (pairs: Record<string, string>) => {
    try {
      const promises = Object.entries(pairs).map(([k, v]) => updateSetting(k, v));
      const results = await Promise.all(promises);
      await refetch();
      return results.every(Boolean);
    } catch (e) {
      console.error('updateAll error:', e);
      return false;
    }
  };

  return { settings, loading, error, refetch, updateSetting, updateAll };
}
