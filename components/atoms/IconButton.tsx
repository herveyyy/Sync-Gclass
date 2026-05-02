import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Size variant for the button */
  size?: "sm" | "md";
  /** Color of the icon text */
  color?: string;
  /** Hover background color class */
  hoverBg?: string;
}

/**
 * Reusable neo-brutalist circular icon button.
 * Used for swipe actions, close buttons, and any circular icon trigger.
 */
export default function IconButton({
  children,
  size = "md",
  color = "text-black",
  hoverBg = "hover:bg-gray-50",
  className = "",
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12 sm:w-16 sm:h-16",
  };

  const shadowClasses = {
    sm: "shadow-[3px_3px_0px_#000] active:shadow-[1px_1px_0px_#000]",
    md: "shadow-[4px_4px_0px_#000] active:shadow-[2px_2px_0px_#000]",
  };

  return (
    <button
      className={`${sizeClasses[size]} flex items-center justify-center bg-white border-4 border-black rounded-full ${shadowClasses[size]} ${color} ${hoverBg} transition-all active:translate-x-[2px] active:translate-y-[2px] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
