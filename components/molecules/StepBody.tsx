import React from "react";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import FileUpload from "@/components/atoms/FileUpload";
import { HiPhotograph, HiPlus, HiTrash } from "react-icons/hi";
import { BlogBlock } from "@/lib/entities/blog.types";

interface StepBodyProps {
  blocks: Omit<BlogBlock, "id">[];
  onUpdateBlock: (
    index: number,
    field: keyof Omit<BlogBlock, "id">,
    value: any,
  ) => void;
  onAddBlock: () => void;
  onRemoveBlock: (index: number) => void;
  onImageUrlChange: (
    blockIndex: number,
    imageIndex: number,
    value: string,
  ) => void;
  onAddImageToBlock: (blockIndex: number) => void;
  onRemoveImageFromBlock: (blockIndex: number, imageIndex: number) => void;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function StepBody({
  blocks,
  onUpdateBlock,
  onAddBlock,
  onRemoveBlock,
  onImageUrlChange,
  onAddImageToBlock,
  onRemoveImageFromBlock,
}: StepBodyProps) {
  const handleFileUpload = (
    blockIndex: number,
    _files: File[],
    urls: string[],
  ) => {
    // Append uploaded image preview URLs to existing images
    const block = blocks[blockIndex];
    const currentImages = block.images.filter((img) => img.trim() !== "");
    const merged = [...currentImages, ...urls];
    onUpdateBlock(blockIndex, "images", merged);
  };

  return (
    <div className="space-y-8">
      {blocks.map((block, blockIndex) => (
        <div
          key={blockIndex}
          className="bg-gray-50 border-4 border-black shadow-[4px_4px_0px_#000] p-5 sm:p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-black flex items-center gap-2">
              <span className="bg-secondary text-white px-2 py-0.5 border-4 border-black text-sm">
                {blockIndex + 1}
              </span>
              Block
            </h3>
            {blocks.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveBlock(blockIndex)}
                className="text-white bg-error border-4 border-black font-bold px-3 py-1 active:translate-x-[2px] active:translate-y-[2px] shadow-[2px_2px_0px_#000] active:shadow-none hover:bg-[#93000a] transition-all text-sm"
              >
                REMOVE
              </button>
            )}
          </div>

          <div className="space-y-6">
            <Input
              id={`block-${blockIndex}-title`}
              label="BLOCK TITLE (OPTIONAL)"
              placeholder="e.g., Chapter 1"
              value={block.title || ""}
              onChange={(e) =>
                onUpdateBlock(blockIndex, "title", e.target.value)
              }
            />

            {/* Images sub-section */}
            <div className="p-4 bg-white border-4 border-black shadow-[2px_2px_0px_#000] space-y-4">
              <h4 className="font-extrabold text-base flex items-center gap-2 uppercase">
                <HiPhotograph className="text-lg text-secondary" /> Block Images
              </h4>

              {/* File Upload */}
              <FileUpload
                id={`block-${blockIndex}-file-upload`}
                label="UPLOAD IMAGES"
                acceptTypes={ACCEPTED_IMAGE_TYPES}
                maxSizeBytes={MAX_IMAGE_SIZE}
                multiple
                onFilesSelected={(files, urls) =>
                  handleFileUpload(blockIndex, files, urls)
                }
              />

              {/* URL inputs */}
              {block.images.map((url, imgIndex) => (
                <div
                  key={imgIndex}
                  className="flex flex-col sm:flex-row gap-4 items-start"
                >
                  <div className="flex-1 w-full space-y-2">
                    <Input
                      id={`block-${blockIndex}-image-${imgIndex}`}
                      label={`IMAGE URL ${imgIndex + 1}`}
                      placeholder="https://example.com/image.jpg"
                      value={url}
                      onChange={(e) =>
                        onImageUrlChange(blockIndex, imgIndex, e.target.value)
                      }
                    />
                    {url && (
                      <div className="border-4 border-black shadow-[4px_4px_0px_#000] overflow-hidden bg-white h-48 w-full mt-2">
                        <img
                          src={url}
                          alt={`Preview ${imgIndex + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {block.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        onRemoveImageFromBlock(blockIndex, imgIndex)
                      }
                      className="mt-8 p-3 bg-error text-white border-4 border-black hover:bg-[#93000a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0"
                      aria-label="Remove image"
                    >
                      <HiTrash size={24} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => onAddImageToBlock(blockIndex)}
                className="flex items-center gap-2 px-4 py-2 border-4 border-black font-bold bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-sm"
              >
                <HiPlus size={16} /> ADD IMAGE URL
              </button>
            </div>

            <Textarea
              id={`block-${blockIndex}-text`}
              label="PARAGRAPH"
              placeholder="Write the paragraph for this block..."
              value={block.text}
              onChange={(e) =>
                onUpdateBlock(blockIndex, "text", e.target.value)
              }
              rows={6}
              required
            />
          </div>
        </div>
      ))}

      {/* ADD NEW BLOCK BUTTON */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onAddBlock}
          className="flex items-center gap-2 px-8 py-4 border-4 border-black font-black text-lg bg-tertiary hover:bg-tertiary-dim shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_#000] transition-all uppercase"
        >
          <HiPlus size={24} /> ADD ANOTHER BODY BLOCK
        </button>
      </div>
    </div>
  );
}
