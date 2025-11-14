"use client";

import { useEffect, useState } from "react";
import { Manual, TIER } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import EditManualForm from "@/components/ui/manual/Form/EditManualForm";

export default function EditManualSection({ id, tier }: { id: number, tier: TIER }) {
    const [ manual, setManual ] = useState<Manual | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/manual?id=${id}`)
            .then(res => res.json())
            .then(data => setManual(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err))
    }, []);

    return (
        checkTier(tier) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !manual ? <div className="flex-1 flex flex-col items-center font-bold text-xl">マニュアルを読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditManualForm manual={manual} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/manual">マニュアル一覧に戻る</BlueButton>
            </div>
        </section>
    )
}