import { ChangeEvent, JSX } from "react";

export function DefaultInput({ title, name, defaultValue, type, className, label }: { title: string, name: string, defaultValue: string, type?: string, className?: string, label?: boolean }): JSX.Element;
export function DefaultInput({ title, name, valueAndOnChange, type, className, label }: { title: string, name: string, valueAndOnChange: [string, (e: ChangeEvent<HTMLInputElement>) => void], type?: string, className?: string, label?: boolean }): JSX.Element;

export function DefaultInput({ title, name, defaultValueOrValueAndOnChange, type = "text", className = "", label = false }: { title: string, name: string, defaultValueOrValueAndOnChange?: unknown, type?: string, className?: string, label?: boolean }) {
    return (
        typeof defaultValueOrValueAndOnChange === "string" ?
            <div className="text-gray-900 flex flex-col gap-1">
                {
                    label && <label htmlFor={name} className="font-bold">{title}</label>
                }
                <input 
                    name={name}
                    type={type}
                    placeholder={title}
                    defaultValue={defaultValueOrValueAndOnChange}
                    className={`
                        bg-gray-300 w-full resize-none border border-gray-600 rounded-md px-2 py-1 flex-1 ${className}
                    `}
                />
            </div> :
            Array.isArray(defaultValueOrValueAndOnChange) &&
            <div className="text-gray-900 flex flex-col gap-1">
                {   
                    label && <label htmlFor={name} className="font-bold">{title}</label>
                }
                <input 
                    name={name}
                    type={type}
                    placeholder={title}
                    value={defaultValueOrValueAndOnChange[0]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => defaultValueOrValueAndOnChange[1](e)}
                    className={`
                        bg-gray-300 w-full resize-none border border-gray-600 rounded-md px-2 py-1 flex-1 ${className}
                    `}
                />
            </div>
    );
}
