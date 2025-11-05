import { useState } from "react";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";

export default function DefaultAddableOption({ title, name, options }: { title: string, name: string, options?: string[] }) {
    const [ currentOptions, setCurrentOptions ] = useState<string[]>(options && options.length !== 0 ? options : []);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="tag" className="font-bold">{title}</label>
            {
                currentOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <DefaultInput
                            key={index}
                            title={title}
                            name={name}
                            value={option}
                            onChange={e => {
                                const newOptions = [...currentOptions];
                                newOptions[index] = e.target.value;
                                setCurrentOptions(newOptions);
                            }}
                        />
                        <RedButton
                            onClick={() => {
                                const newOptions = [...currentOptions];
                                newOptions.splice(index, 1);
                                setCurrentOptions(newOptions);
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
                        setCurrentOptions([...currentOptions, ""]);
                    }}
                    type="button"
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}