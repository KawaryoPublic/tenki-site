import { ChangeEvent } from "react";

export default function DefaultSelect({ name, title, options, defaultValue, value, onChange, label = false, required, className = "" }: { name: string; title: string; options: { value: string | number; label: string }[]; defaultValue?: string | number, value?: string | number, onChange?: (e: ChangeEvent<HTMLSelectElement>) => void, label?: boolean, required?: boolean, className?: string }) {
    return (
        <div className={`text-gray-900 flex flex-col gap-1 ${className}`}>
            {
                label && <label htmlFor={name} className="font-bold">{title}</label>
            }
            <select
                name={name} 
                defaultValue={defaultValue == null ? "" : defaultValue} 
                value={value}
                onChange={onChange}
                className="text-sm md:text-base bg-gray-300 user-invalid:text-pink-600 border border-gray-600 user-invalid:border-pink-500 focus:border-blue-500 focus:user-invalid:border-pink-500 focus:outline focus:outline-blue-500 focus:user-invalid:outline-pink-500 rounded-md px-2 py-1 flex-1" 
            >
                {
                    !required && <option value="">{title}</option>
                }
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>
    )
}  