"use client";

import AddFileForm from "@/components/ui/file/Form/AddFileForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { Role } from "@/lib/types";
import { useState, useEffect } from 'react';

export default function AddFileSection() {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        fetch('/api/role')
        .then(res => res.json())
        .then(data => setRoles(data))
        .finally(() => setLoading(false))
        .catch(err => console.log(err));
    }, []);
    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">ファイルを読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddFileForm roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/file">ファイル一覧に戻る</BlueButton>
            </div>
        </section>
    );
}