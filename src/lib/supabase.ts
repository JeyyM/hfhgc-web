import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY!;

/** Max admin UI session duration from login (client-enforced); refresh tokens may live longer unless tuned in Supabase Dashboard. */
export const MAX_ADMIN_SESSION_MS = 3 * 24 * 60 * 60 * 1000;

const AUTH_PERSIST_KEY = 'hfhgc_auth_persist';
const SESSION_DEADLINE_KEY = 'hfhgc_session_deadline';

export function setAuthPersistence(persist: boolean): void {
  localStorage.setItem(AUTH_PERSIST_KEY, persist ? '1' : '0');
}

/** `true` = store Supabase tokens in localStorage (“Remember me”); `false` = sessionStorage (cleared when the browser session ends). */
export function getAuthPersistence(): boolean {
  return localStorage.getItem(AUTH_PERSIST_KEY) === '1';
}

export function getAuthStorageBucket(): Storage {
  if (typeof window === 'undefined') return localStorage;
  return getAuthPersistence() ? localStorage : sessionStorage;
}

/** Remove Supabase Auth keys from both storages (used before a new login). */
export function clearAllSupabaseAuthStorage(): void {
  if (typeof window === 'undefined') return;
  for (const store of [sessionStorage, localStorage]) {
    const keys: string[] = [];
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i);
      if (k?.startsWith('sb-')) keys.push(k);
    }
    keys.forEach((k) => store.removeItem(k));
  }
}

export function setSessionDeadlineFromNow(): void {
  const until = Date.now() + MAX_ADMIN_SESSION_MS;
  getAuthStorageBucket().setItem(SESSION_DEADLINE_KEY, String(until));
}

export function clearSessionDeadline(): void {
  localStorage.removeItem(SESSION_DEADLINE_KEY);
  sessionStorage.removeItem(SESSION_DEADLINE_KEY);
}

/** If deadline is missing but a session exists (pre–feature users), grant a fresh 3‑day window. */
export function migrateLegacySessionDeadline(): void {
  const bucket = getAuthStorageBucket();
  if (!bucket.getItem(SESSION_DEADLINE_KEY)) {
    bucket.setItem(SESSION_DEADLINE_KEY, String(Date.now() + MAX_ADMIN_SESSION_MS));
  }
}

export function isSessionDeadlineExpired(): boolean {
  const raw = getAuthStorageBucket().getItem(SESSION_DEADLINE_KEY);
  if (!raw) return false;
  return Date.now() > parseInt(raw, 10);
}

function createSupabaseAuthStorage(): Storage {
  return {
    get length() {
      return getAuthStorageBucket().length;
    },
    clear() {
      clearAllSupabaseAuthStorage();
    },
    key(index: number) {
      return getAuthStorageBucket().key(index);
    },
    getItem(key: string) {
      return getAuthStorageBucket().getItem(key);
    },
    setItem(key: string, value: string) {
      getAuthStorageBucket().setItem(key, value);
    },
    removeItem(key: string) {
      sessionStorage.removeItem(key);
      localStorage.removeItem(key);
    },
  };
}

const supabaseAuthStorage =
  typeof window !== 'undefined' ? createSupabaseAuthStorage() : localStorage;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: supabaseAuthStorage,
  },
});

if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((_event, session) => {
    if (!session) return;
    migrateLegacySessionDeadline();
    if (isSessionDeadlineExpired()) {
      clearSessionDeadline();
      void supabase.auth.signOut();
    }
  });
}
