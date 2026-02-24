"use client";

import Form from "next/form";
import DefaultTextArea from "../../../global/Form/DefaultTextArea";
import BlueButton from "../../../global/Button/BlueButton";
import { useActionState } from 'react';
import { redirect } from "next/navigation";
import DefaultAddableInput from "../../../global/Form/DefaultAddableOption";

export default function AddDateInfoForm({ date }: { date: string }) {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        await fetch(`/api/calendar/date_info?date=${date}`, {
            method: 'POST',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect("/calendar");
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold border-b pb-2">詳細を追加</h2>
            <DefaultTextArea 
                title="予定" 
                name="plan" 
                label
            />
            <DefaultAddableInput title="休日観測" name="holiday"/>
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    );
}