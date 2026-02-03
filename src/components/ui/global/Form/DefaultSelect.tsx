export default function DefaultSelect({ name, title, options, defaultValue, className = "" }: { name: string; title: string; options: { value: string | number; label: string }[]; defaultValue?: string | number, className?: string }) {
    return (
        <div className={`text-gray-900 text-sm md:text-base flex flex-col gap-1 ${className}`}>
            <label htmlFor={name} className="font-bold">{title}</label>
            <select name={name} defaultValue={defaultValue} className="bg-gray-300 user-invalid:text-pink-600 border border-gray-600 user-invalid:border-pink-500 focus:border-blue-500 focus:user-invalid:border-pink-500 focus:outline focus:outline-blue-500 focus:user-invalid:outline-pink-500 rounded-md px-2 py-1 flex-1" >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}  