export default function DefaultTextArea({ title, name, rows, defaultValue, className, label = false }: { title: string, name: string, rows: number, defaultValue?: string, className?: string, label?: boolean }) {
    return (
        <div>
            {
                label ? 
                <label htmlFor={name} className="font-bold">{title}</label> : ""
            }
            <textarea 
                name={name}
                rows={rows}
                cols={0}
                placeholder={title}
                defaultValue={defaultValue ? defaultValue : ""}
                className={`
                    bg-gray-100 w-full resize-none border border-gray-600 rounded-md px-2 py-1
                    ${className ? className : ""}
                `}
            />
        </div>
    );
}