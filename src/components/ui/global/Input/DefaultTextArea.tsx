import { ChangeEvent, JSX } from "react";

export function DefaultTextArea({ title, name, rows, defaultValueOrValueAndOnChange, className, label }: { title: string, name: string, rows: number, defaultValueOrValueAndOnChange: string, className?: string, label?: boolean }): JSX.Element;
export function DefaultTextArea({ title, name, rows, defaultValueOrValueAndOnChange, className, label }: { title: string, name: string, rows: number, defaultValueOrValueAndOnChange: [string, (e: ChangeEvent<HTMLTextAreaElement>) => void], className?: string, label?: boolean }): JSX.Element;

export function DefaultTextArea({ title, name, rows, defaultValueOrValueAndOnChange, className = "", label = false }: { title: string, name: string, rows: number, defaultValueOrValueAndOnChange: unknown, className?: string, label?: boolean }) {
    return (
        typeof defaultValueOrValueAndOnChange === "string" ?
            <div className="text-gray-900 flex flex-col gap-1">
                {
                    label && <label htmlFor={name} className="font-bold">{title}</label>
                }
                <textarea 
                    name={name}
                    rows={rows}
                    cols={0}
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
                <textarea 
                    name={name}
                    rows={rows}
                    cols={0}
                    placeholder={title}
                    value={defaultValueOrValueAndOnChange[0]}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => defaultValueOrValueAndOnChange[1](e)}
                    className={`
                        bg-gray-300 w-full resize-none border border-gray-600 rounded-md px-2 py-1 flex-1 ${className}
                    `}
                />
            </div>
    );
}
