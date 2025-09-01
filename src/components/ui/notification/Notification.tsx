export default function notification({ title, createdAt, content }: { title: string, createdAt: Date, content: string }) {
    return (
        <div className="border p-4 rounded shadow-md w-64 bg-white">
            <h3 className="font-bold mb-2">{title}</h3>
            <p>{createdAt.toString()}</p>
            <p>{content}</p>
        </div>
    );
}