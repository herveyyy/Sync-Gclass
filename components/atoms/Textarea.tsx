import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, id, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-base font-extrabold text-on-surface mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className={`w-full px-6 py-4 text-lg font-bold text-on-surface bg-white border-brutal rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(2,102,255,1)] transition-shadow placeholder:text-[#cdc7aa] resize-y ${props.className || ""}`}
      />
    </div>
  );
}
