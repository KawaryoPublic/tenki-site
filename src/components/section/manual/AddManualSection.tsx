"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import AddManualForm from "@/components/ui/manual/Form/AddManualForm";
import { useEffect, useState } from "react";
import { Role } from "@/lib/types";

export default function AddManualSection() {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch("/api/role")
            .then(res => res.json())
            .then(data => setRoles(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">マニュアルを読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddManualForm roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/manual">マニュアル一覧に戻る</BlueButton>
            </div>
        </section>
    )
}