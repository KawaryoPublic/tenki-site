export default function DefaultSelect({ name, title, options, defaultValue }: { name: string; title: string; options: { value: string; label: string }[]; defaultValue?: string }) {
    return (
        <div className="text-gray-900 flex flex-col gap-1">
            <label htmlFor={name} className="font-bold">{title}</label>
            <select name={name} defaultValue={defaultValue || options[0].value} className="bg-gray-300 w-full border border-gray-600 rounded-md px-2 py-1 flex-1" >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}  