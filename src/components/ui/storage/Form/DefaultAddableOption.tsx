import { useState, Dispatch, SetStateAction } from "react";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import RedButton from "../../global/Button/RedButton";
import DefaultVectorInput from "../../global/Form/DefaultVectorInput";
import OptionLinkUI from "../../global/FileLinkUI";

export default function DefaultAddableStorage({ title, defaultOptions = [], setDefaultOptions, onChange, className = "" }: { 
    title: string, 
    defaultOptions?: {
        id: number,
        name: string;
        size: number[];
        position: number[]
    }[], 
    setDefaultOptions?: Dispatch<SetStateAction<{
        id: number,
        name: string;
        size: number[];
        position: number[]
    }[]>>,
    onChange?: (option: {
        name: string;
        size: number[];
        position: number[]
    }[]) => void,
    className?: string 
}) {
    const [ newOptions, setNewOptions ] = useState<{
        name: string;
        size: number[];
        position: number[]
    }[]>([]);

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            <label className="font-bold">{title}</label>
            <div className="flex flex-col w-full gap-4">
                {
                    defaultOptions.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <OptionLinkUI url={`/storage/shelf/${option.id}`} label={option.name} className="flex-1" />
                            <RedButton
                                onClick={() => {
                                    const temp = [...defaultOptions];
                                    temp.splice(index, 1);
                                    setDefaultOptions && setDefaultOptions(temp);
                                }}
                                type="button"
                            >
                                削除
                            </RedButton>
                        </div>
                    ))
                }
                {
                    newOptions.map((option, index) => (
                        <div key={index} className="flex items-center gap-2 border-t pt-4 pb-2">
                            <div className="flex-1 flex flex-col gap-2">
                                <DefaultInput
                                    title="名前"
                                    name="option-name"
                                    value={option.name}
                                    onChange={e => {
                                        const temp = [...newOptions];
                                        temp[index].name = e.target.value;

                                        onChange && onChange(temp);
                                        setNewOptions(temp);
                                    }}
                                    label
                                    required
                                    className="flex-1"
                                />
                                <DefaultVectorInput
                                    title="サイズ[cm]"
                                    name="option-size"
                                    labels={["縦幅", "横幅"]}
                                    values={option.size}
                                    onChange={(e, i) => {
                                        const temp = [...newOptions];
                                        temp[index].size[i] = Number(e.target.value);

                                        onChange && onChange(temp);
                                        setNewOptions(temp);
                                    }}
                                />
                                <DefaultVectorInput
                                    title="座標[cm]"
                                    name="option-position"
                                    labels={["x", "y"]}
                                    values={option.position}
                                    onChange={(e, i) => {
                                        const temp = [...newOptions];
                                        temp[index].position[i] = Number(e.target.value);

                                        onChange && onChange(temp);
                                        setNewOptions(temp);
                                    }}
                                />
                            </div>
                            <RedButton
                                onClick={() => {
                                    const temp = [...newOptions];
                                    temp.splice(index, 1);
                                    setNewOptions(temp);
                                }}
                                type="button"
                            >
                                削除
                            </RedButton>
                        </div>
                    ))
                }
            </div>
            <div>
                <BlueButton
                    onClick={() => {
                        setNewOptions([...newOptions, {
                            name: "",
                            size: ["", ""],
                            position: ["", ""]
                        }]);
                    }}
                    type="button"
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}