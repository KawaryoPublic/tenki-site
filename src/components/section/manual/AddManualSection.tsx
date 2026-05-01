"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import AddManualForm from "@/components/ui/manual/Form/AddManualForm";
import { useEffect, useState } from "react";
import { Role } from "@/lib/types";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";
import { preventRefresh } from "@/lib/utils";

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

        return preventRefresh();
    }, []);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !roles ? <LoadingResultUI>マニュアルを読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddManualForm roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton>
                    <a href="/manual">マニュアル一覧に戻る</a>
                </BlueButton>
            </div>
        </section>
    )
}