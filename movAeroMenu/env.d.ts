// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // otras variables de entorno que puedas tener
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }