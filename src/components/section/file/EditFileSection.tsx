"use client";

import { useState, useEffect } from "react";
import { File, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import EditFileForm from "@/components/ui/file/Form/EditFileForm";

export default function EditFileSection({ id }: { id: number }) {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ file, setFile ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        fetch(`/api/file?id=${id}`)
            .then(res => res.json())
            .then(data => setFile(data))
            .then(() => {
                fetch('/api/role')
                    .then(res => res.json())
                    .then(data => setRoles(data))
                    .finally(() => setLoading(false))
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !file ? <div className="flex-1 flex flex-col items-center font-bold text-xl">ファイルを読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditFileForm file={file} roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/file">ファイル一覧に戻る</BlueButton>
            </div>
        </section>
    )

}
