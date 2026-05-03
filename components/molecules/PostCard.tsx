import React from "react";
import Link from "next/link";
import { FiClock, FiMessageSquare, FiHeart } from "react-icons/fi";
import Avatar from "../atoms/Avatar";

import { BlogPost } from "@/lib/entities/blog.types";

interface PostCardProps {
  post: BlogPost;
  isDragging?: boolean;
}

export default function PostCard({ post, isDragging }: PostCardProps) {
  return (
    <Link 
      href={isDragging ? "#" : `/blog/${post.id}`} 
      onClick={(e) => isDragging && e.preventDefault()}
      className="block group"
    >
      <article
        className={`
          bg-white 
          border-4 border-black 
          rounded-xl 
          p-6 sm:p-8 
          shadow-[8px_8px_0px_#000] 
          transition-all duration-150
          ${!isDragging ? "group-hover:translate-x-[4px] group-hover:translate-y-[4px] group-hover:shadow-[4px_4px_0px_#000]" : ""}
        `}
      >
        {/* AUTHOR */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar name={post.author.name} avatarUrl={post.author.avatar} />

            <div>
              <h3 className="font-extrabold text-[18px] text-black">
                {post.author.name}
              </h3>

              <div className="flex items-center text-[14px] font-medium text-gray-700 mt-1">
                <FiClock className="mr-1" size={14} />
                {post.created_at}
              </div>
            </div>
          </div>

          {/* TAG */}
          <div className="px-3 py-1 bg-[#ffec00] border-4 border-black rounded-full text-[12px] font-bold uppercase">
            Story
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <h2 className="text-[18px] sm:text-[24px] font-extrabold text-black mb-1 sm:mb-2 leading-tight line-clamp-2">
            {post.header.title}
          </h2>

          <p className="text-[14px] sm:text-[16px] text-gray-800 mb-4 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-4">
            {post.blocks[0]?.text}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-4 border-t-4 border-black">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* LIKE */}
            <button
              className="
                flex items-center gap-1 sm:gap-2 
                px-2 sm:px-3 py-1.5 sm:py-2 
                border-4 border-black 
                rounded-lg 
                bg-white 
                shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]
                active:translate-x-[2px] active:translate-y-[2px]
                active:shadow-[1px_1px_0px_#000]
              "
            >
              <FiHeart size={16} className="sm:w-[18px]" />
              <span className="text-[12px] sm:text-[14px] font-bold">Like</span>
            </button>

            {/* COMMENT */}
            <button
              className="
                flex items-center gap-1 sm:gap-2 
                px-2 sm:px-3 py-1.5 sm:py-2 
                border-4 border-black 
                rounded-lg 
                bg-secondary text-white
                shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]
                active:translate-x-[2px] active:translate-y-[2px]
                active:shadow-[1px_1px_0px_#000]
              "
            >
              <FiMessageSquare size={16} className="sm:w-[18px]" />
              <span className="text-[12px] sm:text-[14px] font-bold">Comment</span>
            </button>
          </div>


        </div>
      </article>
    </Link>
  );
}
