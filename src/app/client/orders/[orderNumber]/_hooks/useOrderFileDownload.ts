"use client";

import { useQuery } from "@tanstack/react-query";
import { DownloadOrderFile, DownloadOrderFiles } from "../_services/order-file.service";

export function useOrderFileDownload(orderId: string, fileId: string, filename: string) {
  return useQuery<void, Error>({
    queryKey: ["order-file-download", orderId, fileId],
    queryFn: async () => {
      await DownloadOrderFile(orderId, fileId, filename);
    },
    enabled: false,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
}

export function useOrderFilesDownload(orderId: string, orderNumber: string) {
  return useQuery<void, Error>({
    queryKey: ["order-files-download", orderId],
    queryFn: async () => {
      await DownloadOrderFiles(orderId, `order_${orderNumber}_files.zip`);
    },
    enabled: false,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });
}
