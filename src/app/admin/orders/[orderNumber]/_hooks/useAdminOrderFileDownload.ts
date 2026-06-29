"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/api-client";

async function downloadFile(orderId: string, fileId: string, filename: string): Promise<void> {
  const path = `/media/download/order/${encodeURIComponent(orderId)}/${encodeURIComponent(fileId)}`;
  const res = await apiGet<Blob>(path, { responseType: "blob" });
  if (!res.ok) throw new Error(res.error.message || "Download failed");
  const blobUrl = window.URL.createObjectURL(res.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}

async function downloadAllFiles(orderId: string, filename: string): Promise<void> {
  const path = `/media/download/order/${encodeURIComponent(orderId)}`;
  const res = await apiGet<Blob>(path, { responseType: "blob" });
  if (!res.ok) throw new Error(res.error.message || "Download failed");
  const blobUrl = window.URL.createObjectURL(res.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}

export function useAdminOrderFileDownload(orderId: string, fileId: string, filename: string) {
  return useQuery<void, Error>({
    queryKey: ["admin-order-file-download", orderId, fileId],
    queryFn: async () => {
      await downloadFile(orderId, fileId, filename);
    },
    enabled: false,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
}

export function useAdminOrderFilesDownload(orderId: string, orderNumber: string) {
  return useQuery<void, Error>({
    queryKey: ["admin-order-files-download", orderId],
    queryFn: async () => {
      await downloadAllFiles(orderId, `order_${orderNumber}_files.zip`);
    },
    enabled: false,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
}
