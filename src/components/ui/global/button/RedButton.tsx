export default function RedButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return (
        <button onClick={onClick} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">{children}</button>
    );
}