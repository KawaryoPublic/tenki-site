"use client";

import { DateInfo } from "@/lib/type";
import Form from "next/form";
import BlueButton from "@/components/ui/global/button/BlueButton";

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
            <div>
                <label htmlFor="plan" className="font-bold">予定</label>
                <textarea 
                    name="plan" 
                    rows={3}
                    cols={100}
                    placeholder="予定"
                    defaultValue={info.plan ? info.plan : ""}
                    className="bg-gray-800 w-full resize-none border border-gray-600 rounded-md px-2 py-1"
                />
            </div>
            <div>
                <label htmlFor="event" className="font-bold">イベント</label>
                <textarea 
                    name="event" 
                    rows={3}
                    cols={100}
                    placeholder="イベント"
                    defaultValue={info.event ? info.event : ""}
                    className="bg-gray-800 w-full resize-none border border-gray-600 rounded-md px-2 py-1"
                />
            </div>
            <div>
                <label htmlFor="holiday" className="font-bold">休日観測</label>
                <textarea 
                    name="holiday" 
                    rows={1}
                    cols={100}
                    placeholder="休日観測"
                    defaultValue={info.holiday ? info.holiday : ""}
                    className="bg-gray-800 w-full resize-none border border-gray-600 rounded-md px-2 py-1"
                />
            </div>
            <div>
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}