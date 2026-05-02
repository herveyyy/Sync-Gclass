import { mockBlogPosts } from "@/lib/utils/mockData";
import React from "react";

export default function SidebarContent() {
  return (
    <>
      {/* CTA PANEL */}
      <div className="bg-black text-white border-4 border-black rounded-2xl p-6 shadow-[10px_10px_0px_#ffec00] flex items-center justify-between group cursor-pointer overflow-hidden">
        <div className="z-10">
          <h4 className="text-xl font-black uppercase italic">Write a Story</h4>
          <p className="text-[10px] font-bold text-gray-400">
            Share your thoughts with the community
          </p>
        </div>
        <div className="w-12 h-12 bg-[#ffec00] border-4 border-white rounded-full flex items-center justify-center text-black group-hover:rotate-12 transition-transform">
          <span className="text-2xl font-black">+</span>
        </div>
      </div>

      {/* STATS PANEL */}
      <div className="bg-white border-4 border-black rounded-2xl p-4 lg:p-6 shadow-[10px_10px_0px_#000]">
        <h3 className="text-2xl font-black uppercase tracking-tight mb-6">
          Your Activity
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#ffec00] border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_#000]">
            <div className="text-3xl font-black">12</div>
            <div className="text-xs font-bold uppercase tracking-widest">
              Read
            </div>
          </div>
          <div className="bg-secondary text-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_#000]">
            <div className="text-3xl font-black">5</div>
            <div className="text-xs font-bold uppercase tracking-widest">
              Saved
            </div>
          </div>
        </div>
      </div>

      {/* TOP CREATORS PANEL */}
      <div className="bg-white border-4 border-black rounded-2xl p-4 lg:p-6 shadow-[10px_10px_0px_#000]">
        <h3 className="text-2xl font-black uppercase tracking-tight mb-6">
          Top Storytellers
        </h3>
        <div className="flex flex-col gap-4">
          {mockBlogPosts.slice(0, 3).map((post, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 border-4 border-black rounded-xl hover:bg-gray-50 transition-colors cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <div className="w-12 h-12 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-black text-sm">{post.author.name}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase">
                  1.2k Followers
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
