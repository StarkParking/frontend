/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_RPC_URL: string
  readonly VITE_APP_REDIRECT_URI: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
