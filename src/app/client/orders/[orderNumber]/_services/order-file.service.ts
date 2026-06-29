import { apiGet } from "@/api-client";

export async function DownloadOrderFile(
  orderId: string,
  fileId: string,
  filename: string,
): Promise<void> {
  const path = `/media/download/order/${encodeURIComponent(orderId)}/${encodeURIComponent(fileId)}`;
  const res = await apiGet<Blob>(path, { responseType: "blob" });
  if (!res.ok) {
    throw new Error(res.error.message || "Failed to download file");
  }
  const blobUrl = window.URL.createObjectURL(res.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}

export async function DownloadOrderFiles(
  orderId: string,
  filename: string,
): Promise<void> {
  const path = `/media/download/order/${encodeURIComponent(orderId)}`;
  const res = await apiGet<Blob>(path, { responseType: "blob" });
  if (!res.ok) {
    throw new Error(res.error.message || "Failed to download package");
  }
  const blobUrl = window.URL.createObjectURL(res.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}
