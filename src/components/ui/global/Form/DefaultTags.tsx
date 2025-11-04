import { useState } from "react";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";

export default function DefaultTags({ tags }: { tags?: string[] }) {
    const [ currentTags, setCurrentTags ] = useState<string[]>(tags && tags.length > 0 ? tags : [""]);

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="tag" className="font-bold">タグ</label>
            {
                currentTags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <DefaultInput
                            key={index}
                            title="タグ"
                            name="tag"
                            defaultValue={tag}
                            className="flex-1"
                        />
                        <RedButton
                            onClick={() => {
                                const newTags = [...currentTags];
                                newTags.splice(index, 1);
                                setCurrentTags(newTags);
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
                        setCurrentTags([...currentTags, ""]);
                    }}
                    type="button"
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}