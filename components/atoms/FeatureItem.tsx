import { HiCheck } from "react-icons/hi2";

interface FeatureItemProps {
  text: string;
}

export function FeatureItem({ text }: FeatureItemProps) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-7 h-7 shrink-0 bg-[#b8fd4b] border-2 border-black rounded-lg flex items-center justify-center mt-0.5">
        <HiCheck className="text-sm text-[#1d1c10]" />
      </div>
      <span className="text-base font-bold text-[#4a4731]">{text}</span>
    </li>
  );
}
