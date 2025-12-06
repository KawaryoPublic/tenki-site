"use client";

import { useEffect, useState } from "react";
import { Storage, TIER } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import EditStorageForm from "@/components/ui/storage/Form/EditStorageForm";

export default function EditStorageSection({ id, tier }: { id: number, tier: TIER }) {
    const [ storage, setStorage ] = useState<Storage | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/storage?id=${id}`)
            .then(res => res.json())
            .then(data => setStorage(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err))
    }, []);

    return (
        checkTier(tier) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !storage ? <div className="flex-1 flex flex-col items-center font-bold text-xl">倉庫を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditStorageForm storage={storage} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/manual">倉庫一覧に戻る</BlueButton>
            </div>
        </section>
    )
}