import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-base font-extrabold text-[#1d1c10] mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full px-6 py-4 text-lg font-bold text-[#1d1c10] bg-white border-brutal rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(2,102,255,1)] transition-shadow placeholder:text-[#cdc7aa] ${props.className || ""}`}
      />
    </div>
  );
}
