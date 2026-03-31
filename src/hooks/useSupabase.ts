/**
 * useSupabase.ts — Generic CRUD hooks for every table.
 *
 * useFetch<T>(table, options?)     → { data, loading, error, refetch }
 * useUpsert<T>(table)              → { upsert, loading, error }
 * useDelete(table)                 → { remove, loading, error }
 * useSettings()                    → { settings, loading, update, refetch }
 *
 * All hooks talk directly to the public Supabase client.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

/* ─── Generic Fetch ─── */
interface FetchOptions {
  order?: { column: string; ascending?: boolean };
  filter?: Record<string, any>;
  eq?: [string, any][];
  single?: boolean;
}

export function useFetch<T = any>(table: string, options?: FetchOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
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
        setData(row ? [row as T] : []);
      } else {
        const { data: rows, error: err } = await query;
        if (err) throw err;
        setData((rows ?? []) as T[]);
      }
    } catch (e: any) {
      setError(e.message || 'Failed to fetch data');
      console.error(`useFetch(${table}):`, e);
    } finally {
      setLoading(false);
    }
  }, [table, JSON.stringify(options)]);

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch };
}

/* ─── Single-row fetch (about_page, home_hero) ─── */
export function useFetchSingle<T = any>(table: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: rows, error: err } = await supabase.from(table).select('*').limit(1);
      if (err) throw err;
      setData(rows && rows.length > 0 ? (rows[0] as T) : null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [table]);

  useEffect(() => { refetch(); }, [refetch]);
  return { data, loading, error, refetch };
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
    const { error } = await supabase
      .from('site_settings')
      .update({ value })
      .eq('key', key);
    if (error) console.error('updateSetting:', error);
    return !error;
  };

  const updateAll = async (pairs: Record<string, string>) => {
    const promises = Object.entries(pairs).map(([k, v]) => updateSetting(k, v));
    const results = await Promise.all(promises);
    await refetch();
    return results.every(Boolean);
  };

  return { settings, loading, error, refetch, updateSetting, updateAll };
}
