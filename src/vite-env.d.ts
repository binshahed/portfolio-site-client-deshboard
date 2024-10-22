// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly VITE_IMGBB_KEY: string;
  // add other environment variables as needed
}
