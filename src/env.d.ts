declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_SOCKET_URL: string;
    NEXT_PUBLIC_APP_ORIGIN: string;
    NEXT_PUBLIC_SESSION_COOKIE_NAME: string;
    NEXT_PUBLIC_AUTH_REDIRECT_URL: string;
    NEXT_PUBLIC_WORDS_PER_PAGE: string;
    BACKEND_API_URL: string;
    EXTERNAL_API_URL: string;
    ALLOWED_DEV_ORIGINS: string;
    ENABLE_SUBDOMAIN_ROUTING: string;
    NEXT_PUBLIC_ROOT_DOMAIN: string;

    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_VERCEL_ENV?: "production" | "preview" | "development";
  }
}
