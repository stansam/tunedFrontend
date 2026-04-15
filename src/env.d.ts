// env.d.ts — Typed environment variables for the TunedEssays frontend

declare namespace NodeJS {
  interface ProcessEnv {
    /** Backend API base URL. Example: https://api.tunedessays.com/api/v1 */
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_AUTH_ME_URL: string;
    NEXT_PUBLIC_SESSION_COOKIE_NAME: string;
    NEXT_PUBLIC_AUTH_REDIRECT_URL: string;
    /**
     * Number of words per page.
     * Used for the page-count → word-count conversion in the quote form.
     * Default: 275
     */
    NEXT_PUBLIC_WORDS_PER_PAGE: string;

    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_VERCEL_ENV?: "production" | "preview" | "development";
  }
}
