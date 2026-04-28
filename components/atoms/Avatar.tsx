import React from "react";

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
}

export default function Avatar({ name, avatarUrl, size = "md" }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${sizeClasses[size]}`}
    >
      {avatarUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
