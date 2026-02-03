"use client";

import { useEffect, useState } from "react";
import { Manual } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import ManualDetailUI from "@/components/ui/manual/ManualDetailUI";

export default function ManualDetailSection({ id, tier }: { id: number, tier: number }) {
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
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !manual ? <div className="flex-1 flex flex-col items-center font-bold text-xl">マニュアルを読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <ManualDetailUI manual={manual} tier={tier} />
            <div>
                <BlueButton href="/manual">マニュアル一覧に戻る</BlueButton>
            </div>
        </section>
    )
}