import { ReactNode } from "react";

export default function LoadingResultUI({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 flex flex-col items-center font-bold text-lg md:text-xl">{children}</div>
    )
}