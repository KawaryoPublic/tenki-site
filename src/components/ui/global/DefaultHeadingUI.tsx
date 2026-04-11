import { ReactNode } from "react"

export default function DefaultHeadingUI({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold ${className}`}>{children}</h1>
    )
}