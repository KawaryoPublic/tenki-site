import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";
import FileLinkUI from "../FileLinkUI";
import { Dispatch, SetStateAction, useState, useRef } from "react";

export default function DefaultFile({ title, name, defaultFiles = [], setDefaultFiles }: { title: string, name: string, defaultFiles?: { url: string, filename: string }[], setDefaultFiles?: Dispatch<SetStateAction<{ url: string, filename: string }[]>> }) {
    const fileRef = useRef<HTMLInputElement[]>([]);
    const [fileNumber, setFileNumber] = useState(0);

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
                Array.from({length: fileNumber}).map((_, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <DefaultInput
                            key={index}
                            title={title}
                            name={name}
                            type="file"
                            ref={(element: HTMLInputElement) => fileRef.current[index] = element}
                            required
                        />
                        <RedButton
                            onClick={() => {
                                for(let i = index; i < fileNumber - 1; i++) {
                                    const dataTransfer = new DataTransfer();

                                    const file = fileRef;
                                    if (file) {
                                        //dataTransfer.items.add(file);
                                    }

                                    //fileRef.current[i].files = dataTransfer.files;
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
            <BlueButton
                onClick={() => {
                    console.log(fileRef.current);
                    fileRef.current.forEach(fileInput => {
                        if (fileInput && fileInput.files && fileInput.files.length > 0) {
                            console.log(`File name: ${fileInput.files[0].name}`);
                        } else {
                            console.log("No file selected");
                        }
                    });
                }}
                type="button"
            >
                アップロード確認(コンソール確認)
            </BlueButton>
        </div>
    )
}
