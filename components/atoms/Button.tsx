import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle =
    "px-8 py-4 rounded-xl border-brutal shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-lg font-bold text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variantStyle = {
    primary: "bg-[#f8e600] hover:bg-[#d9c900]",
    secondary: "bg-[#0266ff] text-white hover:bg-[#0050cc]",
    danger: "bg-[#ba1a1a] text-white hover:bg-[#93000a]",
    success: "bg-[#b8fd4b] hover:bg-[#98da27]",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};
