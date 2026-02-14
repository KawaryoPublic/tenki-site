import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";
import OptionUrlUI from "../OptionUrlUI";
import { Dispatch, SetStateAction, useState, useRef } from "react";

export default function DefaultFile({ title, defaultFiles = [], setDefaultFiles }: { title: string, defaultFiles?: { url: string, filename: string }[], setDefaultFiles?: Dispatch<SetStateAction<{ url: string, filename: string }[]>> }) {
    const fileRef = useRef<HTMLInputElement[]>([]);
    const [fileNumber, setFileNumber] = useState(0);

    return (
        <div className="flex flex-col gap-2">
            <label className="font-bold">{title}</label>
            {
                defaultFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <OptionUrlUI url={file.url} label={file.filename} className="flex-1" />
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
                Array.from({length: fileNumber}).map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <DefaultInput
                            title={title}
                            name="file"
                            type="file"
                            ref={(element: HTMLInputElement) => fileRef.current[index] = element}
                            required
                            className="flex-1"
                        />
                        <RedButton
                            onClick={() => {
                                for(let i = index; i < fileNumber - 1; i++) {
                                    const dataTransfer = new DataTransfer();
                                    const file = fileRef.current[i + 1].files?.[0];

                                    if (file) {
                                        dataTransfer.items.add(file);
                                    }

                                    fileRef.current[i].files = dataTransfer.files;
                                }

                                setFileNumber(n => n - 1);
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
                        setFileNumber(n => n + 1);
                    }}
                    type="button"
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}
