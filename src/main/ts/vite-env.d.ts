/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

interface ImportMetaEnv {
    readonly VITE_ENV_PROFILE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}