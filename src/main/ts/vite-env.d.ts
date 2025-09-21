/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV_PROFILE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}