export default function BlueButton({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) {
    return (
        <button onClick={onClick} className={`bg-blue-500 text-white px-2 md:px-3 py-1 text-sm md:text-base rounded hover:bg-blue-600 ${className ? className : ""}`}>{children}</button>
    );
}