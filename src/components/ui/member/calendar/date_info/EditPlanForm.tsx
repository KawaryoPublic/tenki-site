"use client";

import { DateInfo } from "@/lib/type";
import Form from "next/form";
import BlueButton from "@/components/ui/global/button/BlueButton";
import DefaultTextArea from "@/components/ui/global/form/DefaultTextArea";

export default function EditPlanForm({ info }: { info: DateInfo }) {
    return (
        <Form 
            action={async (formData) => {
                await fetch("/api/dateInfo", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: info.id,
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
                defaultValue={info.plan ? info.plan : ""} 
                rows={3} 
                label
            />
            <DefaultTextArea 
                title="イベント" 
                name="event" 
                defaultValue={info.event ? info.event : ""} 
                rows={3} 
                label
            />
            <DefaultTextArea 
                title="休日観測" 
                name="holiday" 
                defaultValue={info.holiday ? info.holiday : ""} 
                rows={1} 
                label
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}