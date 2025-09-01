export default function BlueButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return (
        <button onClick={onClick} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">{children}</button>
    );
}