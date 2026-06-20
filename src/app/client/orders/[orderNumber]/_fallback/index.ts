export const COMMENT_MAX_CHARS = 2_500;
export const COMMENTS_STALE_TIME_MS = 30_000;
export const ORDER_DETAIL_STALE_TIME_MS = 60_000;
export const ORDER_DETAIL_GC_TIME_MS = 5 * 60_000;

export const ACTIVITY_STALE_TIME_MS = 15_000;
export const COMMENT_ATTACHMENT_MAX_MB = 10;
export const COMMENT_ATTACHMENT_ALLOWED = [
  ".pdf",".docx",".doc",".jpg",".png",".txt",".xlsx",".pptx",
  ".webm",".ogg",".mp3",".wav",
] as const;
export const VOICE_RECORD_MAX_SECONDS = 120;
