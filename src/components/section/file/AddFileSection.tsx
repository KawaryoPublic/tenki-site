"use client";

import AddFileForm from "@/components/ui/file/Form/AddFileForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";
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
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !roles ? <LoadingResultUI>ファイルを読み込めませんでした</LoadingResultUI> :
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