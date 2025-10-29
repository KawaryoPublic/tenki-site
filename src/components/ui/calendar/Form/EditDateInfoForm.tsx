"use client";

import { DateInfo } from "@/lib/type";
import Form from "next/form";
import DefaultTextArea from "../../global/Form/DefaultTextAreaWithDefaultValue";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInputWithDefaultValue";

export default function EditDateInfoForm({ info }: { info: DateInfo }) {
    return (
        <Form 
            action={async (formData) => {
                await fetch("/api/date_info", {
                    method: "PUT",
                    body: JSON.stringify({
                        date: info.date,
                        plan: formData.get("plan"),
                        event: formData.get("event"),
                        holiday: formData.get("holiday"),
                    }),
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
            className="flex flex-col gap-2"
        >
            <DefaultTextArea 
                title="予定" 
                name="plan" 
                defaultValue={info.plan} 
                rows={3} 
                label
            />
            <DefaultTextArea 
                title="イベント" 
                name="event" 
                defaultValue={info.event} 
                rows={3} 
                label
            />
            <DefaultInput 
                title="休日観測" 
                name="holiday" 
                defaultValue={info.holiday} 
                label
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}