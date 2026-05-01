"use client";

import { useState, useEffect } from "react";
import { File, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import EditFileForm from "@/components/ui/file/Form/EditFileForm";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";
import { preventRefresh } from "@/lib/utils";

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
            .catch(err => console.error(err));

        return preventRefresh();
    }, []);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !file ? <LoadingResultUI>ファイルを読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditFileForm file={file} roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton>
                    <a href="/file">ファイル一覧に戻る</a>
                </BlueButton>
            </div>
        </section>
    )

}
