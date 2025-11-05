"use client";

import Form from "next/form";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";

export default function AddDateInfoForm({ date }: { date: string }) {
    return (
        <Form 
            action={async data => {
                await fetch(`/api/date_info?date=${date}`, {
                    method: "POST",
                    body: data
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
            className="flex flex-col gap-2"
        >
            <DefaultTextArea 
                title="予定" 
                name="plan" 
                rows={3} 
                label
            />
            <DefaultTextArea 
                title="イベント" 
                name="event" 
                rows={3} 
                label
            />
            <DefaultInput 
                title="休日観測" 
                name="holiday" 
                label
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}