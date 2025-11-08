"use client";

import { useState, useEffect } from "react";
import { File } from "@/lib/type";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import EditFileForm from "@/components/ui/file/Form/EditFileForm";

export default function EditFileSection({ id }: { id: number }) {
    const [ file, setFile ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch(`/api/file?id=${id}`)
            .then(res => res.json())
            .then(data => setFile(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err))
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !file ? <div className="flex-1 flex flex-col items-center font-bold text-xl">ファイルを読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditFileForm file={file} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/file">告知に戻る</BlueButton>
            </div>
        </section>
    )

}
