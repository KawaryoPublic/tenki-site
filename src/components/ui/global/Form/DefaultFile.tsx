import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";
import FileLinkUI from "../FileLinkUI";
import { Dispatch, SetStateAction, useState, useRef } from "react";

export default function DefaultFile({ title, name, defaultFiles = [], setDefaultFiles }: { title: string, name: string, defaultFiles?: { url: string, filename: string }[], setDefaultFiles?: Dispatch<SetStateAction<{ url: string, filename: string }[]>> }) {
    const [ ids, setIds ] = useState<{id: number}[]>([]);
    const fileRefs = useRef({});

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="font-bold">{title}</label>
            {
                defaultFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <FileLinkUI url={file.url} filename={file.filename} />
                        <RedButton
                            onClick={() => {
                                const newFiles = [...defaultFiles];
                                newFiles.splice(index, 1);
                                setDefaultFiles && setDefaultFiles(newFiles);
                            }}
                            type="button"
                        >
                            削除
                        </RedButton>
                    </div>
                ))
            }
            {
                ids.map((id, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <DefaultInput
                            key={index}
                            title={title}
                            name={name}
                            type="file"
                            ref={(element: HTMLInputElement) => fileRefs.current[id] = element}
                            required
                        />
                        <RedButton
                            onClick={() => {
                                setIds(ids.filter(i => i !== id));
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
                        const newId = ids.length > 0 ? ids[ids.length - 1].id + 1 : 0;
                        setIds([...ids, { id: newId }]);
                    }}
                    type="button"
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}
