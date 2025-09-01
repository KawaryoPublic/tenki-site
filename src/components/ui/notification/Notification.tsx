export default function notification({ title, createdAt, content }: { title: string, createdAt: Date, content: string }) {
    return (
        <div className="border p-4 rounded shadow-md w-full bg-white">
            <h3 className="font-bold mb-2">{title}</h3>
            <p className="bg-gray-400 pb-1">{`${createdAt.getFullYear()}年${createdAt.getMonth()}月${createdAt.getDate()}`}</p>
            <p>{content}</p>
        </div>
    );
}