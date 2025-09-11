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
                    }),
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
            className="flex flex-col gap-2"
        >
            <div>
                <textarea 
                    name="plan" 
                    rows={4}
                    cols={100}
                    placeholder="予定"
                    className="bg-white w-full resize-none"
                />
            </div>
            <div>
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}