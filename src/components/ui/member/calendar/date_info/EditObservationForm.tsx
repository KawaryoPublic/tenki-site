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
                        plan: info.plan,
                        observation: {
                            morning: formData.get("morning"),
                            noon: formData.get("noon"),
                            afterSchool: formData.get("afterSchool")
                        }
                    }),
                }).then()
                .catch(err => console.log(err));
            }}
            className="flex flex-col gap-2"
        >
            <div>
                <textarea 
                    name="morning" 
                    rows={1}
                    cols={100}
                    placeholder="朝"
                    className="bg-white w-full resize-none"
                />
                <textarea 
                    name="noon" 
                    rows={1}
                    cols={100}
                    placeholder="昼"
                    className="bg-white w-full resize-none"
                />
                <textarea 
                    name="afterSchool" 
                    rows={1}
                    cols={100}
                    placeholder="放課後"
                    className="bg-white w-full resize-none"
                />
            </div>
            <div>
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}