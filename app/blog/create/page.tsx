"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContainer } from "@/components/atoms/PageContainer";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import {
  HiPencilAlt,
  HiCheckCircle,
  HiArrowRight,
  HiArrowLeft,
} from "react-icons/hi";
import { BlogBlock } from "@/lib/entities/blog.types";
import StepHeader from "@/components/molecules/StepHeader";
import StepBody from "@/components/molecules/StepBody";
import StepReview from "@/components/molecules/StepReview";

const STEPS = [
  { label: "Header", color: "bg-[#ffec00] text-black" },
  { label: "Body", color: "bg-secondary text-white" },
  { label: "Review", color: "bg-tertiary text-black" },
] as const;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function CreateBlogPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Header state
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [headerText, setHeaderText] = useState("");

  // Blocks state
  const [blocks, setBlocks] = useState<Omit<BlogBlock, "id">[]>([
    { title: "", text: "", images: [""] },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Block helpers
  const addBlock = () => {
    setBlocks([...blocks, { title: "", text: "", images: [""] }]);
  };

  const removeBlock = (index: number) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter((_, i) => i !== index));
    }
  };

  const updateBlock = (
    index: number,
    field: keyof Omit<BlogBlock, "id">,
    value: any,
  ) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setBlocks(newBlocks);
  };

  const handleImageUrlChange = (
    blockIndex: number,
    imageIndex: number,
    value: string,
  ) => {
    const newBlocks = [...blocks];
    const newImages = [...newBlocks[blockIndex].images];
    newImages[imageIndex] = value;
    newBlocks[blockIndex].images = newImages;
    setBlocks(newBlocks);
  };

  const addImageUrlToBlock = (blockIndex: number) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].images = [...newBlocks[blockIndex].images, ""];
    setBlocks(newBlocks);
  };

  const removeImageUrlFromBlock = (blockIndex: number, imageIndex: number) => {
    const newBlocks = [...blocks];
    const newImages = newBlocks[blockIndex].images.filter(
      (_, i) => i !== imageIndex,
    );
    newBlocks[blockIndex].images = newImages;
    setBlocks(newBlocks);
  };

  // Navigation
  const goNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const canGoNext = (): boolean => {
    if (step === 0) return headerTitle.trim().length > 0;
    if (step === 1) return blocks.every((b) => b.text.trim().length > 0);
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const payload = {
      header: {
        title: headerTitle,
        image: headerImage,
        text: headerText,
      },
      blocks: blocks.map((b, i) => ({
        id: `block-${Date.now()}-${i}`,
        title: b.title,
        text: b.text,
        images: b.images.filter((img) => img.trim() !== ""),
      })),
    };

    console.log("Submitting Post:", payload);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/home");
    }, 1000);
  };

  return (
    <PageContainer>
      <div className="min-h-screen bg-surface px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* PAGE TITLE */}
          <div className="mb-8">
            <h1 className="text-[36px] sm:text-[48px] font-extrabold leading-[1.1] uppercase text-black mb-2 flex items-center gap-3">
              <HiPencilAlt /> Story Builder
            </h1>
            <p className="text-lg font-bold text-gray-700">
              Build your post step by step.
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-8 flex items-center gap-0">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.label}>
                {/* Step indicator */}
                <button
                  type="button"
                  onClick={() => {
                    if (i < step) {
                      setDirection(-1);
                      setStep(i);
                    } else if (i === step + 1 && canGoNext()) {
                      setDirection(1);
                      setStep(i);
                    }
                  }}
                  className={`
                    flex items-center gap-2 px-4 py-3 border-4 border-black font-black uppercase text-sm
                    transition-all
                    ${
                      i === step
                        ? `${s.color} shadow-[4px_4px_0px_#000] scale-105 z-10`
                        : i < step
                          ? "bg-white text-black shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-gray-100"
                          : "bg-gray-200 text-gray-400 shadow-none cursor-default"
                    }
                  `}
                >
                  <span
                    className={`
                    w-7 h-7 flex items-center justify-center border-4 border-black text-xs font-black
                    ${i <= step ? "bg-black text-white" : "bg-gray-300 text-gray-500 border-gray-400"}
                  `}
                  >
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 border-t-4 ${
                      i < step ? "border-black" : "border-gray-300 border-dashed"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* STEP CONTENT with slide animation */}
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 overflow-hidden">
            {/* Step Section Label */}
            <div className="border-b-4 border-black pb-4 mb-8">
              <h2 className="text-2xl font-black uppercase tracking-widest text-black flex items-center gap-2">
                <span
                  className={`px-3 py-1 border-4 border-black ${STEPS[step].color}`}
                >
                  {step + 1}
                </span>
                {STEPS[step].label}
              </h2>
              <p className="font-bold text-gray-600 mt-2">
                {step === 0 && "Set up the main title and cover for your story."}
                {step === 1 &&
                  "Add your content blocks — each has a title, images, and a paragraph."}
                {step === 2 && "Review everything before publishing."}
              </p>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                {step === 0 && (
                  <StepHeader
                    headerTitle={headerTitle}
                    setHeaderTitle={setHeaderTitle}
                    headerImage={headerImage}
                    setHeaderImage={setHeaderImage}
                    headerText={headerText}
                    setHeaderText={setHeaderText}
                  />
                )}

                {step === 1 && (
                  <StepBody
                    blocks={blocks}
                    onUpdateBlock={updateBlock}
                    onAddBlock={addBlock}
                    onRemoveBlock={removeBlock}
                    onImageUrlChange={handleImageUrlChange}
                    onAddImageToBlock={addImageUrlToBlock}
                    onRemoveImageFromBlock={removeImageUrlFromBlock}
                  />
                )}

                {step === 2 && (
                  <StepReview
                    headerTitle={headerTitle}
                    headerImage={headerImage}
                    headerText={headerText}
                    blocks={blocks}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* NAVIGATION BAR */}
          <div className="mt-8 flex justify-between items-center">
            {/* Left side */}
            <div className="flex gap-4">
              {step > 0 ? (
                <Button type="button" variant="secondary" onClick={goBack}>
                  <HiArrowLeft className="text-lg" /> BACK
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => router.back()}
                >
                  CANCEL
                </Button>
              )}
            </div>

            {/* Right side */}
            <div>
              {step < STEPS.length - 1 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={goNext}
                  disabled={!canGoNext()}
                >
                  NEXT <HiArrowRight className="text-lg" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="success"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={!canGoNext()}
                >
                  {isSubmitting ? (
                    "PUBLISHING..."
                  ) : (
                    <>
                      <HiCheckCircle className="text-xl" /> PUBLISH STORY
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
