"use client";

import Form from "next/form";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import BlueButton from "../../global/Button/BlueButton";
import { useState } from "react";
import { redirect } from "next/navigation";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";

export default function AddDateInfoForm({ date }: { date: string }) {
    const [ saving, setSaving ] = useState(false);

    return (
        <Form 
            action={async data => {
                setSaving(true);
                console.log(saving);

                await fetch(`/api/date_info?date=${date}`, {
                    method: "POST",
                    body: data
                }).catch(err => console.log(err));

                setSaving(false);

                redirect("/calendar");
            }}
            className="flex flex-col gap-2"
        >
            <h2 className="text-xl lg:text-3xl font-bold border-b pb-2">詳細を追加</h2>
            <DefaultTextArea 
                title="予定" 
                name="plan" 
                rows={3} 
                label
            />
            <DefaultAddableOption 
                title="休日観測" 
                name="holiday"
            />
            <div className="pt-4">
                <BlueButton disabled={saving}>{saving ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    );
}