"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import AddRoleForm from "@/components/ui/role/Form/AddRoleForm";
import { preventRefresh } from "@/lib/utils";
import { useEffect } from "react";

export default function AddRoleSection() {
    useEffect(() => {
        return preventRefresh();
    }, []);

    return (
        <section className="w-full flex flex-col gap-8">
            <WhiteFrameUI>
                <AddRoleForm />
            </WhiteFrameUI>
            <div>
                <BlueButton>
                    <a href="/role">役職一覧に戻る</a>
                </BlueButton>
            </div>
         </section>
    );
}