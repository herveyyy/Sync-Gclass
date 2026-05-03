import React from "react";
import {
  HiNewspaper,
  HiUser,
  HiCalendarDays,
  HiIdentification,
  HiBolt,
} from "react-icons/hi2";
import { FiHeart, FiMessageSquare, FiShare2 } from "react-icons/fi";
import { mockBlogPosts } from "@/lib/utils/mockData";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/atoms/PageContainer";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = mockBlogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="min-h-screen  bg-surface px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* NEWSPAPER CONTAINER */}
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_#000] p-6 sm:p-10">
            {/* HEADER */}
            <div className="border-b-4 border-black pb-4 mb-6">
              <h2 className="flex items-center gap-2 text-[14px] font-extrabold tracking-widest text-black">
                <HiNewspaper className="text-lg" />
                Ylern DAILY
              </h2>
              <div className="flex flex-wrap justify-between text-xs font-bold mt-2 text-black">
                <span>Edition: Student Feed</span>
                <span>{post.created_at}</span>
              </div>
            </div>

            {/* HEADLINE */}
            <h1 className="text-[36px] sm:text-[48px] font-extrabold leading-[1.1] uppercase mb-6 text-black">
              {post.header.title}
            </h1>

            {post.header.image && (
              <div className="border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden bg-white mb-6">
                <img src={post.header.image} alt="Header" className="w-full object-cover max-h-96" />
              </div>
            )}
            {post.header.text && (
              <p className="text-xl font-bold mb-6">{post.header.text}</p>
            )}

            {/* SUB INFO STRIP */}
            <div className="flex flex-wrap items-center gap-3 mb-6 border-y-4 border-black py-3 text-black">
              <span className="flex items-center gap-1 px-3 py-1 bg-[#ffec00] border-4 border-black font-bold text-sm">
                <HiBolt className="text-sm" />
                BREAKING
              </span>

              <span className="flex items-center gap-1 px-3 py-1 bg-tertiary border-4 border-black font-bold text-sm">
                <HiUser className="text-sm" />
                {post.author.name}
              </span>

              <span className="flex items-center gap-1 px-3 py-1 bg-white border-4 border-black font-bold text-sm">
                <HiIdentification className="text-sm" />
                ID: {id}
              </span>
            </div>

            {/* CONTENT GRID */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2 text-[18px] leading-relaxed font-medium space-y-8 text-black">
                {post.blocks.map((block) => (
                  <div key={block.id} className="space-y-4">
                    {block.title && <h3 className="text-2xl font-black">{block.title}</h3>}
                    <p>{block.text}</p>
                    
                    {block.images && block.images.length > 0 && (
                      <div className="grid gap-4 mt-6">
                        {block.images.map((img: string, i: number) => (
                          <div
                            key={i}
                            className="border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden bg-white"
                          >
                            <img
                              src={img}
                              alt={`blog image ${i}`}
                              className="w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-surface border-4 border-black p-4 h-fit text-black">
                <h3 className="font-extrabold mb-2 underline decoration-4">
                  DETAILS
                </h3>
                <ul className="text-sm font-bold space-y-2">
                  <li className="flex items-center gap-2">
                    <HiUser /> Author: {post.author.name}
                  </li>
                  <li className="flex items-center gap-2">
                    <HiIdentification /> Post ID: {id}
                  </li>
                  <li className="flex items-center gap-2">
                    <HiCalendarDays /> Date: {post.created_at}
                  </li>
                </ul>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex flex-wrap gap-4 mt-10 pt-6 border-t-4 border-black">
              <button className="flex items-center gap-2 px-5 py-3 border-4 border-black bg-white font-extrabold shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] text-black transition-all">
                <FiHeart /> LIKE
              </button>

              <button className="flex items-center gap-2 px-5 py-3 border-4 border-black bg-secondary text-white font-extrabold shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all">
                <FiMessageSquare /> COMMENT
              </button>

              <button className="flex items-center gap-2 px-5 py-3 border-4 border-black bg-[#ff6a00] text-white font-extrabold shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all">
                <FiShare2 /> SHARE
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
