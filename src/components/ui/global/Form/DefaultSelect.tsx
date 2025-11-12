export default function DefaultSelect({ name, title, options, defaultValue, className = "" }: { name: string; title: string; options: { value: string; label: string }[]; defaultValue?: string, className?: string }) {
    return (
        <div className="text-gray-900 text-sm md:text-base flex flex-col gap-1">
            <label htmlFor={name} className="font-bold">{title}</label>
            <select name={name} defaultValue={defaultValue || options[0].value} className={`bg-gray-300 w-full border border-gray-600 rounded-md px-2 py-1 flex-1 ${className}`} >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}  