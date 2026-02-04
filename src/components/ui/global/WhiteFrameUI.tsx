import { ReactNode } from "react";

export default function WhiteFrameUI({ children, style, className = "" }: { children: ReactNode, style: any, className?: string }) {
  return (
    <div style={style} className={`text-gray-900 bg-gray-200 rounded-lg shadow-md p-2 md:p-4 ${className}`}>
      {children}
    </div>
  );
}