export default function DefaultInput({ title, name, type = "text", defaultValue = "", className = "", label = false, required = false }: { title: string, name: string, type?: string, defaultValue?: string, className?: string, label?: boolean, required?: boolean }) {
    return (
        <div className="text-gray-900 flex flex-col gap-1">
            {
                label && <label htmlFor={name} className="font-bold">{title}</label>
            }
            <input 
                name={name}
                type={type}
                placeholder={title}
                defaultValue={defaultValue}
                required={required}
                className={`
                    bg-gray-300 w-full resize-none border border-gray-600 rounded-md px-2 py-1 flex-1 ${className}
                `}
            />
        </div>
    );
}
