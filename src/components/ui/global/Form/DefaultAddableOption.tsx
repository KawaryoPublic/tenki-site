import { useState } from "react";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";

export default function DefaultAddableOption({ title, name, defaultOptions, className = "" }: { title: string, name: string, defaultOptions?: string[], className?: string }) {
    const [ options, setOptions ] = useState<string[]>(defaultOptions && defaultOptions.length !== 0 ? defaultOptions : []);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="font-bold">{title}</label>
            {
                options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2 md:gap-4">
                        <DefaultInput
                            key={index}
                            title={title}
                            name={name}
                            value={option}
                            onChange={e => {
                                const newOptions = [...options];
                                newOptions[index] = e.target.value;
                                setOptions(newOptions);
                            }}
                            required
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