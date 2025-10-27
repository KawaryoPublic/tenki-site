export default function DefaultTextArea({ title, name, rows, defaultValue = "", className = "", label = false }: { title: string, name: string, rows: number, defaultValue?: string, className?: string, label?: boolean }) {
    return (
        <div className="text-gray-900 flex flex-col gap-1">
            {
                label && <label htmlFor={name} className="font-bold">{title}</label>
            }
            <textarea 
                name={name}
                rows={rows}
                cols={0}
                placeholder={title}
                defaultValue={defaultValue}
                className={`
                    bg-gray-300 w-full resize-none border border-gray-600 rounded-md px-2 py-1 flex-1 ${className}
                `}
            />
        </div>
    );
}