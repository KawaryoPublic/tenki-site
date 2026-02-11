import { useState } from "react";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";

export default function DefaultAddableInput({ title, name, defaultValues = [], className = "" }: { title: string, name: string, defaultValues?: string[], className?: string }) {
    const [ values, setValues ] = useState<string[]>(defaultValues);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="font-bold">{title}</label>
            {
                values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <DefaultInput
                            title={title}
                            name={name}
                            value={value}
                            onChange={e => {
                                const newValues = [...values];
                                newValues[index] = e.target.value;
                                setValues(newValues);
                            }}
                            required
                            className="flex-1"
                        />
                        <RedButton
                            onClick={() => {
                                const newValues = [...values];
                                newValues.splice(index, 1);
                                setValues(newValues);
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
                        setValues([...values, ""]);
                    }}
                    type="button"
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}