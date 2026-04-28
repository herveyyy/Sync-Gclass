import React from "react";
import Link from "next/link";
import { FiClock, FiMessageSquare, FiHeart } from "react-icons/fi";
import Avatar from "../atoms/Avatar";

import { BlogPost } from "@/lib/utils/mockData";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block group">
      <article
        className="
          bg-white 
          border-4 border-black 
          rounded-xl 
          p-6 sm:p-8 
          shadow-[8px_8px_0px_#000] 
          transition-all duration-150
          group-hover:translate-x-[4px] group-hover:translate-y-[4px]
          group-hover:shadow-[4px_4px_0px_#000]
        "
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
          <div className="px-3 py-1 bg-[#ffec00] border-4 border-black rounded-full text-[12px] font-bold">
            UPDATE
          </div>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-[28px] font-extrabold text-black mb-3 leading-tight">
            {post.title}
          </h2>

          <p className="text-[18px] text-gray-800 mb-6 leading-relaxed">
            {post.content.type === "text"
              ? post.content.text
              : post.content.text}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-4 border-t-4 border-black">
          <div className="flex items-center gap-4">
            {/* LIKE */}
            <button
              className="
                flex items-center gap-2 
                px-3 py-2 
                border-4 border-black 
                rounded-lg 
                bg-white 
                shadow-[4px_4px_0px_#000]
                active:translate-x-[2px] active:translate-y-[2px]
                active:shadow-[2px_2px_0px_#000]
              "
            >
              <FiHeart size={18} />
              <span className="text-[14px] font-bold">Like</span>
            </button>

            {/* COMMENT */}
            <button
              className="
                flex items-center gap-2 
                px-3 py-2 
                border-4 border-black 
                rounded-lg 
                bg-secondary text-white
                shadow-[4px_4px_0px_#000]
                active:translate-x-[2px] active:translate-y-[2px]
                active:shadow-[2px_2px_0px_#000]
              "
            >
              <FiMessageSquare size={18} />
              <span className="text-[14px] font-bold">Comment</span>
            </button>
          </div>

          {/* CTA */}
          <div
            className="
              text-secondary-dim 
              font-extrabold 
              text-[16px] 
              border-b-4 border-black
            "
          >
            Read →
          </div>
        </div>
      </article>
    </Link>
  );
}
