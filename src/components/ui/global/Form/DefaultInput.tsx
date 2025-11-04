import { ChangeEvent, RefObject } from "react";

export default function DefaultInput({ title, name, type = "text", defaultValue = "", value, onChange, ref, className = "", label = false, required = false, multiple = false }: { title: string, name: string, type?: string, defaultValue?: string, value?: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void, ref?: RefObject<HTMLInputElement | null>, className?: string, label?: boolean, required?: boolean, multiple?: boolean }) {
    return (
        <div className="text-gray-900 text-sm lg:text-base flex flex-col gap-1">
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
                multiple={multiple}
                className={`
                    bg-gray-300 w-full resize-none border border-gray-600 rounded-md px-2 py-1 flex-1 ${className}
            `   }
            />
        </div>
    );
}
