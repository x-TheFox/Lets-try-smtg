/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRISP_WEBSITE_ID?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
