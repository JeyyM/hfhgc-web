/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLIC_KEY: string
  /** Cloudflare Turnstile widget site key (safe in browser). */
  readonly VITE_TURNSTILE_SITE_KEY: string
  /** Dev-only prefilled login password — never deploy to production builds */
  readonly VITE_DEV_LOGIN_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
