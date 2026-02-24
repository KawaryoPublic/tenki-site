"use client";

import { DateInfo } from "@/lib/types";
import Form from "next/form";
import DefaultTextArea from "../../../global/Form/DefaultTextArea";
import BlueButton from "../../../global/Button/BlueButton";
import DefaultAddableInput from "../../../global/Form/DefaultAddableOption";
import { redirect } from "next/navigation";
import { useActionState } from 'react';

export default function EditDateInfoForm({ info }: { info: DateInfo }) {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        await fetch(`/api/calendar/date_info?date=${info.date}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect(`/calendar/date/${info.date}`);
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold border-b pb-2">詳細を編集</h2>
            <DefaultTextArea 
                title="予定" 
                name="plan" 
                defaultValue={info.plan} 
                label
            />
            <DefaultAddableInput title="休日観測" name="holiday" defaultValues={info.holiday} />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    );
}