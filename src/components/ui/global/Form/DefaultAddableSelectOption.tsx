import { useState } from "react";
import BlueButton from "../Button/BlueButton";
import RedButton from "../Button/RedButton";
import DefaultSelect from "./DefaultSelect";

export default function DefaultAddableSelectOption({ title, name, selectOptions, defaultOptions = [], className = "" }: { title: string, name: string, selectOptions: { value: string | number, label: string}[], defaultOptions?: string[], className?: string }) {
    const [ options, setOptions ] = useState<string[]>(defaultOptions);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="font-bold">{title}</label>
            {
                options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <DefaultSelect
                            title={title}
                            name={name}
                            value={option}
                            onChange={e => {
                                const newOptions = [...options];
                                newOptions[index] = e.target.value;
                                setOptions(newOptions);
                            }}
                            options={selectOptions}
                            className="flex-1"
                        />
                        <RedButton
                            onClick={() => {
                                const newOptions = [...options];
                                newOptions.splice(index, 1);
                                setOptions(newOptions);
                            }}
                            type="button"
                        >
                            削除
                        </RedButton>
                    </div>
                ))
            }
            <div>
                <BlueButton
                    onClick={() => {
                        setOptions([...options, ""]);
                    }}
                    type="button"
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}