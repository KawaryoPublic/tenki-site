import { ChangeEvent, RefObject } from "react";

export default function DefaultInput({ title, name, type = "text", defaultValue, value, onChange, ref, className = "", label = false, required = false, min = undefined, max = undefined }: { title: string, name: string, type?: string, defaultValue?: string, value?: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void, ref?: RefObject<HTMLInputElement> | ((element: HTMLInputElement) => void), className?: string, label?: boolean, required?: boolean, min?: number, max?: number }) {
    return (
        <div className={`text-gray-900 text-sm md:text-base flex flex-col gap-1 ${className}`}>
            {
                label && <label htmlFor={name} className="font-bold">{title}</label>
            }
            <input 
                name={name}
                type={type}
                placeholder={title}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                ref={ref}
                required={required}
                min={min}
                max={max}
                accept="image/*,application/pdf"
                className="bg-gray-300 user-invalid:text-pink-600 border border-gray-600 user-invalid:border-pink-500 focus:border-blue-500 focus:user-invalid:border-pink-500 focus:outline focus:outline-blue-500 focus:user-invalid:outline-pink-500 rounded-md px-2 py-1 flex-1 file:hidden"
            />
        </div>
    );
}
