import React from "react";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import FileUpload from "@/components/atoms/FileUpload";

interface StepHeaderProps {
  headerTitle: string;
  setHeaderTitle: (v: string) => void;
  headerImage: string;
  setHeaderImage: (v: string) => void;
  headerText: string;
  setHeaderText: (v: string) => void;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function StepHeader({
  headerTitle,
  setHeaderTitle,
  headerImage,
  setHeaderImage,
  headerText,
  setHeaderText,
}: StepHeaderProps) {
  return (
    <div className="space-y-6">
      <Input
        id="headerTitle"
        label="MAIN STORY TITLE"
        placeholder="e.g., The Future of Web Development"
        value={headerTitle}
        onChange={(e) => setHeaderTitle(e.target.value)}
        required
      />

      <FileUpload
        id="headerCoverUpload"
        label="UPLOAD COVER IMAGE (OPTIONAL)"
        acceptTypes={ACCEPTED_IMAGE_TYPES}
        maxSizeBytes={MAX_IMAGE_SIZE}
        onFilesSelected={(_files, urls) => setHeaderImage(urls[0])}
      />

      <Input
        id="headerImage"
        label="OR PASTE IMAGE URL"
        placeholder="https://example.com/cover.jpg"
        value={headerImage}
        onChange={(e) => setHeaderImage(e.target.value)}
      />

      {headerImage && (
        <div className="border-4 border-black shadow-[4px_4px_0px_#000] overflow-hidden bg-white h-48 w-full">
          <img
            src={headerImage}
            alt="Cover Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
            }}
          />
        </div>
      )}

      <Textarea
        id="headerText"
        label="SUBTITLE / EXCERPT (OPTIONAL)"
        placeholder="A short summary of what this story is about..."
        value={headerText}
        onChange={(e) => setHeaderText(e.target.value)}
        rows={3}
      />
    </div>
  );
}
