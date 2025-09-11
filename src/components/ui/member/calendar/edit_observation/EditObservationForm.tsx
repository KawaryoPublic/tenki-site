"use client";

import { useEffect, useState } from "react";
import { Observation } from "@/types/observation";
import Form from "next/form";
import BlueButton from "@/components/ui/global/button/BlueButton";

export default function EditPlanForm({ day }: { day: number }) {
    const [observation, setObservation] = useState<Observation>({id: -1, day: -1, morning: "", noon: "", afterSchool: ""});

    useEffect(() => {
        fetch(`/api/observation/${day}`)
            .then(res => res.json())
            .then(data => setObservation(data))
            .catch(err => console.log(err));
    })

    return (
        <Form 
            action={async (formData) => {
                await fetch("/api/observation", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: observation.id,
                        day: day,
                        morning: formData.get("morning"),
                        noon: formData.get("noon"),
                        afterSchool: formData.get("afterSchool"),
                    }),
                }).then(() => window.location.reload())
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