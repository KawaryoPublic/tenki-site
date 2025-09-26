import { ChangeEvent } from "react";

export default function DefaultTextArea({ title, name, rows, defaultValue, value, onChange, className, label = false, type="text" }: { title: string, name: string, rows: number, defaultValue?: string, value?: string, onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void, className?: string, label?: boolean, type?: string }) {
    return (
        <div className="text-gray-900 flex flex-col gap-1">
            {
                label ? 
                <label htmlFor={name} className="font-bold">{title}</label> : ""
            }
            {
                value !== undefined && onChange ? 
                <textarea 
                    name={name}
                    rows={rows}
                    cols={0}
                    placeholder={title}
                    value={value}
                    type={type}
                    onChange={e => onChange(e)}
                    className={`
                        bg-gray-300 w-full resize-none border border-gray-600 rounded-md px-2 py-1 flex-1
                        ${className ? className : ""}
                    `}
                /> : 
                <textarea 
                    name={name}
                    rows={rows}
                    cols={0}
                    placeholder={title}
                    defaultValue={defaultValue ? defaultValue : ""}
                    type={type}
                    className={`
                        bg-gray-300 w-full resize-none border border-gray-600 rounded-md px-2 py-1 flex-1
                        ${className ? className : ""}
                    `}
                />
            }
            
        </div>
    );
}