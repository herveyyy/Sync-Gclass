import React from "react";
import { BlogBlock } from "@/lib/entities/blog.types";
import { HiPhotograph } from "react-icons/hi";

interface StepReviewProps {
  headerTitle: string;
  headerImage: string;
  headerText: string;
  blocks: Omit<BlogBlock, "id">[];
}

export default function StepReview({
  headerTitle,
  headerImage,
  headerText,
  blocks,
}: StepReviewProps) {
  return (
    <div className="space-y-6">
      {/* Header Preview */}
      <div className="bg-gray-50 border-4 border-black p-5">
        <h3 className="font-black text-sm uppercase tracking-widest text-gray-500 mb-3">
          Header
        </h3>
        <h2 className="text-[28px] sm:text-[36px] font-extrabold leading-[1.1] uppercase text-black">
          {headerTitle || (
            <span className="text-gray-300 italic">Untitled</span>
          )}
        </h2>
        {headerImage && (
          <div className="border-4 border-black shadow-[4px_4px_0px_#000] overflow-hidden bg-white h-48 w-full mt-4">
            <img
              src={headerImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {headerText && (
          <p className="text-lg font-bold text-gray-700 mt-3">{headerText}</p>
        )}
      </div>

      {/* Blocks Preview */}
      {blocks.map((block, i) => (
        <div key={i} className="bg-gray-50 border-4 border-black p-5">
          <h3 className="font-black text-sm uppercase tracking-widest text-gray-500 mb-3">
            Body Block {i + 1}
          </h3>
          {block.title && (
            <h4 className="text-xl font-extrabold text-black mb-2">
              {block.title}
            </h4>
          )}
          <p className="text-base text-gray-800 leading-relaxed">
            {block.text || (
              <span className="text-gray-300 italic">No content</span>
            )}
          </p>
          {block.images.filter((img) => img.trim() !== "").length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {block.images
                .filter((img) => img.trim() !== "")
                .map((img, j) => (
                  <div
                    key={j}
                    className="border-4 border-black shadow-[2px_2px_0px_#000] overflow-hidden bg-white h-24 w-32"
                  >
                    <img
                      src={img}
                      alt={`Block ${i + 1} image ${j + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
