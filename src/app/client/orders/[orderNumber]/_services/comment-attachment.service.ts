import { apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";

interface UploadResult {
  uploaded_count: number;
  file_ids: string[];
}

export async function uploadCommentFiles(
  orderId: string,
  files: File[],
): Promise<ApiResult<UploadResult>> {
  const form = new FormData();
  files.forEach((f) => form.append("files", f));
  return apiPost<UploadResult>(
    `/orders/${encodeURIComponent(orderId)}/upload-files`,
    form,
  );
}
