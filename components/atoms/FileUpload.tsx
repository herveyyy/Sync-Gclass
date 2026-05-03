"use client";

import React, { useRef, useState } from "react";
import { HiUpload, HiX, HiExclamationCircle } from "react-icons/hi";

interface FileUploadProps {
  /** Unique id for the input */
  id: string;
  /** Label text shown above the drop zone */
  label: string;
  /** Accepted MIME types, e.g. ["image/png", "image/jpeg", "image/webp"] */
  acceptTypes: string[];
  /** Max file size in bytes */
  maxSizeBytes: number;
  /** Whether multiple files can be selected at once */
  multiple?: boolean;
  /** Callback when valid files are selected — receives object URLs for preview */
  onFilesSelected: (files: File[], previewUrls: string[]) => void;
  /** Optional class name */
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getAcceptLabel(types: string[]): string {
  return types
    .map((t) => {
      const ext = t.split("/")[1]?.toUpperCase();
      return ext || t;
    })
    .join(", ");
}

export default function FileUpload({
  id,
  label,
  acceptTypes,
  maxSizeBytes,
  multiple = false,
  onFilesSelected,
  className = "",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const validate = (fileList: FileList | null): File[] | null => {
    if (!fileList || fileList.length === 0) return null;

    const files = Array.from(fileList);
    const invalidType = files.find((f) => !acceptTypes.includes(f.type));
    if (invalidType) {
      setError(
        `"${invalidType.name}" is not an accepted type. Allowed: ${getAcceptLabel(acceptTypes)}`,
      );
      return null;
    }

    const tooLarge = files.find((f) => f.size > maxSizeBytes);
    if (tooLarge) {
      setError(
        `"${tooLarge.name}" exceeds the ${formatBytes(maxSizeBytes)} limit (${formatBytes(tooLarge.size)}).`,
      );
      return null;
    }

    setError(null);
    return files;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = validate(e.target.files);
    if (files) {
      const urls = files.map((f) => URL.createObjectURL(f));
      onFilesSelected(files, urls);
    }
    // Reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = validate(e.dataTransfer.files);
    if (files) {
      const urls = files.map((f) => URL.createObjectURL(f));
      onFilesSelected(files, urls);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-base font-extrabold text-on-surface mb-2">
        {label}
      </label>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`
          w-full py-8 px-6 border-4 border-dashed rounded-xl cursor-pointer
          flex flex-col items-center justify-center gap-2
          transition-all
          ${
            isDragOver
              ? "border-secondary bg-blue-50 shadow-[4px_4px_0px_0px_rgba(2,102,255,1)]"
              : "border-black bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }
        `}
      >
        <HiUpload
          className={`text-3xl ${isDragOver ? "text-secondary" : "text-gray-400"}`}
        />
        <p className="font-bold text-sm text-center">
          <span className="text-secondary underline">Click to upload</span> or
          drag & drop
        </p>
        <p className="text-xs font-bold text-gray-400">
          {getAcceptLabel(acceptTypes)} — max {formatBytes(maxSizeBytes)}
        </p>
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={acceptTypes.join(",")}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      {/* Error message */}
      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm font-bold text-error">
          <HiExclamationCircle className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
