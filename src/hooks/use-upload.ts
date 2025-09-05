"use client";

import { useState } from "react";
import { apiClient } from "@/services/client/api-client";

const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB

interface IUploadState {
  progress: number;
  isUploading: boolean;
  error: string | null;
  isComplete: boolean;
}

export function useUpload() {
  const [uploadState, setUploadState] = useState<IUploadState>({
    progress: 0,
    isUploading: false,
    error: null,
    isComplete: false,
  });

  const resetUpload = () => {
    setUploadState({
      progress: 0,
      isUploading: false,
      error: null,
      isComplete: false,
    });
  };

  const handleUpload = async (file: File): Promise<boolean> => {
    setUploadState({
      progress: 0,
      isUploading: true,
      error: null,
      isComplete: false,
    });

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadID = `${file.name}-${Date.now()}`;

    try {
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk, `${file.name}-chunk-${chunkIndex}`);
        formData.append("uploadId", uploadID);
        formData.append("chunkIndex", String(chunkIndex));
        formData.append("totalChunks", String(totalChunks));

        await apiClient.post("/upload/chunk", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
        setUploadState((prev) => ({
          ...prev,
          progress,
        }));
      }

      setUploadState((prev) => ({
        ...prev,
        isUploading: false,
        isComplete: true,
        progress: 100,
      }));
      return true;
    } catch (err: unknown) {
      setUploadState((prev) => ({
        ...prev,
        isUploading: false,
        error:
          (err as Error).message || "An unknown error occurred during upload.",
      }));
      return false;
    }
  };

  return { ...uploadState, handleUpload, resetUpload };
}
