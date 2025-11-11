import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import RedButton from "../Button/RedButton";
import FileLinkUI from "../FileLinkUI";
import { Dispatch, SetStateAction, useState } from "react";

export default function DefaultFile({ title, name, defaultFiles = [], setDefaultFiles }: { title: string, name: string, defaultFiles?: { url: string, filename: string }[], setDefaultFiles?: Dispatch<SetStateAction<{ url: string, filename: string }[]>> }) {
    const [ files, setFiles ] = useState<(File | null)[]>([]);

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
                files.map((file, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <DefaultInput
                            key={index}
                            title={title}
                            name={name}
                            type="file"
                            value={file?.name}
                            onChange={e => {
                                const newFiles = [...files];
                                newFiles[index] = e.target.files ? e.target.files[0] : null;
                                setFiles(newFiles);
                            }}
                            required
                        />
                        <RedButton
                            onClick={() => {
                                console.log(files.map(f => f?.name));
                                const newFiles = [...files];
                                newFiles.splice(index, 1);
                                setFiles(newFiles);
                                console.log(files.map(f => f?.name));
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
                        setFiles([...files, null]);
                    }}
                    type="button"
                >
                    追加
                </BlueButton>
            </div>
        </div>
    )
}
