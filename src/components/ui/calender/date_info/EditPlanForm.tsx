"use client";

import { DateInfo } from "@/lib/type";
import Form from "next/form";
import BlueButton from "../../global/button/BlueButton";

export default function EditPlanForm({ info }: { info: DateInfo }) {
    return (
        <Form 
            action={async (formData) => {
                await fetch("/api/dateInfo", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: info.id,
                        date: info.date,
                        plan: formData.get("plan")
                    }),
                }).then(() => alert("保存しました"))
                .then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            <div>
                <label htmlFor="plan">予定: </label><br />
                <textarea 
                    name="plan" 
                    rows={10}
                    cols={100}
                    className="bg-white"
                />
            </div>
            <div>
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}