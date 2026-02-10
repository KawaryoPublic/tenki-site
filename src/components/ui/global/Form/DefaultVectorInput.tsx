import DefaultInput from "./DefaultInput";
import { ChangeEvent } from "react";

export default function DefaultVectorInput({title, name, labels, defaultValues, values, onChange}: {title: string, name: string, labels: string[], defaultValues?: number[], values?: number[], onChange?: (e: ChangeEvent<HTMLInputElement>, index: number) => void}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-bold">{title}</label>
            <div className="flex flex-col md:flex-row gap-2 md:justify-between md:items-center">
                {
                    labels.map((label, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <label className="font-bold whitespace-nowrap">{label}</label>
                            <DefaultInput
                                title={label}
                                name={name}
                                type="number"
                                defaultValue={defaultValues ? defaultValues[i] : undefined}
                                value={values ? values[i] : undefined}
                                onChange={onChange ? e => onChange(e, i) : undefined}
                                min={0}
                                required
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}