import { useState, ChangeEvent, RefObject } from "react";

export default function DefaultTextArea({ title, name, defaultValue, value, onChange, ref, className = "", label = false, required = false }: { title: string, name: string, defaultValue?: string, value?: string, onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void, ref?: RefObject<HTMLTextAreaElement | null>, className?: string, label?: boolean, required?: boolean }) {
    const temp = useState<string>(defaultValue || "");
    [ value, onChange ] = value && onChange ? [value, onChange] : [temp[0], (e: ChangeEvent<HTMLTextAreaElement>) => temp[1](e.target.value)];

    return (
        <div className={`text-gray-900 text-sm md:text-base flex flex-col gap-1 ${className}`}>
            {
                label && <label htmlFor={name} className="font-bold">{title}</label>
            }
            <textarea 
                name={name}
                rows={value?.split("\n").length}
                cols={0}
                placeholder={title}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                ref={ref}
                required={required}
                className="bg-gray-300 user-invalid:text-pink-600 border border-gray-600 user-invalid:border-pink-500 focus:border-blue-500 focus:user-invalid:border-pink-500 focus:outline focus:outline-blue-500 focus:user-invalid:outline-pink-500 rounded-md px-2 py-1 flex-1"
            />
        </div>
    );
}