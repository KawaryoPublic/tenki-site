import { useState } from "react";
import BlueButton from "../Button/BlueButton";
import RedButton from "../Button/RedButton";
import DefaultSelect from "./DefaultSelect";

export default function DefaultAddableSelect({ title, name, options, defaultValues = [], className = "" }: { title: string, name: string, options: { value: string | number, label: string}[], defaultValues?: (string | number)[], className?: string }) {
    const [ values, setValues ] = useState<(string | number)[]>(defaultValues);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="font-bold">{title}</label>
            {
                values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <DefaultSelect
                            title={title}
                            name={name}
                            value={value}
                            onChange={e => {
                                const newValues = [...values];
                                newValues[index] = e.target.value;
                                setValues(newValues);
                            }}
                            options={options}
                            className="flex-1"
                            required
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