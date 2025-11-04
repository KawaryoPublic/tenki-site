import { useState } from "react";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";

export default function DefaultTags({ tags }: { tags?: string[] }) {
    const [ currentTags, setCurrentTags ] = useState<string[]>(tags && tags.length > 0 ? tags : [""]);

    return (
        <div className="flex flex-col gap-1">
            {
                currentTags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <DefaultInput
                            key={index}
                            title={`タグ`}
                            name="tag"
                            defaultValue={tag}
                            label={index === 0}
                        />
                        <RedButton
                            onClick={() => {
                                const newTags = [...currentTags];
                                newTags.splice(index, 1);
                                setCurrentTags(newTags);
                            }}
                        >
                            削除
                        </RedButton>
                    </div>
                ))
            }
            <div>
                <BlueButton
                    onClick={() => {
                        setCurrentTags([...currentTags, ""]);
                    }}
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}